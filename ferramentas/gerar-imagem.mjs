#!/usr/bin/env node
// Gerador de imagens MULTI-BACKEND (fallbacks do Agente 2.0 — Tier 1 a 3).
// Tier 0 (OpenAI) tem script proprio: gerar-imagem-openai.mjs
// Sem dependencias: usa fetch global (Node >= 18). Win/PS compatible.
//
// USO:
//   node gerar-imagem.mjs --backend pollinations --prompt "..." --slug 01-foo --seed 7
//   node gerar-imagem.mjs --backend gemini   --key AIza...  --prompt "..." --slug 01-foo
//   node gerar-imagem.mjs --backend kilo     --key sk-...   --prompt "..." --slug 01-foo
//   node gerar-imagem.mjs --backend zai      --key id.secret --prompt "..." --slug 01-foo
//
// Flags:
//   --backend <b>   pollinations|gemini|kilo|zai|grok|qwen  (default: auto pela chave, ou pollinations sem chave)
//   --key <k>       chave da API (default: env detectado)
//   --model <id>    modelo (default: ver logica)
//   --prompt "<t>"  concept-brief (inline)
//   --prompt-file <f>  concept-brief de arquivo (tem prioridade)
//   --slug <s>      slug do post -> salva em posts-linkedin/imagens/<slug>/<backend>-1.png
//   --out <arq>     nome explicito (alternativa a --slug)
//   --size <WxH>    default 1024x1024
//   --seed <int>    Pollinations (default 7)
import { writeFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHmac } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_ROOT = join(__dirname, "..", "posts-linkedin", "imagens");

function arg(k, d) { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : d; }
const DEFAULT_PROMPT = "A clean, modern editorial illustration for a tech LinkedIn post. Isometric 3D style, corporate tech palette (deep navy, teal, soft cyan, white), subtle grid background, professional, minimal, no text, no watermark. Square composition, high detail.";

function detectBackend(key) {
  if (!key) return "pollinations";
  if (/^xai-/.test(key)) return "grok";
  if (/^[a-f0-9]{32}\.[A-Za-z0-9]+$/.test(key)) return "zai";
  if (/^AIza/.test(key)) return "gemini";
  return "kilo";
}

function parseArgs(argv) {
  const envKey = process.env.XAI_API_KEY || process.env.DASHSCOPE_API_KEY || process.env.ZAI_API_KEY || process.env.KILO_API_KEY || process.env.GEMINI_API_KEY;
  const backend = process.env.ZAI_BACKEND || arg("--backend", null) || detectBackend(envKey);
  const defaultModel = backend === "zai" ? "cogview-4" : backend === "gemini" ? "gemini-2.5-flash-image" : backend === "pollinations" ? "flux" : backend === "grok" ? "grok-2-image-1212" : backend === "qwen" ? "wanx2.1-t2i-plus" : "google/gemini-2.5-flash-image";
  const a = { key: envKey, model: defaultModel, prompt: DEFAULT_PROMPT, slug: null, out: null, backend, size: "1024x1024", seed: 7 };
  const pf = arg("--prompt-file", null);
  if (pf) a.prompt = readFileSync(pf, "utf8").trim();
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[++i];
    if (k === "--key") a.key = v;
    else if (k === "--model") a.model = v;
    else if (k === "--prompt" && !pf) a.prompt = v;
    else if (k === "--slug") a.slug = v;
    else if (k === "--out") a.out = v;
    else if (k === "--backend") a.backend = v;
    else if (k === "--size") a.size = v;
    else if (k === "--seed") a.seed = Number(v);
    else i--;
  }
  return a;
}

function die(msg) { console.error("ERRO:", msg); process.exit(1); }

// ---------- Pollinations (FREE, sem chave) ----------
async function pollinationsGenerate(args) {
  const [w, h] = (args.size || "1200x1200").split("x").map(n => parseInt(n, 10) || 1200);
  const model = args.model || "flux";
  const enc = encodeURIComponent(args.prompt);
  const url = `https://image.pollinations.ai/prompt/${enc}?width=${w}&height=${h}&nologo=true&seed=${args.seed}&model=${model}`;
  return { url };
}

// ---------- Grok (xAI) ----------
async function grokGenerate(args) {
  const models = args.model && args.model !== "grok" ? [args.model, "grok-2-image-1212", "grok-2-image"] : ["grok-2-image-1212", "grok-2-image"];
  let lastErr;
  for (const model of models) {
    try {
      const r = await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: { Authorization: `Bearer ${args.key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt: args.prompt, n: 1, response_format: "url" })
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.data?.[0]?.url) return { url: j.data[0].url };
      if (r.ok && j?.data?.[0]?.b64_json) return { b64: j.data[0].b64_json, mime: "png" };
      lastErr = `HTTP ${r.status}: ${j?.error?.message || JSON.stringify(j).slice(0, 200)}`;
      if (r.status === 401 || r.status === 403) throw new Error(lastErr);
    } catch (e) { lastErr = e.message; }
  }
  throw new Error("Grok falhou: " + lastErr);
}

// ---------- Qwen / Wanx (DashScope) ----------
async function qwenGenerate(args) {
  const [w, h] = (args.size || "1024x1024").split("x");
  const models = args.model && args.model !== "qwen" ? [args.model, "wanx2.1-t2i-plus", "wanx2.1-t2i-turbo", "qwen-image"] : ["wanx2.1-t2i-plus", "wanx2.1-t2i-turbo"];
  const hosts = ["https://dashscope-intl.aliyuncs.com/compatible-mode/v1", "https://dashscope.aliyuncs.com/compatible-mode/v1"];
  let lastErr;
  for (const host of hosts) {
    for (const model of models) {
      try {
        const r = await fetch(`${host}/images/generations`, {
          method: "POST",
          headers: { Authorization: `Bearer ${args.key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model, prompt: args.prompt, n: 1, size: `${w}*${h}` })
        });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j?.output?.results?.[0]?.url) return { url: j.output.results[0].url };
        if (r.ok && j?.data?.[0]?.url) return { url: j.data[0].url };
        if (r.ok && j?.output?.results?.[0]?.b64_image) return { b64: j.output.results[0].b64_image, mime: "png" };
        lastErr = `HTTP ${r.status}: ${j?.message || j?.code || JSON.stringify(j).slice(0, 200)}`;
        if (r.status === 401 || r.status === 403) throw new Error(lastErr);
      } catch (e) { lastErr = e.message; }
    }
  }
  throw new Error("Qwen/DashScope falhou: " + lastErr);
}

function extractImage(text) {
  if (!text) return null;
  const m1 = text.match(/data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=\s]+/);
  if (m1) return { b64: m1[0].split("base64,")[1].replace(/\s/g, ""), mime: (m1[0].match(/data:image\/([a-zA-Z]+)/) || [])[1] || "png" };
  const m2 = text.match(/https?:\/\/[^\s"'<>)]+\.(?:png|jpg|jpeg|webp)/i);
  if (m2) return { url: m2[0] };
  const m3 = text.match(/https?:\/\/[^\s"'<>)]+/i);
  if (m3) return { maybeUrl: m3[0] };
  return null;
}

async function saveResult(img, outPath) {
  if (img.b64) { writeFileSync(outPath, Buffer.from(img.b64, "base64")); return outPath; }
  if (img.url || img.maybeUrl) {
    const u = img.url || img.maybeUrl;
    const r = await fetch(u);
    if (!r.ok) throw new Error("download da imagem falhou: HTTP " + r.status);
    writeFileSync(outPath, Buffer.from(await r.arrayBuffer()));
    return outPath;
  }
  throw new Error("nenhuma imagem encontrada na resposta");
}

// ---------- Kilo Gateway ----------
async function kiloGenerate(args) {
  const base = "https://api.kilo.ai/api/gateway";
  const headers = { Authorization: `Bearer ${args.key}`, "Content-Type": "application/json" };
  try {
    const r = await fetch(`${base}/images/generations`, {
      method: "POST", headers,
      body: JSON.stringify({ model: args.model, prompt: args.prompt, n: 1, size: args.size, response_format: "b64_json" })
    });
    const j = await r.json();
    if (r.ok && j?.data?.[0]?.b64_json) return { b64: j.data[0].b64_json, mime: "png" };
    if (r.ok && j?.data?.[0]?.url) return { url: j.data[0].url };
    if (r.status !== 404 && r.status !== 400) console.warn(`(images endpoint -> HTTP ${r.status})`);
  } catch (e) { /* tenta proximo */ }
  const r2 = await fetch(`${base}/chat/completions`, {
    method: "POST", headers,
    body: JSON.stringify({ model: args.model, messages: [{ role: "user", content: args.prompt }], modalities: ["image", "text"] })
  });
  const j2 = await r2.json();
  if (!r2.ok) {
    const msg = j2?.error?.message || JSON.stringify(j2).slice(0, 400);
    throw new Error(`Kilo chat/completions HTTP ${r2.status}: ${msg}`);
  }
  const raw = JSON.stringify(j2);
  let img = extractImage(raw);
  if (!img && Array.isArray(j2?.choices?.[0]?.message?.content)) {
    for (const part of j2.choices[0].message.content) {
      if (part?.type === "image_url" && part.image_url?.url) { img = extractImage(part.image_url.url); if (img) break; }
      if (part?.image_url?.url) { img = extractImage(part.image_url.url); if (img) break; }
      if (typeof part?.image === "string") { img = extractImage(part.image); if (img) break; }
    }
  }
  if (!img && typeof j2?.choices?.[0]?.message?.content === "string") img = extractImage(j2.choices[0].message.content);
  if (!img) throw new Error("resposta sem imagem. Preview:\n" + JSON.stringify(j2).slice(0, 600));
  return img;
}

// ---------- Gemini direto (free tier) ----------
async function geminiGenerate(args) {
  const key = args.key || process.env.GEMINI_API_KEY;
  const model = args.model.includes("/") ? "gemini-2.5-flash-image" : args.model;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const r = await fetch(url, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: args.prompt }] }], generationConfig: { responseModalities: ["IMAGE", "TEXT"] } })
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`Gemini HTTP ${r.status}: ${j?.error?.message || JSON.stringify(j).slice(0, 300)}`);
  const parts = j?.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    if (p?.inlineData?.data) return { b64: p.inlineData.data, mime: (p.inlineData.mimeType || "image/png").split("/")[1] };
  }
  throw new Error("Gemini sem imagem. Preview:\n" + JSON.stringify(j).slice(0, 600));
}

// ---------- Z.ai (BigModel / Zhipu) — CogView ----------
function b64url(buf) { return Buffer.from(buf).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"); }
function zaiJwt(key) {
  const [id, secret] = key.split(".");
  const now = Date.now();
  const header = { alg: "HS256", sign_type: "SIGN" };
  const payload = { api_key: id, exp: now + 3600 * 1000, timestamp: now };
  const data = b64url(JSON.stringify(header)) + "." + b64url(JSON.stringify(payload));
  const sig = b64url(createHmac("sha256", secret).update(data).digest());
  return data + "." + sig;
}
const ZAI_HOSTS = ["https://api.z.ai/api/paas/v4", "https://open.bigmodel.cn/api/paas/v4"];
async function zaiGenerate(args) {
  const models = args.model.includes("/") ? ["cogview-4", "cogview-3-plus"] : [args.model, "cogview-4", "cogview-3-plus"];
  let lastErr;
  for (const host of ZAI_HOSTS) {
    for (const authFn of [k => `Bearer ${k}`, k => `Bearer ${zaiJwt(k)}`]) {
      for (const model of models) {
        try {
          const r = await fetch(`${host}/images/generations`, {
            method: "POST",
            headers: { Authorization: authFn(args.key), "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ model, prompt: args.prompt, size: args.size })
          });
          const j = await r.json().catch(() => ({}));
          if (r.ok && j?.data?.[0]?.url) return { url: j.data[0].url };
          if (r.ok && j?.data?.[0]?.b64_json) return { b64: j.data[0].b64_json, mime: "png" };
          lastErr = `HTTP ${r.status} (${host} ${model}): ${j?.error?.message || j?.msg || JSON.stringify(j).slice(0, 200)}`;
          if (r.status === 401) break;
          if (r.status === 400 || r.status === 404) break;
        } catch (e) { lastErr = e.message; }
      }
    }
  }
  throw new Error("Z.ai falhou. Ultimo erro: " + lastErr);
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.key && args.backend !== "pollinations") die("sem API key. Defina a env var, use --key, ou --backend pollinations (free, sem chave).");
  const outDir = args.slug ? join(IMG_ROOT, args.slug) : (args.out ? dirname(args.out) : IMG_ROOT);
  mkdirSync(outDir, { recursive: true });
  const baseName = args.backend;
  const outPath = args.out || join(outDir, `${baseName}-1.png`);
  console.log(`Backend: ${args.backend} | Modelo: ${args.model} | Saida: ${outPath}`);
  const fn = args.backend === "pollinations" ? pollinationsGenerate
    : args.backend === "grok" ? grokGenerate
    : args.backend === "qwen" ? qwenGenerate
    : args.backend === "gemini" ? geminiGenerate
    : args.backend === "zai" ? zaiGenerate
    : kiloGenerate;
  const img = await fn(args);
  await saveResult(img, outPath);
  const kb = Math.round(statSync(outPath).size / 1024);
  console.log(`OK imagem salva: ${outPath} (${kb} KB)`);
}

main().catch(e => die(e.message));
