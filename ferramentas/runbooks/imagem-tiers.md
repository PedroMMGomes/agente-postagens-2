# Runbook — Hierarquia de tiers de imagem

> O Agente 2.0 gera imagem por **tiers**, do melhor para o pior. Tier 0 é o DEFAULT.
> Se um tier falhar, **caia para o próximo** sem parar; **documente qual tier usou**.

## Hierarquia

```
TIER 0  OpenAI gpt-image-2          ← DEFAULT (texto perfeito, alta fidelidade)  [pago/baixo]
TIER 1  Gemini Imagen (Chrome logado)                                              [grátis]
TIER 2  Web-sourcing (Openverse CC) + atribuicao                                   [grátis]
TIER 3  Pollinations flux (loop-vision-mcp.mjs)                                    [grátis/keyless]
```

## Quando usar cada

| Tier | Backend | Melhor em | Custo | Setup |
|------|---------|-----------|-------|-------|
| **0** | OpenAI `gpt-image-2` | **Texto na imagem** + conceito editorial fiel | $$ baixo | `OPENAI_API_KEY` (env) |
| 1 | Gemini (Imagen) | Conceito editorial, sem texto | grátis | login Google 1x (Chrome profile) |
| 2 | Openverse CC | Diagrama/foto pronto comunica melhor que IA | grátis | nenhum |
| 3 | Pollinations `flux` | Fallback último recurso, sem chave | grátis | nenhum |

## Fluxo de decisão

1. **Tem `OPENAI_API_KEY`?** → Tier 0. (Sempre que a imagem tiver TEXTO, é a única opção viável.)
2. **Não tem chave OpenAI mas tem Chrome logado no Gemini?** → Tier 1.
3. **O conceito é melhor representado por um diagrama/foto real?** → Tier 2 (mesmo com Tier 0 disponível).
4. **Nenhuma das anteriores?** → Tier 3 (Pollinations, keyless).
5. **Avisa o usuário** se caiu do Tier 0 por falta de chave.

## Troubleshooting por tier

### Tier 0 — OpenAI `gpt-image-2`
- `HTTP 401` → chave inválida/não definida. Confira `$env:OPENAI_API_KEY`.
- `HTTP 429` → rate limit/saldo. Aguarde ou caia para Tier 1/3.
- `HTTP 402` → sem saldo. Caia para Tier 1/3.
- **Texto distorcido ou rótulos extras inventados** → você esqueceu a regra anti-clutter.
  Sempre use `--text "HEADLINE"` (o script append a regra) OU cole no prompt:
  *"Show ONLY this single headline — do NOT add any other labels, captions, callouts
  or annotations. Keep it to a maximum of 4 visual blocks."*
- Modelo `gpt-image-2` indisponível na conta? Tente `--model gpt-image-1.5` ou `--model gpt-image-1-mini`.

### Tier 1 — Gemini (Chrome logado)
- `NAO LOGADO` → rode `node gemini-gen.mjs --setup` uma vez e faça login na janela.
- `compositor nao encontrado (DOM do Gemini mudou?)` → Google pode ter mudado o DOM.
  Veja `gemini-captura.md` para o fluxo via MCP `playwright_browser_*` como alternativa.
- Demora >60s → caia de tier sem insistir.
- **Texto na imagem**: Gemini é OK com texto curto, mas pior que OpenAI. Para texto,
  prefira Tier 0.

### Tier 2 — Web-sourcing (Openverse)
- `busca falhou: Openverse HTTP 429` → rate limit da API pública. Aguarde 30s e tente.
- `nenhum resultado` → reformule a `--q` em inglês e mais genérica.
- **SEMPRE** confira a licença no `.atribuicao.json` antes de publicar. Mantenha a atribuição.

### Tier 3 — Pollinations `flux`
- Grátis e keyless, mas **texto costuma distorcer**. Use só se não precisar de texto.
- Imagem muito "AI-ish"/genérica → refine o concept-brief (proíba "abstract beauty", peça
  um outcome concreto).
- Varie `--seed` para explorar variantes.

## Gates comuns a todos os tiers

Toda imagem (de qualquer tier) passa pela **Fase E** (validação GLM-4.6V):
- `score ≥ 8` E `value_demonstrated=true` E `clutter ≤ 4`.
- Se não bate: aplique `improved_concept` e regere (máx 4 iterações). Best-of-N.
