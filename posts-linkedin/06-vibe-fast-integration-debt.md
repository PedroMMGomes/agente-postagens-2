# Post LinkedIn #06 — Vibe coding é dívida de integração com nome de marketing

**Status:** Rascunho
**Tamanho:** Médio-Longo (~400 palavras)
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Karpathy + Simon Willison + Martin Fowler + GitClear + METR + CodeRabbit + arXiv:2505.19443 + Port/New Stack — ver `pesquisas/06-vibe-fast-integration-debt.md`

---

## Post (copie a partir daqui)

Vibe coding não é uma forma nova de programar. É dívida técnica de integração com nome de marketing.

A definição original é do Andrej Karpathy, e ela já contém a dívida como premissa — não como efeito colateral. Palavras dele: *"fully give in to the vibes, embrace exponentials, and forget that the code even exists. I 'Accept All' always, I don't read the diffs anymore. The code grows beyond my usual comprehension."* Aceitar tudo sem ler os diffs = integrar código cuja semântica ninguém auditou. Isso é, por definição, dívida de integração acelerada.

O Simon Willison isolou o fator que realmente discrimina: vibe não é "usar LLM". É construir com LLM **sem revisar o código que ele escreve**. A regra de ouro dele: *"I won't commit any code to my repository if I couldn't explain exactly what it does to somebody else."* Usar IA com revisão + teste + compreensão é engenharia de software. Pular a revisão é o que converte produtividade em dívida.

E a dívida agora tem métrica. O GitClear analisou 211 milhões de linhas alteradas em repositórios de Google, Microsoft e Meta. A refatoração despencou de **25% das linhas alteradas em 2021 para menos de 10% em 2024**. Código copiado/colado subiu de 8,3% para 12,3%. Houve um **aumento de 8 vezes** na frequência de blocos duplicados com 5+ linhas. Pela primeira vez na história, copy/paste ultrapassou código movido — o oposto de DRY.

Os defeitos funcionais seguem o mesmo padrão. A CodeRabbit, em 470 PRs open-source, encontrou código de IA gerando **1,7x mais issues**, com **vulnerabilidades de segurança 2,74x maiores** e **75% mais misconfigurations**. Funciona no happy path; quebra nos cantos que só revisão humana detecta.

Mas o achado mais contraintuitivo é do METR (Randomized Controlled Trial com 16 desenvolvedores open-source experientes): a IA deixou devs sêniores **19% mais lentos** — intervalo de confiança de +2% a +39% — enquanto eles *previam* 24% mais rápidos e *se sentiam* ~20% mais rápidos. A lacuna entre percepção e realidade é exatamente a assinatura da dívida: a velocidade de geração é vivida como progresso, mas a velocidade de atenção — necessária pra validar a integração — domina o tempo total.

O mecanismo é estrutural, não cultural. A dívida manual tinha um freio natural: a velocidade de digitação limitava a taxa de integração de código não-revisado. A IA removeu esse freio. Geração em tokens por segundo excede em ordens de grandeza a revisão humana por segundo.

A saída não é usar menos IA. É reinstalar os gates de integração no novo paradigma. A distinção do Martin Fowler é cirúrgica: vibe coding = o humano esquece que o código existe; agentic programming = o humano dá **revisão detalhada** dentro de um loop de sensores, evals e feedback. Harness engineering. Em outras palavras: vibe coding é fast-integration debt. Agentic programming é fast-integration debt **com amortização**.

Meu takeaway: meça produtividade por velocidade de atenção, não por LOC gerados. E se você não consegue explicar o código que está subindo, você não está programando — está pegando dinheiro emprestado do seu eu do futuro, com juros compostos.

E você: tá amortizando a dívida ou só acumulando?? 👇

#InteligenciaArtificial #VibeCoding #TechDebt #EngenhariaDeSoftware #AgenticAI #CodeReview #ArquiteturaDeSoftware #FastIntegrationDebt

---

## Hooks alternativos (teste A/B)
- "Vibe coding não é uma forma nova de programar. É dívida de integração com nome de marketing."
- "Refatoração caiu de 25% pra menos de 10% das linhas alteradas. Copy/paste passou moved code pela 1ª vez. Em 211 milhões de linhas."
- "Devs sêniores ficaram 19% mais lentos com IA — acreditando estar 20% mais rápidos. A lacuna é o juro da dívida."
- "'I don't read the diffs anymore.' Isso não é técnica. É dívida como premissa."
- "Vibe coding = fast-integration debt. Agentic programming = fast-integration debt com amortização."

## Notas
- **Tom:** técnico, confiante, primeira pessoa (sintetizei 8 fontes; Karpathy = cunhou, Willison/Fowler = definição, GitClear/METR/CodeRabbit = prova empírica).
- Créditos implícitos: Karpathy (cunhou), Simon Willison (definição canônica), Martin Fowler (dicotomia), GitClear (211M linhas), METR (RCT -19%), CodeRabbit (2.74x seg).
- 4 provas: GitClear 25%→<10% + 8x duplicação; METR -19% (sentindo +20%); CodeRabbit 2.74x segurança; arXiv:2505.19443 (taxonomia).
- **Nota de honestidade:** o rótulo literal "fast-integration debt / 104 fontes" não é título de um paper único — sustentado por arXiv:2505.19443 + MLR ScienceDirect S0164121225002687. Números de citação conferidos.
- CTA-pergunta no fim.
- **Conexão:** #01 2.0 (debt is a prompt) → **este #06** (vibe = fast-integration debt) → #03 (eval-driven = a amortização). Efecha com #04 (atenção = gargalo da geração).
- Corte opcional para versão curta: remover CodeRabbit + METR detalhado; focar em GitClear + "vibe vs agentic = dívida com/sem amortização".

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/06-vibe-fast-integration-debt/openai-1.png` (1511 KB, 1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, **texto_com_acento=true**) — passou no gate.
- **Variantes validadas (sessão 25/jun/2026):**

  | ID | Arquivo | Score | Clutter | Acentos | Status |
  |----|---------|-------|---------|---------|--------|
  | **1** | `openai-1.png` | **9** | **2** | ✅ **true** | ✅ **escolhida** |
  | 2 | `openai-2.png` | 8 | 3 | ✅ true | ✅ passa |

- **Conceito:** antes/depois — torre caótica âmbar (duplicada, com etiqueta IOU) à esquerda → pilha estável teal com escudo/checklist/sensor à direita; mãos humanas colocam o bloco do topo; robô fofo assiste; seta de transformação.

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: à esquerda uma torre instável de blocos de código âmbar duplicados com etiqueta de dívida; à direita uma pilha estável de blocos teal com escudo, checklist e sensor; mãos humanas acolhedoras colocam o bloco do topo enquanto um robô simpático assiste; seta de transformação no meio. Texto "DÍVIDA COM NOME BONITO".

## Notas de publicação
- Capa quadrada 1024×1024.
- Dia/horário sugerido: terça 8h–10h (tema de dívida gera debate).
