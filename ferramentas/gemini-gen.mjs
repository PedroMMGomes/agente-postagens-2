#!/usr/bin/env node
// TIER 1 — DRIVER GEMINI (Imagen) via Playwright + Chrome real com perfil persistente.
// - Primeira vez: roda --setup; abre Chrome, voce faz login no Google/Gemini UMA vez; sessao persiste.
// - Depois: --prompt "<concept-brief>" --slug 01-foo  -> gera e captura a imagem.
//
// USO:
//   node gemini-gen.mjs --setup                                  # 1x: login
//   node gemini-gen.mjs --prompt-file ferramentas/conceitos/NN.txt --slug 01-foo
//   node gemini-gen.mjs --prompt "..." --slug 01-foo --headed --wait 90
//
// Flags:
//   --prompt "<txt>"     concept-brief inline
//   --prompt-file <f>    concept-brief de arquivo (tem prioridade)
//   --slug <s>           salva em posts-linkedin/imagens/<slug>/gemini-N.png
//   --out <dir>          dir explicito (alternativa a --slug)
//   --headed             abre janela visivel (default: headless apos setup)
//   --wait <sec>         tempo max de espera pela geracao (default 90)
//   --setup              modo login (1x)
import { chromium } from "playwright";
import { createInterface } from "node:readline/promises";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_ROOT = join(__dirname, "..", "posts-linkedin", "imagens");
const PROFILE = "C:\\Users\\pedro\\AppData\\Local\\Temp\\kilo\\gemini-chrome-profile";
const GEMINI = "https://gemini.google.com/app";

function arg(k, d) { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : d; }
const flag = k => process.argv.includes(k);
const setup = flag("--setup");
const promptFile = arg("--prompt-file", null);
let prompt = arg("--prompt", null);
if (promptFile) prompt = readFileSync(promptFile, "utf8").trim();
const slug = arg("--slug", null);
const explicitOut = arg("--out", null);
const outDir = slug ? join(IMG_ROOT, slug) : (explicitOut || IMG_ROOT);
const headed = setup || flag("--headed");
const waitSec = parseInt(arg("--wait", "90"), 10);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const ask = q => createInterface({ input: process.stdin, output: process.stdout }).question(q);

async function launch() {
  return chromium.launchPersistentContext(PROFILE, {
    channel: "chrome",
    headless: !headed,
    viewport: headed ? null : { width: 1280, height: 1000 },
    deviceScaleFactor: 2,
    args: ["--disable-blink-features=AutomationControlled", ...(headed ? ["--start-maximized"] : [])],
  });
}

async function captureImage(page, el, outDir, idx) {
  try {
    const info = await el.evaluate(n => ({ src: n.currentSrc || n.src, w: n.naturalWidth, h: n.naturalHeight }));
    if (info.src && /^https?:/.test(info.src)) {
      let url = info.src;
      const m = url.match(/(.*googleusercontent\.com\/[^?=]+)(=[^&]*)?/);
      if (m) url = m[1] + "=w1600";
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(60000) });
        if (r.ok) {
          const buf = Buffer.from(await r.arrayBuffer());
          if (buf.length > 8000) {
            writeFileSync(join(outDir, `gemini-${idx}.png`), buf);
            console.log(`capturado via src (full-res): gemini-${idx}.png`);
            return true;
          }
        }
      } catch (e) { console.log(`src fetch falhou (${e.message}), tentando lightbox...`); }
    }
  } catch {}
  try {
    await el.click({ timeout: 5000 });
    await sleep(2500);
    const lb = page.locator("img").last();
    const box = await lb.boundingBox();
    if (box && box.width >= 400) {
      await lb.screenshot({ path: join(outDir, `gemini-${idx}.png`) });
      console.log(`capturado via lightbox: gemini-${idx}.png (${Math.round(box.width)}x${Math.round(box.height)})`);
      await page.keyboard.press("Escape").catch(() => {});
      return true;
    }
    await page.keyboard.press("Escape").catch(() => {});
  } catch {}
  const box = await el.boundingBox().catch(() => null);
  if (box) { await el.screenshot({ path: join(outDir, `gemini-${idx}.png`) }); console.log(`capturado (preview): gemini-${idx}.png`); return true; }
  return false;
}

async function isLoggedIn(page) {
  try {
    await page.goto(GEMINI, { waitUntil: "domcontentloaded", timeout: 60000 });
    await sleep(4000);
    const composer = await hasComposer(page);
    const signin = await signinVisible(page);
    return composer && !signin;
  } catch { return false; }
}
async function hasComposer(page) {
  const sel = [
    'rich-textarea [contenteditable="true"]',
    'rich-textarea [role="textbox"]',
    'rich-textarea .input-box [contenteditable="true"]',
  ];
  for (const s of sel) { if (await page.locator(s).first().count().catch(() => 0) > 0) return true; }
  return false;
}
async function signinVisible(page) {
  const cands = [
    page.getByRole("button", { name: /sign in|fazer login|entrar/i }),
    page.getByRole("link", { name: /sign in|fazer login|entrar/i }),
  ];
  for (const c of cands) { try { if (await c.first().isVisible().catch(() => false)) return true; } catch {} }
  return false;
}
async function getComposer(page) {
  const sel = [
    'rich-textarea [contenteditable="true"]',
    'rich-textarea [role="textbox"]',
    'rich-textarea .input-box [contenteditable="true"]',
    '[role="combobox"]',
    'textarea',
  ];
  for (const s of sel) {
    const loc = page.locator(s).first();
    if (await loc.count().catch(() => 0) > 0) return loc;
  }
  return null;
}

(async () => {
  if (!existsSync(PROFILE)) mkdirSync(PROFILE, { recursive: true });
  console.log("abrindo Chrome (perfil persistente)...");
  const ctx = await launch();
  const page = ctx.pages()[0] || await ctx.newPage();

  if (setup) {
    console.log("\n>>> MODO SETUP: faca login no Google/Gemini na janela que abriu (e feche qualquer modal).");
    console.log(">>> Vou detectar o login automaticamente (ate 5 min).");
    await page.goto(GEMINI, { waitUntil: "domcontentloaded", timeout: 60000 });
    const deadline = Date.now() + 5 * 60 * 1000;
    let ok = false;
    while (Date.now() < deadline) {
      await sleep(4000);
      const composer = await hasComposer(page);
      const signin = await signinVisible(page);
      console.log(`verificando... composer=${composer} signinVisivel=${signin}`);
      if (composer && !signin) { ok = true; break; }
    }
    console.log(ok ? "LOGIN OK - sessao salva no perfil. Proximo passo: --prompt ..." : "AVISO: ainda nao detectei login em 5 min. Tente novamente.");
    await ctx.close();
    return;
  }

  if (!prompt) { console.error('Use --prompt "<texto>" ou --prompt-file <f>  (ou --setup na 1a vez)'); await ctx.close(); process.exit(1); }
  mkdirSync(outDir, { recursive: true });

  console.log("verificando login...");
  if (!(await isLoggedIn(page))) {
    console.error("NAO LOGADO. Rode primeiro: node gemini-gen.mjs --setup  (e faca login na janela).");
    await ctx.close(); process.exit(2);
  }
  console.log("logado. localizando compositor...");
  const composer = await getComposer(page);
  if (!composer) {
    console.error("compositor nao encontrado (DOM do Gemini mudou?). Salvando snapshot p/ debug...");
    await page.screenshot({ path: join(outDir, "_debug-no-composer.png"), fullPage: false });
    await ctx.close(); process.exit(3);
  }
  const full = /generate|crie uma imagem|gere uma imagem|image of/i.test(prompt) ? prompt : "Generate an image. " + prompt;
  await composer.click();
  await page.keyboard.type(full, { delay: 8 });
  await sleep(600);
  await page.keyboard.press("Enter");
  console.log("prompt enviado. aguardando geracao (ate " + waitSec + "s)...");

  const before = await page.locator("img").count();
  const deadline = Date.now() + waitSec * 1000;
  let imgs = 0;
  while (Date.now() < deadline) {
    await sleep(3000);
    const all = page.locator("img");
    const cnt = await all.count();
    if (cnt > before) {
      const big = [];
      for (let i = 0; i < cnt; i++) {
        const el = all.nth(i);
        try { const box = await el.boundingBox(); if (box && box.width >= 256 && box.height >= 256) big.push(el); } catch {}
      }
      if (big.length) { imgs = big.length; break; }
    }
  }
  if (!imgs) {
    console.error("nenhuma imagem detectada no tempo. Salvando screenshot p/ debug.");
    await page.screenshot({ path: join(outDir, "_debug-no-image.png"), fullPage: false });
    await ctx.close(); process.exit(4);
  }
  const all = page.locator("img");
  const cnt = await all.count();
  let saved = 0;
  for (let i = 0; i < cnt; i++) {
    const el = all.nth(i);
    try {
      const box = await el.boundingBox();
      if (!box || box.width < 256 || box.height < 256) continue;
      if (await captureImage(page, el, outDir, saved + 1)) saved++;
    } catch {}
  }
  await page.screenshot({ path: join(outDir, "_tela-final.png"), fullPage: false });
  console.log(`\n=== ${saved} imagem(ns) salva(s) em ${outDir} ===`);
  await ctx.close();
})();
