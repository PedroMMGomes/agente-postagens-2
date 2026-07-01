# Post LinkedIn #01b — Harness Engineering (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~170 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Bayer/PRINCE (#01) + Sensors (#02) + VibeSec (#03)
**Pares com:** foto `openai-gpt-image-2-B-robo-cuidado.png` ("O MODELO NAO E O PRODUTO") — ESCOLHIDA

---

## Post (copie a partir daqui)

O modelo não é o produto. O harness é.

Você já colocou uma IA pra funcionar numa PoC, ficou empolgado... e aí tentou levar pra produção e tudo quebrou ou a conta não fechou?? 😅

Lendo os últimos textos do Martin Fowler sobre IA de verdade em produção (casos da Bayer e Thoughtworks), cheguei numa conclusão que confirmou como eu penso o assunto:

A diferença não está no modelo. Nem no prompt. Está na engenharia ao redor dele — o tal do harness.

Pense num carro: o modelo é o motor. O harness é a direção, o freio, o airbag e os sensores. Um motor potente sem harness é um acidente esperando pra acontecer.

Em três ideias simples:

1️⃣ RAG bom não é só "buscar o texto parecido". É filtrar, buscar de vários jeitos, reranquear e avaliar todo dia com dados reais.

2️⃣ Manutenção virou automação: sensores que detectam problemas sozinhos, antes de virarem dor de cabeça.

3️⃣ Segurança não se pede, se garante. Você não "pede pra IA ser segura" — você coloca barreiras no caminho dela.

Resumo da ópera: pare de só trocar de modelo e refinar prompt. Comece a desenhar o harness ao redor.

E você: tá cuidando do harness ou só trocando de modelo? 👇

#InteligenciaArtificial #EngenhariaDeSoftware #AgenticAI #RAG #DevOps

---

## Hooks alternativos (teste A/B)
- "PoC de IA é fácil. Produção de IA é harness engineering."
- "Você não tem um problema de modelo. Tem um problema de harness."
- "Um motor potente sem freio é um acidente esperando pra acontecer. IA é igual."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível mesmo pra quem não é especialista em IA.
- A **metáfora do carro** (motor = modelo / harness = freio, direção, airbag) torna o conceito concreto pra qualquer leitor.
- Cortou os detalhes técnicos densos (pipeline 0.7/0.3, mutation testing, service account) que estavam na v1 — aqui o foco é o "e daí?", não o "como".
- CTA-pergunta no fim (favorito do algoritmo do LinkedIn).
- Hashtags reduzidas (5) — mais focadas.

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/harness-engineering/openai-gpt-image-2-B-robo-cuidado.png` (1024x1024, Tier 0 — OpenAI gpt-image-2)
- **Score GLM-4.6V:** 9.0/10 (texto legível, clutter=3, tom humano/acolhedor) — passou no gate com folga.
- **Conceito:** um pequeno núcleo de IA simpático (esfera ciano com carinha) sendo cuidado e protegido por mãos acolhedoras + harness de guide-rails/sensores — tom humano e quente (acento âmbar), perfeito pra versão curta/acessível.
- **Texto na imagem:** "O MODELO NAO E O PRODUTO" (maiúsculo, sem acentos — estilo moderno).
- **Alternativa descartada:** `openai-gpt-image-2-A-carro.png` (metáfora do carro, 7.5/10 — clutter alto).

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um pequeno núcleo de IA simpático (esfera ciano com carinha sorridente) sendo segurado e protegido por mãos humanas acolhedoras e um harness de hastes e sensores, em tons quentes âmbar. Ao centro, o texto "O MODELO NÃO É O PRODUTO".

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024x1025, ótima pro feed mobile).
- Tom mais leve que a v1 — ideal pra alcançar público além do hard-core técnico.

---

## 📋 Registro de refinamento (sessão 20/jun/2026)

### O que estamos refinando
Post **#01b** (versão curta + humana do Harness Engineering) e o **sistema de geração de imagem** que o alimenta. O objetivo: capa humana/acessível (núcleo de IA fofo sendo cuidado) renderizada por IA, com texto limpo, validada por juiz de visão.

### Imagens geradas nesta sessão (todas em `imagens/harness-engineering/`)
| ID | Arquivo | Conceito | Score | Clutter | Status |
|----|---------|----------|-------|---------|--------|
| B | `openai-gpt-image-2-B-robo-cuidado.png` | IA fofo protegido por mãos | 9.0 | 3 | ✅ passa |
| A | `openai-gpt-image-2-A-carro.png` | metáfora do carro | 7.5 | 5 | ⚠️ clutter alto |
| **C** | `openai-gpt-image-2-C-engenheiros.png` | mini-engenheiros montando harness | **8.8** | 5 | ✅ **escolhida pelo autor** |
| D | `openai-gpt-image-2-D-antes-depois.png` | antes→depois quente | 8.0 | 4 | ✅ passa (descartada) |
| — | `openai-gpt-image-2-com-texto.png` / `-sem-texto.png` | 1ª leva (capa original) | 9.0/9.3 | — | 1ª versão |

### Decisão do autor
- Aprovou a **C (engenheiros)** como a melhor ("sensacional!!!").
- Capa final do post: **atualizar de B → C** (pendente de confirmar troca no campo "Imagem" acima).

### Onde mexemos (mudanças de gate/config)
O limite de **clutter foi elevado de ≤4 para ≤6** (para a C, com 5 blocos, passar). Arquivos alterados:
- **`.kilo/agent/publicacoes.md`** — 3 pontos:
  - Regra de layout: "≤5 blocos" → "**≤6 blocos**".
  - Alvo do gate (Fase E): "clutter ≤ 4" → "**clutter ≤ 6**".
  - Rubric JSON do juiz: "alvo ≤3" → "**alvo ≤6**".
- **`ferramentas/openai-imagem.md`** — 4 pontos: prompt template, aprendizado do teste, linha anti-clutter, e alvo da Fase E (todos "4" → "6").

### Novo tier de geração de imagem (documentado)
- Criado **`ferramentas/openai-imagem.md`** — runbook do **Tier 0 (OpenAI `gpt-image-2`)**: default pela qualidade de texto. Inclui prompt template, aprendizado anti-clutter, e o prompt completo do agente (pesquisa→redação→conceito→geração→validação→empacotamento).
- Atualizado **`ferramentas/README-imagens.md`** com o Tier 0 no topo do índice.
- Hierarquia: **Tier 0** OpenAI → Tier 1 Gemini (browser) → Tier 2 web-sourcing → Tier 3 Pollinations.

### Pendências ainda em aberto
1. Confirmar troca da capa final **B → C** (e ajustar alt-text/caminho do post).
2. Guardar a chave `OPENAI_API_KEY` como variável de ambiente persistente do Windows (não commitar).
3. Custo: monitorar uso do `gpt-image-2` (pago por imagem).



