# Post LinkedIn #06b — Vibe coding é dívida de integração com nome de marketing (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~195 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Karpathy + Simon Willison + Martin Fowler + GitClear + METR + CodeRabbit — ver `pesquisas/06-vibe-fast-integration-debt.md`
**Pares com:** imagem `imagens/06-vibe-fast-integration-debt/openai-1.png` ("DÍVIDA COM NOME BONITO")

---

## Post (copie a partir daqui)

Já se empolgou com a velocidade da IA gerando código, aceitou tudo sem ler... e duas semanas depois o codebase virou uma zona que ninguém entende?? 😅

Tem nome bonito pra isso. Vibe coding. Mas por trás do nome, é dívida técnica.

Lendo o que o Karpathy (que cunhou o termo) e o Simon Willison escreveram, confirmei como eu penso: o lance não é usar IA. É usar IA **sem revisar o código que ela escreve**. "Aceitar tudo sem ler os diffs" = integrar código que ninguém auditou.

Pense num empréstimo. Dívida técnica sempre foi isso: pedir velocidade emprestada do seu eu do futuro. A diferença é que a IA removeu o freio — gera código numa velocidade que a sua revisão não acompanha.

Em 3 ideias simples:

1️⃣ **A dívida tem métrica.** O GitClear analisou 211 milhões de linhas: refatoração despencou de 25% pra menos de 10%; cópia/colada subiu 8x.

2️⃣ **A velocidade é ilusão.** Devs sêniores ficaram **19% mais lentos** com IA — acreditando estar 20% mais rápidos (METR, estudo controlado).

3️⃣ **A saída não é menos IA.** É reinstalar os gates: revisão, evals, sensores. O Martin Fowler chama isso de agentic programming.

Resumo da ópera: vibe coding é dívida de integração com nome de marketing. Agentic programming é a mesma dívida — mas com amortização.

E você: tá amortizando a dívida ou só acumulando?? 👇

#InteligenciaArtificial #VibeCoding #TechDebt #EngenhariaDeSoftware #CodeReview

---

## Hooks alternativos (teste A/B)
- "Vibe coding não é uma forma de programar. É dívida de integração com nome de marketing."
- "Refatoração caiu de 25% pra menos de 10% das linhas alteradas. Em 211 milhões de linhas."
- "Devs sêniores ficaram 19% mais lentos com IA — acreditando estar 20% mais rápidos."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora do empréstimo** (dívida = velocidade emprestada do futuro; IA remove o freio) torna "fast-integration debt" concreto.
- Cortou os números densos (CodeRabbit 2.74x segurança, arXiv:2505.19443, 7 blocos do agentic) — foco no "e daí?": dívida com métrica + velocidade ilusória + amortização.
- CTA-pergunta com emoji no fim (👇).
- 5 hashtags focadas.
- **Conexão:** #01 2.0 (debt is a prompt) → **este #06** (vibe = fast-integration debt) → #03 (eval = amortização).

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/06-vibe-fast-integration-debt/openai-1.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, **texto_com_acento=true** "DÍVIDA COM NOME BONITO") — passou no gate.
- **Variantes validadas (sessão 25/jun/2026):**

  | ID | Arquivo | Score | Clutter | Acentos | Status |
  |----|---------|-------|---------|---------|--------|
  | **1** | `openai-1.png` | **9** | **2** | ✅ **true** | ✅ **escolhida (sem problemas)** |
  | 2 | `openai-2.png` | 8 | 3 | ✅ true | ✅ passa |

- **Conceito:** antes/depois — torre caótica de blocos de código âmbar (duplicados, trincados, com etiqueta "IOU") à esquerda → pilha estável teal com escudo/checklist/sensor à direita; mãos humanas colocam o bloco do topo; robô fofo assiste. Outcome: dívida → amortizada.
- **Texto na imagem:** "DÍVIDA COM NOME BONITO" (maiúsculo, **com acento í** — novo padrão).

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: à esquerda uma torre instável de blocos de código âmbar duplicados com etiqueta de dívida; à direita uma pilha estável de blocos teal com escudo, checklist e sensor; mãos humanas acolhedoras colocam o bloco do topo enquanto um robô simpático assiste; seta de transformação no meio. Texto "DÍVIDA COM NOME BONITO".

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024×1024, ótima pro feed mobile).
- Dia/horário sugerido: terça 8h–10h (tema de dívida gera debate).
- Resposta pronta a comentário ("então IA é ruim?"): "Não. A diferença entre vibe e agentic não é a IA, é a revisão. Usar IA com review + evals é engenharia. Pular a revisão é dívida." 👇
