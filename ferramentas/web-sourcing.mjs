#!/usr/bin/env node
// TIER 2 — WEB-SOURCING: busca uma imagem PRONTA e livre (CC) no Openverse e baixa.
// Openverse = agregador de midia CC (Flickr/Unsplash/Wikimedia/etc). API publica sem chave.
// Use quando um diagrama/foto pronto comunica melhor que uma gerada por IA.
//
// USO: node web-sourcing.mjs --q "hexagonal lattice engineering" --slug 01-harness
//      -> salva posts-linkedin/imagens/<slug>/openverse-1.png + .atribuicao.json
import { writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_ROOT = join(__dirname, "..", "posts-linkedin", "imagens");

function arg(k, d) { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : d; }
const q = arg("--q", "software architecture diagram");
const slug = arg("--slug", "loop-vision");
const n = parseInt(arg("--n", "3"), 10);
const OUT = join(IMG_ROOT, slug);
mkdirSync(OUT, { recursive: true });

async function searchOpenverse(query, page = 1) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=${n}&mature=false&license_type=all`;
  const r = await fetch(url, { headers: { "Accept": "application/json" }, signal: AbortSignal.timeout(40000) });
  if (!r.ok) throw new Error("Openverse HTTP " + r.status);
  const j = await r.json();
  return (j.results || []).filter(x => x.url);
}

(async () => {
  console.log(`buscando (Openverse): "${q}" ...`);
  let results;
  try { results = await searchOpenverse(q); }
  catch (e) { console.error("busca falhou: " + e.message); process.exit(1); }
  if (!results.length) { console.error("nenhum resultado."); process.exit(1); }
  const saved = [];
  for (let i = 0; i < Math.min(n, results.length); i++) {
    const it = results[i];
    try {
      const img = await fetch(it.url, { signal: AbortSignal.timeout(60000), redirect: "follow" });
      if (!img.ok) { console.warn(`skip ${i}: HTTP ${img.status}`); continue; }
      const buf = Buffer.from(await img.arrayBuffer());
      const file = join(OUT, `openverse-${i + 1}.png`);
      writeFileSync(file, buf);
      const attrib = {
        source: "openverse",
        title: it.title || "",
        creator: it.creator || "unknown",
        creator_url: it.creator_url || "",
        license: it.license || "",
        license_version: it.license_version || "",
        foreign_landing_url: it.foreign_landing_url || "",
        url: it.url,
        query: q,
        note: "Verifique a licenca antes de publicar. Mantenha a atribuicao.",
      };
      writeFileSync(join(OUT, `openverse-${i + 1}.atribuicao.json`), JSON.stringify(attrib, null, 2));
      saved.push({ file, kb: Math.round(statSync(file).size / 1024), license: attrib.license, creator: attrib.creator });
      console.log(`ok ${i + 1}: openverse-${i + 1}.png (${saved[saved.length - 1].kb} KB) | ${attrib.license} | ${attrib.creator}`);
    } catch (e) { console.warn(`skip ${i}: ${e.message}`); }
  }
  console.log(`\n=== ${saved.length} imagem(ns) salva(s) em ${OUT} ===`);
  console.log("LEMBRE: valide com zai-vision analyze_image (rubric) e confira a LICENCA antes de publicar.");
})();
