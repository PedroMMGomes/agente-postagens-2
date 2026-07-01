# Backlog — Ideias para posts futuros (Agente 2.0)

> Pautas para a Fase A. Cada item tem hook sugerido + origem (pesquisa do 2.0 ou v1).
> Priorização: 🔴 = mais viral / demonstra mais domínio técnico.

> Convenção: quando uma pauta vira post, risque ela aqui e adicione derivados novos.
> Numeração do 2.0 começa em `01-` (independente do v1).

---

## Em aberto

### ~~🔴 P-A — Context Engineering (a disciplina pós-prompt-eng)~~ ✅ POST #02
**Hook:** "Prompt engineering morreu. O que sobrou se chama context engineering."
- Gestão de contexto/retrieval/memória/ferramentas como disciplina única.
- Conexão com harness engineering (post #01 do v1): contexto é o insumo do harness.
- **Origem:** buscar nova (zai-search, oneMonth) — v1 não cobriu.

### ~~🔴 P-B — Eval-Driven Development para IA~~ ✅ POST #03
**Hook:** "Avaliação virou o CI/CD dos sistemas de IA. RAGAS, golden sets, evals em todo PR."
- Avaliação contínua como gate de qualidade em sistemas de IA.
- DevOps + Dados/AI — duas das três áreas do perfil.
- **Origem:** buscar nova.

### ~~🟠 P-C — Você é o GIL dos seus agentes~~ ✅ POST #04
**Hook:** "Spawar 20 agentes em paralelo não é skill. O skill é projetar em torno do único recurso que não clona: sua atenção."
- Analogia de Andy Osmani: você é o Global Interpreter Lock dos seus agentes.
- **Origem:** `../agente-postagens/pesquisas/06-fragments-jun-02.md` (tópico 7) + nova busca.

### ~~🟠 P-D — Vibe coding x Agentic programming~~ ✅ POST #06
**Hook:** "Vibe coding virou buzzword. Mas é diferente de agentic programming — e usar um pelo outro é onde mora o risco."
- Distinção de Martin Fowler.
- **Origem:** `../agente-postagens/pesquisas/04-bliki-vibe-coding.md`.

### 🟠 P-E — Lift-and-shift reabilitado pela IA (Cobol→Rust)
**Hook:** "Portar 70 mil linhas de Cobol pra Rust em 3 dias mudou a matemática da modernização."
- Caso: clone comportamental do GNU Cobol em Rust (70K linhas, 3 dias).
- **Origem:** `../agente-postagens/pesquisas/08-fragments-may-14.md`.

### 🟠 P-F — Os 4 registros de conversa com LLM
**Hook:** "Você está usando o registro errado no ChatGPT/Claude. Por isso as respostas são ruins."
- Chelsea Troy: Exploring / Brainstorming / Deciding / Implementing.
- **Origem:** `../agente-postagens/pesquisas/05-fragments-jun-16.md` (tópico 3).

### 🟡 P-G — Mozilla: IA caçando 423 bugs/mês no Firefox
**Hook:** "Em 2025 a IA reportava bugs falsos em open source. Em abril/2026, o Firefox corrigiu 423 bugs com IA."
- IA como defesa ofensiva.
- **Origem:** `../agente-postagens/pesquisas/06-fragments-jun-02.md` (tópico 5).

### 🟡 P-H — DDD fica mais importante com LLMs
**Hook:** "Quem achou que IA matava o DDD errou. Eric Evans e Fowler apostam no oposto."
- **Origem:** `../agente-postagens/pesquisas/05-fragments-jun-16.md` (tópico 2).

### 🟠 P-I — "Code is harness" (Joshi, martinfowler.com)
**Hook:** "O harness não é só o que você coloca ao redor do modelo. É também o código que você deixa o modelo ler."
- Unmesh Joshi (Thoughtworks): código bem estruturado com abstrações estáveis = parte mais importante do harness/contexto. Te dá liberdade pra trocar de modelo sem refinar prompt.
- **Origem:** `pesquisas/01-technical-debt-prompt.md` (tópico 3) + https://martinfowler.com/articles/what-is-code.html.
- **Conexão:** fecha o loop do post #01 do v1 (harness engineering) + post #01 deste repo (debt is a prompt).

### ~~🟠 P-J — "Vibe coding é fast-integration debt com nome bonito"~~ ✅ POST #06
**Hook:** "Vibe coding tem charme. Mas a revisão acadêmica de 104 fontes (arXiv, jun/2026) tem um nome menos charmoso pra mesma coisa: fast-integration debt."
- Conexão com P-D (vibe vs agentic) e com o post #01 deste repo.
- **Origem:** `pesquisas/01-technical-debt-prompt.md` (tópico 5) + `../agente-postagens/pesquisas/04-bliki-vibe-coding.md`.

### 🟡 P-K — Métricas que abastecem a própria dívida generativa
**Hook:** "LOC gerados, tickets fechados, commits por dia. Cada uma dessas métricas alimenta a dívida que você diz querer reduzir."
- Conexão com P1 do v1 (métricas falhas) + post #01 deste repo (takeaway final).
- **Origem:** `pesquisas/01-technical-debt-prompt.md` (takeaway 4) + `../agente-postagens/pesquisas/06-fragments-jun-02.md` (tópico 1).

---

## Virou post (riscar e linkar)

### ✅ Post #01 — "Technical debt is a prompt now" (20/jun/2026)
- Post denso: `posts-linkedin/01-technical-debt-prompt.md`
- Post humano (pronto para publicar): `posts-linkedin/01b-technical-debt-prompt.md`
- Imagem: `posts-linkedin/imagens/01-technical-debt-prompt/openai-2.png` (Tier 0 OpenAI `gpt-image-2`)
- Pesquisa: `pesquisas/01-technical-debt-prompt.md` (4 fontes: Voronin, Joshi, GitClear, arXiv)

**Derivados adicionados ao backlog abaixo (da pesquisa):**

### ✅ Post #02 — "Context Engineering (prompt engineering morreu)" (25/jun/2026)
- Post denso: `posts-linkedin/02-context-engineering.md`
- Post humano (pronto para publicar): `posts-linkedin/02b-context-engineering.md`
- Imagem: `posts-linkedin/imagens/02-context-engineering/openai-2.png` (Tier 0 `gpt-image-2`, score 9.0)
- Pesquisa: `pesquisas/02-context-engineering.md` (Anthropic canônica + dev.to + youngju)
- **Fecha a trilogia** (harness v1 → debt is prompt → context eng).

### ✅ Post #03 — "Eval-Driven Development: o CI/CD da IA" (25/jun/2026)
- Post denso: `posts-linkedin/03-eval-driven-dev.md`
- Post humano (pronto para publicar): `posts-linkedin/03b-eval-driven-dev.md`
- Imagem: `posts-linkedin/imagens/03-eval-driven-dev/openai-1.png` (Tier 0 `gpt-image-2`, score 9.0)
- Pesquisa: `pesquisas/03-eval-driven-dev.md` (Hamel Husain canônica + Red Hat + Braintrust + Latitude)

### ✅ Post #04 — "Você é o GIL dos seus agentes" (25/jun/2026)
- Post humano (pronto para publicar): `posts-linkedin/04b-gil-agentes.md`
- Imagem: `posts-linkedin/imagens/04-gil-agentes/openai-1.png` (Tier 0 `gpt-image-2`, score 9.0)
- Pesquisa: `pesquisas/04-gil-agentes.md` (Addy Osmani canônica + Anthropic + WorkOS)

### ✅ Post #05 — "A memória da IA é o vetor de ataque que não desliga" (25/jun/2026)
- Post denso: `posts-linkedin/05-memoria-poisoning.md`
- Post humano: `posts-linkedin/05b-memoria-poisoning.md`
- Imagem: `imagens/05-memoria-poisoning/openai-2.png` (Tier 0 `gpt-image-2`, score 9.0, **acentos ✓**)
- Pesquisa: `pesquisas/05-memoria-poisoning.md` (Schneider + OWASP ASI06 + Rehberger + MINJA NeurIPS)

### ✅ Post #06 — "Vibe coding é dívida de integração com nome de marketing" (25/jun/2026)
- Post denso: `posts-linkedin/06-vibe-fast-integration-debt.md`
- Post humano: `posts-linkedin/06b-vibe-fast-integration-debt.md`
- Imagem: `imagens/06-vibe-fast-integration-debt/openai-1.png` (Tier 0 `gpt-image-2`, score 9.0, **acentos ✓**)
- Pesquisa: `pesquisas/06-vibe-fast-integration-debt.md` (Karpathy + Willison + Fowler + GitClear + METR + CodeRabbit)

### ✅ Post #07 — MASTER "O manual anti-vibe de quem leva IA a produção" (26/jun/2026)
- Post denso (carrossel expandido): `posts-linkedin/07-master-manual-anti-vibe.md`
- Carrossel pronto p/ publicar (9 slides + legenda, com humor): `posts-linkedin/07b-master-manual-anti-vibe.md`
- Capa do carrossel: `imagens/07-master-manual-anti-vibe/openai-2.png` (Tier 0 `gpt-image-2`, score 9.0, **acentos ✓** "A FACHADA NÃO É A OBRA")
- Une os 6 posts (#01–#06) num fio condutor "fachada vs fundação", com pegada de humor das `1ideias/RESUMO-IDEIAS.md`.
- Referências de humor/layout: `1ideias/RESUMO-IDEIAS.md` (7 imagens analisadas).

**Derivados novos adicionados ao backlog (destas pesquisas):**

### ~~🟠 P-L — Memory tiers (working / episodic / semantic)~~ ✅ POST #05
**Hook:** "Você tá chamando de 'memória de IA' coisas que são três camadas totalmente diferentes."
- Derivado da pesquisa #02 (tópico 5, youngju). Memory ≠ RAG (estático read-heavy vs dinâmico read-write).
- **Origem:** `pesquisas/02-context-engineering.md` tópico 5.

### ~~🟠 P-M — Memory poisoning + prompt injection persistente~~ ✅ POST #05
**Hook:** "A falha mais perigosa de IA com memória: o agente lembra de uma instrução maliciosa e executa em toda sessão seguinte."
- Derivado da pesquisa #02 (tópico 8). Conexão com VibeSec (v1). Post de segurança.
- **Origem:** `pesquisas/02-context-engineering.md` tópico 8.

### 🟠 P-N — "Teste seus testes": o known-bad set dos evals
**Hook:** "Seu LLM-judge passa em tudo? Você não tem eval — tem placebo."
- Derivado da pesquisa #03 (tópico 4, Red Hat Llama-4-Scout). Aprofundamento do ponto 3 do post #03.
- **Origem:** `pesquisas/03-eval-driven-dev.md` tópico 4.

### 🟠 P-O — Orchestration tax: Amdahl's Law para agentes
**Hook:** "A Lei de Amdahl diz exatamente quanto seu paralelismo de agentes vale — e por que adicionar mais agentes não ajuda."
- Aprofundamento técnico do post #04 (parte serial = humano = GIL).
- **Origem:** `pesquisas/04-gil-agentes.md` tópicos 3 e 5.

### 🟡 P-P — Cognitive surrender: como codebases frágeis nascem
**Hook:** "Merge cego não é má fé. É o que acontece quando o volume de revisão passa da sua banda cognitiva."
- Conexão com P-1 do v1 (codebase frágil) + post #04 (tópico 4).
- **Origem:** `pesquisas/04-gil-agentes.md` tópico 4.

---

## Sugestão de cadência

- Publicar 1–2x/semana.
- Intercalar posts técnicos densos (P-A, P-B, P-E) com práticos/leves (P-F).
- P-C (GIL) e P-G (Mozilla) são bons para posicionamento de leadership.
