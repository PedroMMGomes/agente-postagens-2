# Runbook — Tier 1: Gemini (Imagen) via Chrome logado

> Alternativa gratuita ao Tier 0. Boa para conceito editorial **sem texto**.
> Para texto na imagem, prefira Tier 0 (OpenAI).

## Método principal (pronto)

`gemini-gen.mjs` abre o Chrome com **perfil persistente logado**, gera e captura em
full-res, headless.

### Setup (1x — faz login uma vez, sessão persiste)
```powershell
node ferramentas/gemini-gen.mjs --setup
# uma janela Chrome abre. Faca login no Google/Gemini nela. Feche modais.
# o script detecta o login automaticamente (ate 5 min).
```

### Gerar + capturar
```powershell
node ferramentas/gemini-gen.mjs --prompt-file ferramentas/conceitos/01-foo.txt --slug 01-foo
# com janela visivel (debug):
node ferramentas/gemini-gen.mjs --prompt "..." --slug 01-foo --headed --wait 90
```

Saída: `posts-linkedin/imagens/<slug>/gemini-1.png`, `gemini-2.png`...
Captura em full-res (upscale `googleusercontent` `=w1600`), com fallback para lightbox
e preview.

## Alternativa via MCP (passo a passo, modo extensão)

Se o driver falhar (DOM do Gemini mudou) e você tiver a extensão Playwright instalada
no Kilo, conduza manualmente com `playwright_browser_*` / `kilo-playwright_browser_*`.

> Se o browser estiver **isolado/não logado** (botão "Sign in" no snapshot), NÃO tente
> logar com credenciais — peça ao usuário para instalar a extensão e recarregar o Kilo,
> OU caia para Tier 2/3.

### Pré-check (faça sempre antes de gerar)
1. `playwright_browser_snapshot` — confirmar conexão.
2. `playwright_browser_navigate` → `https://gemini.google.com/app`.
3. `playwright_browser_snapshot` — deve aparecer o **compositor** (caixa "Pergunte ao
   Gemini" / "Digite algo...") e **NÃO** o botão "Sign in". Se houver "Sign in" → parar
   e cair de tier.

### Fluxo de geração + captura
1. **Localizar o compositor**: `playwright_browser_snapshot` → ache o `textbox`/`combobox`
   (ref tipo `eNN`). Anote a `ref`.
2. **Digitar o concept-brief**: `playwright_browser_type` com `target: <ref>` e
   `text: <concept-brief>` (incluir o texto do post como contexto — foi o que funcionou
   no v1).
3. **Enviar**: `playwright_browser_press_key` `key: "Enter"` (ou clicar no botão "Enviar"
   se Enter não disparar).
4. **Aguardar**: `playwright_browser_wait_for` `time: 25` (s). Depois
   `playwright_browser_snapshot` para confirmar que apareceu a imagem gerada.
5. **Capturar**:
   - `playwright_browser_snapshot` → ache o `<img>` gerado, anote a `ref`.
   - `playwright_browser_take_screenshot` com `target: <ref-img>`, `type: "png"`,
     `filename: "gemini-1.png"`.
   - Alternativa (resolução total): `playwright_browser_evaluate` p/ extrair `src` e
     download. Se `src` for blob, use screenshot.
6. **Mover** para `posts-linkedin/imagens/<slug>/gemini-1.png`.
7. **Variantes**: gere 2–3 (peça "gere mais 3 variações") e valide todas.

## Pós-captura

Valide cada imagem com `zai-vision analyze_image` (rubric, gate score ≥ 8 ∧
value_demonstrated ∧ clutter ≤ 4). Se a melhor não passar, refine o concept-brief com o
`improved_concept` do GLM e regere.

## Dicas

- Gemini responde melhor a concept-briefs em **português** + descrição visual concreta.
- Para **texto legível** dentro da imagem, peça explicitamente: "rótulos em fonte
  sans-serif grande e legível: 'X'". Mas para texto, **prefira Tier 0**.
- Se recusar ou demorar (>60s), caia de tier sem insistir.
