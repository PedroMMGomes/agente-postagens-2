# Post LinkedIn #03 — Eval-Driven Development: a avaliação virou o CI/CD da IA

**Status:** Rascunho
**Tamanho:** Médio (~300 palavras)
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Hamel Husain (hamel.dev) + Red Hat (developers.redhat.com, mar/2026) + Braintrust + Latitude.so — ver `pesquisas/03-eval-driven-dev.md`

---

## Post (copie a partir daqui)

Sua IA não quebra. Ela deriva. E ninguém percebe até o cliente reclamar.

Avaliação virou o CI/CD dos sistemas de IA. Quem ainda faz "testei na mão, pareceu bom" está rodando sem freio numa estrada sem acostamento.

QA tradicional é determinístico: você escreve `assertEqual`, o teste falha, você corrige. LLM não funciona assim — mil respostas podem estar certas, e o sistema muda de comportamento sem lançar exceção nenhuma. A pergunta deixa de ser "quebrou?" e vira "o que mudou, e isso importa?".

A causa-raiz de produtos de IA que falham, segundo o Hamel Husain (o cara que liderou o CodeSearchNet, predecessor do Copilot), é uma só: não construir um sistema robusto de avaliação. Sem evals, você não itera — chuta.

O que é um eval, na prática:

1️⃣ **Golden dataset:** 20–100 exemplos de logs reais de produção, anotados por tipo de falha. É o seu teste de unidade.

2️⃣ **LLM-as-judge:** um modelo pelo menos tão capaz quanto o seu agente avalia a saída contra um rubric. Mas com uma pegadinha — você precisa "testar seus testes": manter um *known-bad set* pra garantir que o juiz realmente pega as falhas reais. A Red Hat mostrou que o Llama-4-Scout deixava passar 4–5 falhas conhecidas; só um juiz mais forte revelou a direção errada do projeto inteiro.

3️⃣ **No PR, não no final:** GitHub Action que roda o golden set, compara contra o baseline e posta no PR quais casos regrediram e quais melhoraram. Um prompt diferente, uma troca de modelo — e o eval te diz *antes do merge* o que mudou.

E o detalhe que ninguém conta: eval offline no CI é só metade. As regressões mais traiçoeiras são intermitentes — só aparecem sob carga, no noturno. Eval online/canary no tráfego real é o que fecha o flywheel.

Meu takeaway de quem levanta IA em produção: pare de medir qualidade por "pareceu bom". Comece a tratar o golden dataset como o ativo mais valioso do seu sistema de IA — mais que o prompt, mais que o modelo.

E você: sua IA tem eval no PR ou só vibe-check? 👇

#InteligenciaArtificial #EvalDriven #DevOps #CI #LLM #EngenhariaDeSoftware #AgenticAI #EvalDrivenDevelopment

---

## Hooks alternativos (teste A/B)
- "Sua IA não quebra. Ela deriva. E ninguém percebe até o cliente reclamar."
- "Avaliação virou o CI/CD dos sistemas de IA. Quem ainda faz 'testei na mão' tá sem freio."
- "LLMs não quebram — derivam silenciosamente. Por isso o seu `assertEqual` não salva mais."
- "A causa-raiz de produtos de IA que falham é uma: falta de eval. Não é modelo, não é prompt."
- "Mudou o prompt e a qualidade caiu sem nenhum teste falhar? Parabéns, você descobriu o semantic drift."

## Notas
- **Tom:** técnico, confiante, primeira pessoa (sintetizei 5 fontes, Hamel = canônica, Red Hat = practitioner enterprise).
- Créditos implícitos: Hamel Husain (canônica), Red Hat/Dawson, Braintrust, Latitude, Dextra Labs.
- 4 provas concretas: Hamel "causa-raiz = falta de eval" + Red Hat Llama-4-Scout known-bad + GitHub Action score-delta + eval online/canary noturno.
- CTA-pergunta no fim.
- **Conexão com a trilogia:** #01 v1 (harness) → #01 2.0 (debt is a prompt) → #02 (context engineering) → **este #03** (eval = o gate que fecha o loop DevOps da IA). Eval-driven é o que torna harness/context testáveis e contínuos.
- Corte opcional para versão curta: remover o detalhe do Llama-4-Scout e o parágrafo do eval online; focar em "QA determinístico vs IA probabilística + golden dataset + eval no PR".

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/03-eval-driven-dev/openai-1.png` (1240 KB, 1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2) — passou no gate.
- **Variantes validadas (sessão 25/jun/2026):**

  | ID | Arquivo | Score | Clutter | Status |
  |----|---------|-------|---------|--------|
  | **1** | `openai-1.png` | **9** | **2** | ✅ **escolhida (sem problemas)** |
  | 2 | `openai-2.png` | 9 | 2 | ✅ passa |

- **Conceito:** robô de IA simpático produzindo saída que passa por um portão de inspeção (eval/LLM-judge); bloco bom (teal) passa com check, bloco com drift (âmbar) é barrado com X. Mãos humanas sustentam o portão.

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um pequeno robô de IA simpático cuja saída passa por um portão de inspeção com checklist; um bloco de alto sinal (teal) é aprovado e outro com drift (âmbar) é barrado, sob mãos humanas acolhedoras. Texto "O EVAL É O SEU CI".

## Notas de publicação
- Capa quadrada 1024×1024.
- Dia/horário sugerido: terça 8h–10h ou quinta 9h–11h.
