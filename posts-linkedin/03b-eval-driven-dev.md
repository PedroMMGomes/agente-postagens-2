# Post LinkedIn #03b — Eval-Driven Development (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~190 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Hamel Husain (hamel.dev) + Red Hat (mar/2026) + Braintrust + Latitude.so — ver `pesquisas/03-eval-driven-dev.md`
**Pares com:** imagem `imagens/03-eval-driven-dev/openai-1.png` ("O EVAL E O SEU CI")

---

## Post (copie a partir daqui)

Já mudou o prompt da sua IA, o resultado "pareceu" o mesmo... e duas semanas depois o cliente reclama que a qualidade caiu?? 😅

Isso não é bug. É drift silencioso — e seu teste de unidade não pega.

Lendo o Hamel Husain (o cara do CodeSearchNet, predecessor do Copilot) e o pessoal da Red Hat, confirmei como eu penso: avaliação virou o CI/CD dos sistemas de IA.

QA tradicional é determinístico: `assertEqual` falha, você corrige. IA não quebra — deriva. Mil respostas podem estar certas, e o comportamento muda sem lançar exceção nenhuma.

Pense numa esteira de fábrica. O robô produz a peça, mas ela só vai pra frente depois de passar por um portão de inspeção. Sem o portão, você descobre o defeito na casa do cliente.

Em 3 ideias simples:

1️⃣ **Golden dataset:** 20–100 respostas reais anotadas. É o seu "teste de unidade" de IA.

2️⃣ **LLM-as-judge no PR:** cada mudança roda o dataset e posta no PR o que regrediu e o que melhorou — antes do merge.

3️⃣ **Teste seus testes:** mantenha um conjunto de falhas conhecidas. Juiz fraco passa tudo — você não tem eval, tem placebo.

Resumo da ópera: pare de medir qualidade por "pareceu bom". Seu ativo mais valioso não é o prompt nem o modelo — é o golden dataset.

E você: sua IA tem eval no PR ou só vibe-check? 👇

#InteligenciaArtificial #EvalDriven #DevOps #CI #EngenhariaDeSoftware

---

## Hooks alternativos (teste A/B)
- "Sua IA não quebra. Ela deriva. E ninguém percebe até o cliente reclamar."
- "QA tradicional é determinístico. IA é probabilística. Seu `assertEqual` não salva mais."
- "Mudou o prompt e a qualidade caiu sem teste falhar? Isso é drift silencioso."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora da esteira de fábrica** (robô produz / portão de inspeção decide) torna o "gate de avaliação" concreto.
- Cortou os números densos (Llama-4-Scout known-bad, eval online/canary, 15 métricas) — foco no "e dai?": drift silencioso + golden dataset + eval no PR.
- CTA-pergunta com emoji no fim (👇).
- 5 hashtags focadas.
- **Conexão com a trilogia:** #01 v1 (harness) → #01 2.0 (debt is prompt) → #02 (context eng) → **este #03** (eval = o gate DevOps que fecha o loop).

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/03-eval-driven-dev/openai-1.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, robô fofo + portão de qualidade + mãos humanas) — passou no gate com folga.
- **Variantes validadas:** openai-1 (9/10, clutter 2, sem problemas) ✅ escolhida; openai-2 (9/10, clutter 2) ✅ passa.
- **Conceito:** robô de IA simpático produzindo saída que passa por um portão de inspeção (eval/LLM-judge); bloco bom (teal) passa com check, bloco com drift (âmbar) é barrado com X. Mãos humanas sustentam o portão — o humano cura o golden dataset.
- **Texto na imagem:** "O EVAL E O SEU CI" (maiúsculo, sem acentos).

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um pequeno robô de IA simpático cuja saída passa por um portão de inspeção com checklist; um bloco de alto sinal (teal) é aprovado e outro com drift (âmbar) é barrado, sob mãos humanas acolhedoras. Texto "O EVAL É O SEU CI".

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024×1024, ótima pro feed mobile).
- Dia/horário sugerido: terça 8h–10h ou quinta 9h–11h.
- Resposta pronta a comentário ("mas LLM-judge não é confiável?"): "Nenhum juiz é perfeito. Por isso você mantém um known-bad set e alinha o juiz com humano numa planilha de 25–50 exemplos. Juiz não confiável = você não tem eval, tem placebo." 👇
