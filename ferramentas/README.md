# ferramentas/ — índice

Scripts e runbooks para o pipeline de imagem e pesquisa do Agente 2.0.
**Curado** — só o que funciona. (O v1 tinha 27 arquivos de exploração; aqui fica enxuto.)

## Scripts

| Script | Tier | Quando | Dependências |
|--------|------|--------|--------------|
| `gerar-imagem-openai.mjs` | **0 (DEFAULT)** | melhor qualidade + texto perfeito | `OPENAI_API_KEY`, Node ≥18 |
| `gerar-imagem.mjs` | 1–3 (fallbacks) | quando OpenAI falha/sem chave | Node ≥18 (Pollinations keyless) |
| `gemini-gen.mjs` | 1 | Gemini via Chrome logado | `playwright` (npm i) |
| `web-sourcing.mjs` | 2 | diagrama/foto CC pronto | Node ≥18 (API pública Openverse) |

## Subpastas

- `conceitos/` — concept-briefs por post (`NN-slug.txt`). Saída da Fase C, entrada da Fase D.
- `runbooks/` — como usar cada ferramenta + troubleshooting.

## Runbooks

- `runbooks/imagem-tiers.md` — hierarquia de tiers + quando usar cada + troubleshooting
- `runbooks/openai-imagem.md` — Tier 0 (DEFAULT): setup, prompt-template anti-clutter, exemplos
- `runbooks/gemini-captura.md` — Tier 1: login, geração, captura full-res
- `runbooks/pesquisa-web.md` — como pesquisar fontes (zai-search/reader/zread)

## Quickstart (Tier 0, DEFAULT)

```powershell
# 1. Configure a chave (uma vez por sessao, NUNCA commitar)
$env:OPENAI_API_KEY="sk-proj-..."

# 2. Rode (concept-brief da Fase C em ferramentas/conceitos/NN-slug.txt)
node ferramentas/gerar-imagem-openai.mjs --prompt-file ferramentas/conceitos/01-foo.txt --slug 01-foo --n 2

# 3. Com texto na imagem (append automatico da regra anti-clutter)
node ferramentas/gerar-imagem-openai.mjs --prompt-file ferramentas/conceitos/01-foo.txt --slug 01-foo --text "TECH DEBT IS A PROMPT NOW" --n 2

# 4. Valide cada saida com zai-vision analyze_image (rubric, gate score>=8)
```

Sem `OPENAI_API_KEY`? Caia para Tier 1 (`gemini-gen.mjs --setup` 1x) ou Tier 3
(`gerar-imagem.mjs --backend pollinations` — grátis, keyless, texto pior). Documente
qual tier usou no log do post.
