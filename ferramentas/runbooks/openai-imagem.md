# Runbook — Tier 0: OpenAI `gpt-image-2` (DEFAULT)

> Novo **tier mais alto** e DEFAULT do Agente 2.0. Qualidade e fidelidade de **texto**
> superiores a todos os outros tiers. Testado no v1 (score GLM 9.0, texto perfeito).

## Por que este tier é o DEFAULT

| Critério | OpenAI `gpt-image-2` | Pollinations `flux` (fallback) |
|----------|----------------------|--------------------------------|
| Renderização de **texto** | ✅ Perfeita, zero distorção | ❌ Distorce letras |
| Coerência com o conceito | ✅ Alta (segue o concept-brief) | 🟡 Média |
| Fidelidade à paleta navy/teal/cyan | ✅ Cumpre | 🟡 Variável |
| Velocidade | ✅ Rápido (1 chamada, ~5–15s) | 🟡 Variável |
| Custo | 💰 Pago por imagem (baixo) | Grátis |
| Automação | ✅ API simples, sem browser | ✅ URL simples |

**Decisão:** usar OpenAI como DEFAULT. Cair para Gemini/Pollinations apenas se a chave
falhar/saldo acabar. O grande ganho é o **texto limpo** — torna viável a variante
"com texto" da capa (antes impraticável nos outros tiers).

## Setup (uma vez por sessão)

A chave é um segredo. **NUNCA commitar. NUNCA salvar em arquivo do repo.** Use variável
de ambiente do Windows:

```powershell
# Definitivo (escopo usuário) — persiste entre sessões, fica no registro do Windows:
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY","sk-proj-...","User")

# Só nesta sessão PowerShell:
$env:OPENAI_API_KEY="sk-proj-..."
```

> ⚠️ **NUNCA cole a chave no chat do agente** (entra no transcript) nem em arquivos
> versionados. Se vazar, **revogue imediatamente** em platform.openai.com/api-keys e
> gere uma nova.

Pegue a chave em **platform.openai.com → API keys**. Confirme saldo em
**platform.openai.com/usage** (o `gpt-image-2` é pago por imagem, custo baixo).

## Uso

```powershell
# Conceito da Fase C em arquivo:
node ferramentas/gerar-imagem-openai.mjs --prompt-file ferramentas/conceitos/01-foo.txt --slug 01-foo --n 2

# Conceito inline:
node ferramentas/gerar-imagem-openai.mjs --prompt "<concept-brief>" --slug 01-foo --n 2

# Com TEXTO na imagem (regra anti-clutter é appendada automaticamente):
node ferramentas/gerar-imagem-openai.mjs --prompt-file ferramentas/conceitos/01-foo.txt --slug 01-foo --text "HEADLINE AQUI" --n 2

# Tamanhos: 1024x1024 (default) | 1536x1024 (wide) | 1024x1536 (retrato)
node ferramentas/gerar-imagem-openai.mjs --prompt-file ... --slug 01-foo --size 1536x1024
```

Saída: `posts-linkedin/imagens/<slug>/openai-1.png`, `openai-2.png`... + `openai-log.json`.

### Modelos de imagem disponíveis (confirmado na conta, 20/jun/2026)
```
gpt-image-2              ← DEFAULT (melhor; o do golden example do v1, score 9.0)
gpt-image-2-2026-04-21   ← versão datada do gpt-image-2 (pin de reprodução)
gpt-image-1.5            ← geração anterior ainda bom
gpt-image-1              ← mais antigo
gpt-image-1-mini         ← mais rápido/barato, qualidade menor
chatgpt-image-latest     ← alias do latest (não-determinístico entre versões)
sora-2                   ← vídeo (não usar para capa estática)
sora-2-pro               ← vídeo (não usar para capa estática)
```
Para **capa de LinkedIn**: use `gpt-image-2` (default). Para economizar em iterações de teste, `gpt-image-1-mini` é viável; regere a final com `gpt-image-2`. Use `--model <id>` para trocar.

Outros modelos na conta: 120 no total (chat/código/etc). Liste com:
```powershell
curl -s -H "Authorization: Bearer $env:OPENAI_API_KEY" https://api.openai.com/v1/models
```

## Prompt template (conceito-primeiro)

O concept-brief (saída da Fase C) deve ser **conceito-primeiro**, não "prompt-primeiro".
Template base, derivado do golden example (score 9.3/10 sem texto, 9.0/10 com texto):

### Variante SEM texto
```
A clean, modern editorial illustration for a tech LinkedIn post. Concept:
"<tese do post em 1 frase>". <descrição concreta do que mostrar — sujeito,Outcome,
padrão antes→depois / outcome icons / facilitação>. Isometric 3D style, corporate
tech palette (deep navy, teal, soft cyan, white), subtle grid background,
professional, minimal, no text, no watermark. Square composition, high detail.
```

### Variante COM TEXTO (a que o autor aprovou no v1, refinada 20/jun/2026)
```
A clean modern editorial illustration for a tech LinkedIn post, isometric 3D
style. <descrição concreta — pode incluir figuras humanas estilizadas/acolhedoras:
mãos que cuidam, mini-engenheiros, robôs com carinha simpática; tom quente com
acento âmbar>. Corporate tech palette (deep navy background, teal and cyan accents,
white). Bold modern sans-serif text overlay reading exactly "<HEADLINE EM PT-BR
MAIÚSCULO SEM ACENTOS>", centered and clearly legible. Show ONLY this single headline
— do NOT add any other labels, captions, callouts or annotations. Keep it to a
maximum of 6 visual blocks. No watermark. Square, high detail.
```

> 🔑 **Aprendizados críticos (sessão 20/jun/2026):**
> 1. O `gpt-image-2` tende a "ajudar" inventando rótulos extras ("Sensor Nodes",
>    "Feedback Loops"...), o que derruba o gate de clutter. **Sempre** inclua a regra
>    anti-clutter (o script faz isso automaticamente quando você usa `--text "..."`).
> 2. **Gate de clutter elevado de ≤4 → ≤6** — o autor prefere um pouco mais de
>    densidade visual (5 blocos) desde que o outcome esteja claro. A variante com
>    mini-engenheiros (score 8.8, clutter 5) foi aprovada como "sensacional!!!".
> 3. **Texto em PT-BR, maiúsculo, sem acentos** ("O MODELO NAO E O PRODUTO") renderiza
>    com perfeição no `gpt-image-2` (score 9.0). Estilo moderno.
> 4. **Figuras humanas estilizadas/acolhedoras funcionam** (mãos que cuidam, robôs com
>    carinha, mini-engenheiros) — o que NÃO funciona é cena de escritório/negócios.

## Resultados de validação do golden example (zai-vision / GLM-4.6V)

| Variante | Score | Texto | Clutter | Gate |
|----------|-------|-------|---------|------|
| Sem texto (v1) | 9.3/10 | n/a | 4 ✅ | ✅ PASSA |
| Com texto EN (v1) | 9.0/10 | perfeito, 0 distorção | alto (sem fix) | ❌ → ✅ com fix anti-clutter |
| IA fofo + mãos acolhedoras (20/jun, PT) | 9.0/10 | "O MODELO NAO E O PRODUTO" perfeito | 3 ✅ | ✅ PASSA |
| Mini-engenheiros montando harness (20/jun, PT) | 8.8/10 | perfeito | 5 ✅ | ✅ PASSA (gate ≤6) ← **escolhida** |

Imagem aprovada do Post #01 (v1, refinada):
`../agente-postagens/posts-linkedin/imagens/harness-engineering/openai-gpt-image-2-C-engenheiros.png`
(conceito: mini-engenheiros montando harness, score 8.8, "sensacional!!!" do autor).

## Fluxo completo (Fase C → D → E)

1. **Fase C** — escreva o concept-brief em `ferramentas/conceitos/NN-slug.txt`
   (inclua o texto do post como contexto — foi o que funcionou no v1).
2. **Fase D** — rode `gerar-imagem-openai.mjs` com `--n 2` (ou 3) variantes.
3. **Fase E** — valide cada variante com `zai-vision analyze_image` (rubric JSON).
   - Gate: `score ≥ 8` E `value_demonstrated=true` E `clutter ≤ 6`.
   - Se a melhor não passar, aplique `improved_concept` (do JSON do GLM) e regere.
   - Máx 4 iterações. Best-of-N.
4. Escolha a melhor, registre no `## Imagem` do post + `## 📋 Registro de refinamento`
   (tabela de variantes com scores + decisão do autor — o autor quer o processo documentado).

## Erros comuns

- `HTTP 401` → chave inválida/não definida. `echo $env:OPENAI_API_KEY` confere?
- `HTTP 429` → rate limit. Aguarde ou caia para Tier 1/3.
- `HTTP 402` → sem saldo. Caia para Tier 1/3 e avise o usuário.
- `resposta sem dados de imagem` → raro; regere.
- Texto distorcido/rótulos extras → você não usou `--text` (ou não colou a regra
  anti-clutter no prompt). Regere com a regra.
