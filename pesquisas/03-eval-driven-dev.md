# Eval-Driven Development — pesquisa

- **Tema:** avaliação contínua de LLM/agentes como o CI/CD dos sistemas de IA
- **Data da pesquisa:** 25 jun 2026
- **Tags:** IA, LLM, Evals, CI/CD, DevOps, EvalDriven, LLM-as-judge, Observabilidade
- **Relevância p/ perfil:** 🔴 ALTA — cruza as duas áreas centrais do perfil (DevOps & CI/CD + Engenharia de Dados/AI); é "a habilidade mais importante para PMs em 2026".

## Fontes (5, autoritativas)

| # | Autor | Onde | Data | Tipo |
|---|-------|------|------|------|
| 1 | Hamel Husain (ex-GitHub Copilot) | hamel.dev "Your AI Product Needs Evals" | 2024 (revisitado 2025-26) | **Canônica** |
| 2 | Michael Dawson / Red Hat | developers.redhat.com | mar 2026 | Practitioner (8 estágios) |
| 3 | Braintrust | braintrust.dev (CI/CD tools review) | mai 2026 | Comparativo vendor |
| 4 | Latitude.so | latitude.so (CI/CD LLM eval guide) | abr 2026 | Practitioner (CI/CD + prod) |
| 5 | Hamel Husain | hamel.dev "LLM Evals FAQ" (Maven) | 2025-26 | Canônica |

## Tópicos

### 1. Causa-raiz de produtos de IA que falham = falta de evals (não modelo, não prompt)
Hamel: produtos malsucedidos compartilham uma causa — falha em construir sistemas robustos de avaliação. Evals criam o flywheel de iteração. (origem: hamel.dev/blog/posts/evals/)

### 2. QA tradicional não funciona: "LLMs não quebram, eles derivam" (semantic drift)
CI/CD clássico testa bugs determinísticos; LLMs mudam de comportamento sem erro/exceção. A pergunta muda de "quebrou?" para "o que mudou, e importa?". (Dextra Labs via Latitude; latitude.so/blog/ultimate-ci-cd-llm-evaluation-guide)

### 3. Regressão silenciosa: mude prompt/modelo e a qualidade cai sem teste falhar
Variações de prompt, troca de modelo, update do provider degradam qualidade sem mudar assinatura. Red Hat: Llama-4-Scout "parecia" funcionar (prompt overfit a testes manuais) — só evals automatizadas revelaram direção errada. (developers.redhat.com/.../eval-driven-development...)

### 4. LLM-as-judge = padrão de fato, mas exige alinhamento humano + "testar seus testes"
Juiz mais capaz avalia saída contra rubric. Confiar humano↔juiz medido por precision/recall; manter known-bad set. Red Hat: Llama-4-Scout falha em 4-5 known-bad; Llama-3.3-70b pega todos. Regra: "the more capable the model, the more accurate your evaluations." Hamel: alinhe com spreadsheet de 25-50 exemplos.

### 5. Evals no CI/CD = GitHub Action que posta score-delta no PR; falha bloqueia merge
Cada PR roda golden dataset (20-100 casos de logs de produção), compara baseline, comenta casos regredidos/melhorados. Braintrust `eval-action`, Promptfoo em GH Actions, Latitude Batch (CI) + Live (prod).

### 6. Evals online/canary: offline não basta
Evals em CI pegam regressões pré-deploy; evals em produção (Live/online) flagam problemas em tráfego real — falhas intermitentes só aparecem sob carga/noturno. Red Hat: "runs of 100-200 without failure, only to find nightly runs surface intermittent issues under load."

### 7. Avaliação em camadas: determinístico → heurístico → LLM-judge → humano
Não use LLM-judge pra tudo (caro, viésado). Layer: regex/JSON schema → similaridade semântica → LLM-as-judge → humano. Temperatura 0. Red Hat: 15 métricas customizadas (uma por requisito de negócio).

## Ângulo unificador
> No mundo LLM, avaliação virou o CI/CD: não existe deploy confiável de IA sem golden dataset rodando em todo PR com LLM-as-judge, porque LLMs não quebram — derivam silenciosamente. Evals contínuas (offline no gate + online no tráfego) transformam "parece pior essa semana" em número que bloqueia o merge.

## Takeaways para posts
- (POST #03) QA determinístico vs IA probabilística; eval = teste de unidade do LLM no GitHub Action.
- Comece pelo golden dataset (20-100 logs reais), não pela ferramenta.
- Teste seus testes: known-bad set; juiz pelo menos tão capaz quanto o agente.
- Eval offline é metade; online/canary fecha o flywheel.
