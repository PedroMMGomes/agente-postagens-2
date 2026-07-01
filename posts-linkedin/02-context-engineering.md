# Post LinkedIn #02 — Context Engineering (prompt engineering morreu)

**Status:** Rascunho
**Tamanho:** Médio (~310 palavras)
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Anthropic engineering blog (29 set 2025) + Anthropic Contextual Retrieval (19 set 2024) + Gabriel Henrique/dev.to (4 jun 2026) + Youngju Kim/youngju.dev (12 jun 2026) — ver `pesquisas/02-context-engineering.md`

---

## Post (copie a partir daqui)

Prompt engineering morreu. O que sobrou se chama context engineering.

A Anthropic cunhou o termo em setembro/2025 e ele virou o assunto nº 1 em AI engineering no 1º semestre de 2026. A tese é simples: o leverage não está mais em escrever o prompt perfeito — está em projetar **tudo que o modelo vê antes de responder**.

A definição operacional da Anthropic: "encontrar o menor conjunto de tokens de alto sinal que maximiza a probabilidade do resultado desejado." Prompt engineering é sobre o que você diz. Context engineering é sobre o que você provê.

Por que virou disciplina? Porque contexto é recurso escasso de três formas. **Custo:** a $3/M tokens, arrastar 150K tokens por turno dá $0.45/turno — uma sessão de 50 turnos custa $22, e um serviço com 1000 sessões/dia queima centenas de milhares de dólares por mês só em input. **Latência:** mais tokens, mais tempo até o primeiro token. **Attention budget:** o fenômeno "lost in the middle" (Liu et al. 2023) mostra que o modelo lembra melhor do início e do fim; no meio, esquece. E piora com "context rot" — quanto mais tokens irrelevantes se acumulam, mais o modelo perde instruções, confunde info velha com nova e alucina.

Os números da Anthropic confirmam que engenharia paga. O método Contextual Retrieval (prependar contexto explicativo específico do chunk antes de embeddar) corta falhas de retrieval em **49%** — e em **67%** com reranking. Prompt caching reduz custo em **90%** em tokens cacheados.

Na prática, 5 técnicas: posicionar (system prompt no início, query no fim, dados relevantes antes da query), recuperar seletivo (chunks, não documento inteiro), cachear, estruturar com XML/delimiters, comprimir com rolling summarization.

Meu takeaway de quem constrói produto com IA: pare de polir o wording do prompt. Comece a projetar o que entra no contexto — em que ordem, quanto, com que estrutura, do que você abre mão. É o harness aplicado ao conhecimento.

E você: tá polindo prompt ou projetando contexto?

#InteligenciaArtificial #ContextEngineering #LLM #RAG #EngenhariaDeSoftware #AIEngineering #TechLead #AgenticAI

---

## Hooks alternativos (teste A/B)
- "Prompt engineering morreu. O que sobrou se chama context engineering."
- "O melhor prompt do mundo não salva um contexto mal projetado. O contexto ruim sim, mata o melhor prompt."
- "$22 por sessão de 50 turnos só em input. Contexto não é grátis — é o recurso mais escasso de IA em produção."
- "A Anthropic cortou falhas de retrieval em 67% sem trocar de modelo. Só engenharia de contexto."
- "Prompt engineering é o que você diz. Context engineering é o que você provê. Um virou hobby, o outro virou disciplina."

## Notas
- **Tom:** técnico, confiante, primeira pessoa (sintetizei 4 fontes, sendo a Anthropic a canônica).
- Créditos implícitos: Anthropic (canônica), Liu et al. (lost in the middle), Chroma (context rot), dev.to/Gabriel Henrique (5 técnicas), youngju (economia $).
- 4 provas concretas: definição Anthropic + $0.45/turno/$22/sessão (youngju) + -49%/-67% retrieval (Anthropic) + -90% caching (Anthropic).
- CTA-pergunta no fim.
- **Conexão intencional com a trilogia:** post #01 do v1 (harness = engenharia ao redor do modelo) → post #01 do 2.0 (codebase = prompt, dívida generativa) → **este post #02** (context engineering = o harness aplicado ao conhecimento). Fecha a trilogia.
- Corte opcional para versão curta: remover os números de custo ($0.45/$22/centenas de milhares) e focar só em -49%/-67%/-90% + "contexto é recurso escasso".

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/02-context-engineering/openai-2.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=3) — passou no gate.
- **Variantes validadas (sessão 25/jun/2026):**

  | ID | Arquivo | Score | Clutter | Status |
  |----|---------|-------|---------|--------|
  | 1 | `openai-1.png` | 8 | 3 | ✅ passa |
  | **2** | `openai-2.png` | **9** | **3** | ✅ **escolhida (melhor)** |
  | 3 | `openai-3.png` | 8 | 4 | ✅ passa |

- **Conceito:** robô de IA simpático (esfera ciano com carinha) dentro de uma janela de contexto; mãos humanas acolhedoras selecionam só os blocos de alto sinal (brilho teal) de uma pilha caótica (âmbar) e os colocam na janela. Outcome: o robô sorri porque recebe só o que importa.

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um pequeno robô de IA simpático (esfera ciano com carinha feliz) dentro de uma janela de contexto; mãos humanas acolhedoras selecionam poucos blocos brilhantes de alto sinal de uma pilha caótica âmbar e os colocam na janela. Texto "O CONTEXTO É O PRODUTO".

## Notas de publicação
- Capa quadrada 1024×1024 (LinkedIn feed mobile).
- Dia/horário sugerido: terça 8h–10h ou quinta 9h–11h.
