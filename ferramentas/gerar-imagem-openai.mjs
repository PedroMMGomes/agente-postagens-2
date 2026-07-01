#!/usr/bin/env node
// TIER 0 — Gerador de imagem via OpenAI `gpt-image-2` (DEFAULT do Agente 2.0).
// Melhor qualidade e TEXTO perfeito (sem distorção). Pago por imagem (custo baixo).
// Sem dependencias: usa fetch global (Node >= 18). Win/PS compatible.
//
// USO:
//   $env:OPENAI_API_KEY="sk-proj-..."           (uma vez por sessao do PowerShell)
//   node gerar-imagem-openai.mjs --prompt-file ferramentas/conceitos/NN-slug.txt --slug 01-foo
//   node gerar-imagem-openai.mjs --prompt "<concept-brief>" --slug 01-foo
//   node gerar-imagem-openai.mjs --prompt "..." --slug 01-foo --text "HEADLINE" --n 3
//
// Flags:
//   --key <k>            chave OpenAI (default: env OPENAI_API_KEY)
//   --model <id>         modelo (default: gpt-image-2). Outros: gpt-image-1.5, gpt-image-1-mini, gpt-image-2-pro
//   --prompt "<txt>"     concept-brief (inline)
//   --prompt-file <f>    concept-brief lido de arquivo (tem prioridade sobre --prompt)
//   --slug <s>           slug do post -> salva em posts-linkedin/imagens/<slug>/openai-N.png
//   --out <arq.png>      nome de arquivo explicito (alternativa a --slug; default: openai-1.png solto)
//   --text "<headline>"  se a imagem tiver TEXTO, append da regra anti-clutter automaticamente
//   --size <WxH>         1024x1024 (default) | 1536x1024 (wide) | 1024x1536 (retrato)
//   --n <int>            numero de variantes (default 2). Cada uma vira openai-1.png, openai-2.png...
//   --quality            low | medium | high | auto (default auto)
// SAIDA:
//   posts-linkedin/imagens/<slug>/openai-1.png ... + openai-log.json (prompt usado, modelo, scores vazios p/ preencher)
import { writeFileSync, mkdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_ROOT = join(__dirname, "..", "posts-linkedin", "imagens");

function arg(k, d) {
  const i = process.argv.indexOf(k);
  return i >= 0 ? process.argv[i + 1] : d;
}
function flag(k) { return process.argv.includes(k); }

const key = arg("--key", process.env.OPENAI_API_KEY);
let prompt = arg("--prompt", null);
const promptFile = arg("--prompt-file", null);
if (promptFile) prompt = readFileSync(promptFile, "utf8").trim();
const slug = arg("--slug", null);
const explicitOut = arg("--out", null);
const model = arg("--model", "gpt-image-2");
const size = arg("--size", "1024x1024");
const quality = arg("--quality", "auto");
const n = parseInt(arg("--n", "2"), 10);
const text = arg("--text", null);

function die(msg) { console.error("ERRO:", msg); process.exit(1); }

if (!prompt) die('Use --prompt "<concept-brief>" ou --prompt-file <arquivo>');
if (!key) die("sem OPENAI_API_KEY. Defina $env:OPENAI_API_KEY (ou use --key). Sem chave, caia para Tier 1/3.");

// Se a imagem tiver TEXTO, aplica a regra anti-clutter (aprendizado do v1).
// O gpt-image-2 tende a "ajudar" inventando rotulos extras, o que derruba o gate.
const ANTI_CLUTTER =
  ' Show ONLY this single headline — do NOT add any other labels, captions, callouts or annotations. Keep it to a maximum of 4 visual blocks.';
let finalPrompt = prompt;
if (text && text.trim()) {
  // incorpora o texto exato pedido, com a regra anti-clutter
  finalPrompt = `${prompt} Bold modern sans-serif text overlay reading exactly "${text.trim()}", centered and clearly legible.${ANTI_CLUTTER}`;
}

const outDir = slug ? join(IMG_ROOT, slug) : (explicitOut ? dirname(explicitOut) : IMG_ROOT);
mkdirSync(outDir, { recursive: true });

const body = {
  model,
  prompt: finalPrompt,
  n,
  size,
  // b64_json eh mais robusto que url (nao expira, nao precisa de download)
};

(async () => {
  console.log(`Tier 0 OpenAI | modelo: ${model} | size: ${size} | n: ${n} | saida: ${outDir}`);
  if (text) console.log(`texto pedido: "${text.trim()}" (anti-clutter ON)`);
  const t0 = Date.now();
  const r = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(e => die("fetch falhou: " + e.message));
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = j?.error?.message || JSON.stringify(j).slice(0, 400);
    die(`OpenAI HTTP ${r.status}: ${msg}`);
  }
  const items = j?.data || [];
  if (!items.length) die("resposta sem dados de imagem");
  const log = { model, size, n, text: text || null, prompt: finalPrompt, files: [] };
  let idx = 0;
  for (const it of items) {
    idx++;
    let buf;
    if (it.b64_json) {
      buf = Buffer.from(it.b64_json, "base64");
    } else if (it.url) {
      const d = await fetch(it.url).catch(e => die("download url falhou: " + e.message));
      buf = Buffer.from(await d.arrayBuffer());
    } else {
      console.warn(`skip ${idx}: sem b64_json nem url`); continue;
    }
    const file = explicitOut && idx === 1 ? explicitOut : join(outDir, `openai-${idx}.png`);
    writeFileSync(file, buf);
    const kb = Math.round(statSync(file).size / 1024);
    log.files.push({ file, kb });
    console.log(`ok ${idx}: ${file} (${kb} KB)`);
  }
  const logPath = join(outDir, "openai-log.json");
  writeFileSync(logPath, JSON.stringify(log, null, 2));
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\n=== ${idx} imagem(ns) salva(s) em ${outDir} (${dt}s) ===`);
  console.log(`log: ${logPath}`);
  console.log("PROXIMO: valide cada imagem com zai-vision analyze_image (rubric, gate score>=8).");
})().catch(e => die(e.message));
