# Post LinkedIn #01 — Technical debt is a prompt now (a dívida virou prompt)

**Status:** Aprovado (imagem Tier 0 selecionada por validação humana)
**Tamanho:** Médio (~300 palavras)
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Pavel Voronin (14 mai 2026) + Unmesh Joshi "What Is Code?" (martinfowler.com, 12 mai 2026) + GitClear/LeadDev (2025) + arXiv 2606.14796 (jun 2026) — ver `pesquisas/01-technical-debt-prompt.md`

---

## Post (copie a partir daqui)

Dívida técnica sempre cobrou juros. Com LLMs ela passou a se multiplicar sozinha.

Lendo o que Pavel Voronin e o Unmesh Joshi (Thoughtworks) publicaram em maio, cheguei numa mudança de conceito que altera como trato codebase em projeto com IA: a dívida técnica deixou de ser só atrito e virou **prompt**.

Antes dos LLMs, código ruim doía como fricção — tornava cada mudança mais lenta. Era um problema de custo de mudança. Agora o codebase é o contexto que ensina o modelo o que escrever a seguir. Como o Voronin colocou: numa base degradada, o modelo não vê dívida — vê exemplo, precedente, um estilo a continuar. Uma fronteira vaga vira padrão. Um nome enganoso vira vocabulário. Um invariante ausente vira permissão. A dívida virou um problema de distribuição de probabilidade: ela muda o que vai ser escrito a seguir.

O número duro confirma. A GitClear analisou 211 milhões de linhas (2020–2024) e encontrou **aumento de 8x na duplicação** de blocos de código em 2024 — 10x maior que dois anos antes. Linhas copy-pasted já superam linhas movidas (o sinal de refatoração). O DORA 2024 do Google mostrou que +25% de uso de IA acelerou reviews, mas derrubou **7,2% a estabilidade de entrega**. Uma revisão acadêmica de 104 fontes (arXiv, junho/2026) batizou o fenômeno: **fast-integration debt** — código rápido prioriza velocidade sobre qualidade e dispara um dominó de governance debt.

O caminho não é parar de delegar. É entender que, como diz o Joshi, **o código bem estruturado é a parte mais importante do harness** — abstrações estáveis com semântica clara te dão até liberdade pra trocar de modelo sem refinar prompt. Refatorar virou model steering: cada nome limpo, cada invariante num teste, cada fronteira honesta muda o que a IA vai gerar a seguir.

Meu takeaway de quem constrói produto com IA: pare de medir produtividade por LOC e commits — isso abastece a própria dívida generativa. Comece a medir codebase como prompt surface.

E você: tá tratando seu codebase como dívida ou como prompt?

#InteligenciaArtificial #EngenhariaDeSoftware #TechDebt #ArquiteturaDeSoftware #LLM #Refactoring #TechLead #AgenticAI

---

## Hooks alternativos (teste A/B)
- "Dívida técnica sempre cobrou juros. Com LLMs ela passou a se multiplicar sozinha."
- "Seu codebase não é mais só o que você mantém. É o prompt que ensina a IA o que escrever a seguir."
- "Código ruim sempre foi lento. Agora é contagioso — na velocidade da geração, não da atenção."
- "Refatoração virou model steering. Quem não entendeu isso tá abastecendo a própria dívida."
- "O número do GitClear é frio: 8x mais duplicação de código em 1 ano de IA. Não é coincidência."

## Notas
- **Tom:** técnico, confiante, primeira pessoa (sintetizei 4 fontes, não repassei uma).
- Créditos implícitos: Voronin, Unmesh Joshi (Thoughtworks), GitClear, DORA/Google, arXiv.
- 4 provas concretas: citação Voronin + 8x/211M (GitClear) + 7,2% estabilidade (DORA) + fast-integration debt (arXiv).
- CTA-pergunta no fim.
- **Conexão intencional com o post #01 do v1 (harness engineering):** este post fecha o loop — o harness não é só o que se coloca ao redor do modelo, é também o código que se deixa o modelo ler (Joshi: "code itself as harness"). Bom para série.
- Corte opcional para versão curta: remover os números DORA/arXiv, ficar com Voronin + GitClear 8x + Joshi harness.

---

## Imagem
- **Final:** `imagens/01-technical-debt-prompt/openai-2.png` (1524 KB, 1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Validação:** aprovada por validação humana (20/jun/2026). Score GLM-4.6V: pendente de run no Kilo Code (MCP `zai-vision`) — o modelo GLM-5.2 deste runtime não suporta entrada de imagem; o agente no Kilo Code completa a rubric JSON. Conceito confirmado pelo autor: código emaranhado → IA lendo → cópias se multiplicando, com headline legível.
- **Conceito (conceito-primeiro):** loop de auto-reprodução — um bloco de código emaranhado (spaghetti, glow âmbar) no centro, um agente de IA mínimo lendo-o, um loop circular de feedback gerando 3 cópias idênticas (sistema reproduzindo a própria confusão), com vinheta pequena à esquerda de um humano arrastando um bloco pesado à mão (antes = fricção lenta) vs a IA multiplicando rápido (depois = contágio em velocidade de geração). Headline "TECH DEBT IS A PROMPT NOW".
- **Variantes geradas:** `openai-1.png` (1463 KB, descartada — autor preferiu a 2), `openai-2.png` (1524 KB, aprovada).
- **Log:** `imagens/01-technical-debt-prompt/openai-log.json` (modelo, size, prompt final, 58.5s).
- **Tier usado de fato:** Tier 0 OpenAI `gpt-image-2` (default). Fallback Pollinations testado primeiro (3 variantes) e descartado assim que a chave OpenAI foi configurada.
- **Aprendizado do teste:** o `gpt-image-2` renderizou o headline "TECH DEBT IS A PROMPT NOW" de forma legível (confirmado pelo autor), validando a regra anti-clutter embutida no concept-brief.

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um bloco de código emaranhado com brilho âmbar no centro, lido por um pequeno agente de IA robótico; um loop circular de feedback gera três cópias idênticas do bloco emaranhado, sugerindo auto-reprodução da dívida em velocidade de geração. À esquerda, vinheta pequena e dessaturada de um humano arrastando um bloco pesado à mão (antes = fricção lenta). Headline "TECH DEBT IS A PROMPT NOW" em fonte sans-serif branca.

## Notas de publicação
- Capa quadrada 1024×1024 (LinkedIn aceita; ótima para feed mobile).
- Dia/horário sugerido: terça 8h–10h ou quinta 9h–11h (audience do perfil).
- Parear com a versão humana `01b-technical-debt-prompt.md` (pronto para publicar).
- Para re-rodar com `gpt-image-2-2026-04-21` (pin de reprodução) ou outro modelo: ver `ferramentas/runbooks/openai-imagem.md`.
