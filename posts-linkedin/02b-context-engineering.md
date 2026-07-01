# Post LinkedIn #02b — Context Engineering (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~185 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Anthropic engineering blog (#02) + dev.to/Gabriel Henrique + youngju.dev — ver `pesquisas/02-context-engineering.md`
**Pares com:** imagem `imagens/02-context-engineering/openai-2.png` ("O CONTEXTO E O PRODUTO")

---

## Post (copie a partir daqui)

Já passou horas polindo o prompt perfeito... e mesmo assim a IA te entregou uma resposta meia-boca?? 😅

Eu também. Até ler o que a Anthropic publicou sobre como construir agentes de verdade.

Confirmou como eu penso o assunto: o lance não é mais o que você **diz** pra IA. É o que você **provê** pra ela antes de responder. Isso virou uma disciplina — context engineering.

Pense numa cozinha. O prompt é o pedido do cliente. O contexto é a despensa: se você joga tudo lá dentro (ingredientes velhos, duplicados, sem ordem), o prato sai ruim, caro e demorado. O cozinheiro bom seleciona só o que importa, na ordem certa.

Em 3 ideias simples:

1️⃣ Contexto não é grátis. A $3/M tokens, uma sessão de 50 turnos arrastando lixo custa R$ 120 — só de entrada.

2️⃣ A Anthropic cortou falhas de retrieval em 67% **sem trocar de modelo**. Só engenharia de contexto.

3️⃣ "Lost in the middle": o modelo esquece o meio do contexto. Posicionar bem é mais importante que escrever bem.

Resumo da ópera: pare de polir o wording. Comece a projetar o que entra no contexto — em que ordem, quanto, com que estrutura.

E você: tá polindo prompt ou projetando contexto? 👇

#InteligenciaArtificial #ContextEngineering #LLM #RAG #EngenhariaDeSoftware

---

## Hooks alternativos (teste A/B)
- "Prompt engineering morreu. O que sobrou se chama context engineering."
- "O melhor prompt do mundo não salva um contexto mal projetado. O ruim sim, mata o melhor."
- "A Anthropic cortou 67% das falhas de retrieval sem trocar de modelo. Só engenharia de contexto."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora da cozinha** (prompt = pedido / contexto = despensa / cozinheiro = modelo) torna o abstrato concreto pra qualquer leitor.
- Cortou os números densos da v1 (transformer n², memory tiers, contextual embeddings 5.7%→1.9%) — foco no "e daí?": -67% sem trocar modelo + custo real + lost in the middle.
- CTA-pergunta com emoji no fim (👇).
- 5 hashtags focadas.
- **Conexão intencional com a trilogia:** post #01 v1 (harness = engenharia ao redor do modelo) → post #01 2.0 (codebase = prompt) → **este #02** (context engineering = o harness aplicado ao conhecimento). Fecha a trilogia.

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/02-context-engineering/openai-2.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=3, robô fofo + mãos humanas acolhedoras) — passou no gate com folga.
- **Conceito:** um pequeno robô de IA simpático (esfera ciano com carinha feliz) dentro de uma janela de contexto; mãos humanas acolhedoras selecionam só os blocos de alto sinal (brilho teal) de uma pilha caótica (tom âmbar) e os colocam dentro da janela. Outcome claro: o robô sorri porque recebe só o que importa.
- **Texto na imagem:** "O CONTEXTO E O PRODUTO" (maiúsculo, sem acentos — estilo moderno).

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um pequeno robô de IA simpático (esfera ciano com carinha feliz) dentro de uma janela de contexto; mãos humanas acolhedoras selecionam poucos blocos brilhantes de alto sinal de uma pilha caótica âmbar e os colocam na janela. Ao centro, o texto "O CONTEXTO É O PRODUTO".

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024×1024, ótima pro feed mobile).
- Dia/horário sugerido: terça 8h–10h ou quinta 9h–11h.
- Resposta pronta a comentário ("mas prompt não importa mais?"): "Importa, mas virou o básico. O jogo decisivo migrou pro contexto — o que a IA vê, em que ordem, quanto pesa." 👇
