# Post LinkedIn #04b — Você é o GIL dos seus agentes (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~190 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Addy Osmani (Google) + Zack Proser (WorkOS) + Anthropic + Hrushabh Kale — ver `pesquisas/04-gil-agentes.md`
**Pares com:** imagem `imagens/04-gil-agentes/openai-1.png` ("VOCE E O GIL")

---

## Post (copie a partir daqui)

Já se empolgou spawnando 10, 20 agentes de IA em paralelo... e no fim do dia percebeu que passou a tarde inteira só revisando, e a fila só crescia?? 😅

Tem nome pra isso. Você é o GIL dos seus agentes.

Lendo o Addy Osmani (Google), confirmei como eu penso o assunto. O Python tem o GIL — você cria quantas threads quiser, mas só uma roda por vez. Com agentes é igual: roda 20 em paralelo, mas você revisa e decide um de cada vez.

Pense num caixa único de banco com uma fila enorme. Os clientes (agentes) chegam de todo lado, mas só um é atendido por vez. Abrir mais guichê não adianta — quando o guichê é você.

Em 3 ideias simples:

1️⃣ **A métrica errada:** produtividade de agentes não é "quantos tô rodando". É quantas decisões você revisa bem por hora. A Lei de Amdahl sela o teto.

2️⃣ **O perigo:** quando a fila passa da sua banda, vem o "cognitive surrender" — code review raso, merge cego, aprovar sem entender.

3️⃣ **A saída:** sub-agentes com contexto próprio que devolvem só um resumo. Você revisa decisões destiladas, não 20 transcripts brutos.

Resumo da ópera: engenharia de agentes não é paralelismo de compute. É engenharia da atenção humana. Otimize o gargalo — que é você.

E você: tá medindo agentes paralelos ou decisões bem revisadas? 👇

#InteligenciaArtificial #AgenticAI #EngenhariaDeSoftware #TechLead #Agentes

---

## Hooks alternativos (teste A/B)
- "Spawnei 20 agentes em paralelo. Produtividade nas nuvens. Exceto que eu reviso 1 por vez."
- "Você é o GIL dos seus agentes. E a Lei de Amdahl diz o seu teto."
- "Mais agentes em paralelo não é mais throughput. É mais fila esperando você."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora do caixa único** (fila de agentes, um único guichê = você) torna o "GIL/atenção serializada" concreto.
- Cortou os números densos (handoff overhead, OpenAI Symphony, Amdahl quantificado) — foco no "e daí?": fila cresce + cognitive surrender + sub-agentes.
- CTA-pergunta com emoji no fim (👇).
- 5 hashtags focadas.
- **Meta:** este post descreve exatamente como o próprio harness é operado (delegação escopada + reset de contexto) — é um metapost.

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/04-gil-agentes/openai-1.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, fila de robôs simpáticos convergindo num par de mãos humanas centrais) — passou no gate com folga.
- **Variantes validadas:** openai-1 (9/10, clutter 2, sem problemas) ✅ escolhida; openai-2 (9/10, clutter 2, "leve excesso de blocos") ✅ passa.
- **Conceito:** vários robôs de IA simpáticos chegam por lanes convergentes e formam uma fila única esperando o par de mãos humanas centrais, que segura uma única "decisão" por vez. Outcome: atenção serializada = fila.
- **Texto na imagem:** "VOCE E O GIL" (maiúsculo, sem acentos).

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: vários pequenos robôs de IA simpáticos chegam por lanes e formam uma fila única até um par de mãos humanas acolhedoras no centro, que segura uma única peça de decisão brilhante de cada vez. Texto "VOCÊ É O GIL".

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024×1024, ótima pro feed mobile).
- Dia/horário sugerido: quarta 9h–11h (posicionamento de liderança).
- Resposta pronta a comentário ("então não devo paralelizar?"): "Deve, sim. Mas meça por decisões bem revisadas por hora, não por agentes rodando. E devolva contexto isolado — o gargalo é a sua atenção, não o compute." 👇
