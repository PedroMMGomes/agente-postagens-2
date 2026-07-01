# Context Engineering — pesquisa

- **Tema:** context engineering — a disciplina que substituiu prompt engineering
- **Data da pesquisa:** 20 jun 2026
- **Tags:** IA, LLM, Context Engineering, RAG, Memory, Retrieval, Agents, Harness
- **Relevância p/ perfil:** 🔴 ALTA — IA + Dados/AI, duas das três áreas do perfil; é o tema mais discutido em AI engineering no 1º semestre de 2026; conecta diretamente com o post #01 do v1 (harness) e o post #01 do 2.0 (debt is a prompt).

## Fontes (4, independentes)

| # | Autor | Onde | Data | Tipo |
|---|-------|------|------|------|
| 1 | Anthropic Applied AI team | anthropic.com/engineering | 29 set 2025 | **Fonte canônica** (define o termo) |
| 2 | Daniel Ford / Anthropic | anthropic.com/news | 19 set 2024 | Método técnico (Contextual Retrieval, dados concretos) |
| 3 | Gabriel Henrique | dev.to | 4 jun 2026 | Practitioner (data engineer, síntese prática) |
| 4 | Youngju Kim | youngju.dev | 12 jun 2026 | Practitioner (profundo em memória, frescor) |

> #1 é a âncora (fonte original da definição). #3 e #4 citam #1. #2 é o método técnico que fundamenta o retrieval moderno.

## Tópicos

### 1. A virada de conceito: prompt engineering → context engineering (Anthropic)
**Insight:** a Anthropic define context engineering como a "progressão natural" do prompt engineering. Prompt engineering = como **escrever** instruções. Context engineering = como **curar e manter o conjunto ótimo de tokens** durante a inferência — incluindo tudo que cai no contexto além do prompt (tools, MCP, dados externos, histórico de mensagens).

> "Building with language models is becoming less about finding the right words and phrases for your prompts, and more about answering the broader question of 'what configuration of context is most likely to generate our model's desired behavior?'" — Anthropic

> "Context engineering is the art and science of curating what will go into the limited context window from that constantly evolving universe of possible information." — Anthropic (citando Karpathy)

**Definição operacional (a que uso no post):** "find the smallest set of high-signal tokens that maximize the likelihood of your desired outcome."

**Prova:** "As we move towards engineering more capable agents that operate over multiple turns of inference and longer time horizons, we need strategies for managing the entire context state (system instructions, tools, MCP, external data, message history, etc)."
**Origem:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### 2. Por que contexto é recurso escasso: context rot + attention budget (Anthropic + youngju)
**Insight:** context window cresceu (200K → 1M tokens), mas "caber" ≠ "dever caber". Três constraints:
1. **Custo:** a $3/M tokens, arrastar 150K tokens/turn = $0.45/turn. Sessão de 50 turnos = $22. Serviço com 1000 sessões/dia = **centenas de milhares de dólares/mês** só em input. (youngju)
2. **Latência:** mais tokens = mais tempo até o primeiro token.
3. **Attention budget:** "lost in the middle" (Liu et al. 2023) — modelo lembra melhor do início e fim; meio é esquecido. Piora com "context rot" (Chroma research): quanto mais tokens irrelevantes se acumulam, mais o modelo perde instruções, confunde info velha com nova, alucina.

> "Every new token introduced depletes this attention budget by some amount." — Anthropic
> "Context, therefore, must be treated as a finite resource with diminishing marginal returns." — Anthropic

**Prova:** arquitetura transformer = n² relações pairwise para n tokens. Atenção se "estica" conforme contexto cresce. Modelos têm menos dados de treino em sequências longas.
**Origem:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents + https://www.youngju.dev/blog/ai/2026-06-12-context-engineering-ai-agent-memory.en

### 3. As 5 técnicas core (dev.to + Anthropic)
**Insight:** técnicas concretas que diferenciam context engineering de prompt engineering:

1. **Strategic positioning** — system prompt no início, query no fim, dados relevantes antes da query, material auxiliar no meio (onde recall é pior). (dev.to)
2. **Selective retrieval** — não despejar documento inteiro; semantic chunking + vector search só dos parágrafos relevantes. (dev.to)
3. **Context caching** — Claude e Gemini suportam prompt caching; reduz custo **75–90%** em tokens cacheados. (dev.to + Anthropic)
4. **Structured context formats** — XML tags / delimiters claros separam seções; LLMs respondem melhor a input estruturado. (dev.to + Anthropic)
5. **Dynamic context compression** — rolling summarization em vez de truncar do início; preserva o que importa. (dev.to + Anthropic)

**Frase-chave do post:** "Prompt engineering is about *what you say*. Context engineering is about *what you provide*." (dev.to, síntese perfeita)
**Origem:** https://dev.to/gabrielhca/context-engineering-the-skill-replacing-prompt-engineering-in-2026-3lgd + https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### 4. Contextual Retrieval: o dado duro da Anthropic (-49% / -67%)
**Insight:** o método "Contextual Retrieval" da Anthropic (set/2024) mostra o ganho concreto de engenharia de contexto no retrieval:
- **Contextual Embeddings** sozinho: reduz falhas de retrieval top-20 em **35%** (5.7% → 3.7%).
- **Contextual Embeddings + Contextual BM25**: reduz em **49%** (5.7% → 2.9%).
- **+ Reranking (Cohere)**: reduz em **67%** (5.7% → 1.9%).
- **Prompt caching** torna o preprocessing barato: **$1.02 por milhão de tokens de documento** (one-time cost).

A ideia: prependar contexto explicativo específico do chunk antes de embeddar/indexar. Ex.: chunk "The company's revenue grew by 3%" → "This chunk is from an SEC filing on ACME corp's performance in Q2 2023; the previous quarter's revenue was $314 million. The company's revenue grew by 3%."

> "These represent significant improvements in retrieval accuracy, which directly translates to better performance in downstream tasks." — Anthropic

**Prova:** testes across codebases, fiction, arXiv papers, Science Papers. Top-20 chunks > top-10 > top-5. Voyage e Gemini embeddings = melhores.
**Origem:** https://www.anthropic.com/news/contextual-retrieval

### 5. Memory tiers: working / episodic / semantic (youngju)
**Insight:** emprestando da cognitive science, o padrão standard de memória para agentes tem 3 tiers:

| Tier | Lifetime | Storage | Retrieval |
|------|----------|---------|-----------|
| **Working** | sessão atual | context window | sempre visível |
| **Episodic** | semanas-meses | DB/vector store | cronológico + similaridade |
| **Semantic** | semi-permanente | DB/graph | key lookup + similaridade |

- **Working** = o próprio context window; design = posicionamento e prioridade.
- **Episodic** = "na terça passada refatoramos o módulo de pagamento e falhamos 2x por isolamento de transação"; suma no fim da sessão, injeta as últimas 3 no início da próxima.
- **Semantic** = "usuário prefere TypeScript", "projeto usa PostgreSQL 16"; extração de fatos da conversa, reconciliação (ADD/UPDATE/DELETE/NOOP) via judge LLM.

**RAG vs Memory (distinção crucial):** RAG = corpus externo estático compartilhado, read-heavy. Memory = interações dinâmicas per-user, read-write, conflito é core challenge. Confundir os dois = escolher a ferramenta errada.

> "An agent's intelligence comes from model weights, but an agent's usefulness comes in large part from memory design." — youngju
**Origem:** https://www.youngju.dev/blog/ai/2026-06-12-context-engineering-ai-agent-memory.en

### 6. Long-horizon: compaction, note-taking, sub-agents (Anthropic)
**Insight:** para tarefas que excedem o context window (dezenas de minutos a horas), a Anthropic desenvolveu 3 técnicas:

1. **Compaction** — sumarizar o contexto próximo do limite e reiniciar. Claude Code preserva decisões arquiteturais, bugs não resolvidos, detalhes de implementação; descarta tool outputs redundantes. "Tool result clearing" = forma mais leve/safe.
2. **Structured note-taking (agentic memory)** — agente escreve notas persistentes fora do context window (NOTES.md, to-do list). Claude playing Pokémon mantém mapas, tally de steps, estratégias de combate — coerência across resets. Memory tool lançado em beta na Claude Developer Platform.
3. **Sub-agent architectures** — subagentes fazem trabalho focado com context window limpo; retornam só suma condensada (1-2K tokens). Main agent coordena. "Clear separation of concerns."

> "Even as models continue to improve, treating context as a precious, finite resource will remain central to building reliable, effective agents." — Anthropic
**Origem:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### 7. Just-in-time retrieval: agente busca quando precisa (Anthropic)
**Insight:** shift de "pre-processar tudo upfront" para "manter identificadores leves (file paths, queries, links) e carregar dinamicamente com tools". Claude Code faz isso — escreve queries, armazena resultados, usa `head`/`tail` para analisar grandes volumes sem carregar tudo no contexto. Espelha cognição humana: não memorizamos corpuses, usamos sistemas de indexação (file systems, inboxes, bookmarks).

**Híbrido é o real:** Claude Code = CLAUDE.md upfront + glob/grep just-in-time. "Do the simplest thing that works" continua sendo o melhor conselho.

> "Letting agents navigate and retrieve data autonomously also enables progressive disclosure — agents incrementally discover relevant context through exploration." — Anthropic
**Origem:** https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### 8. Pitfall crítico: memory poisoning (youngju)
**Insight:** o failure mode mais perigoso de memória. Um fato errado armazenado é injetado em toda sessão seguinte e reproduz o erro. Pior: malicious poisoning — se o agente "lembra" instruções embutidas em conteúdo de terceiros (web pages, emails), você tem **prompt injection com persistência**. Defesas:
- Trust boundary separation (user statements vs external content em níveis de confiança diferentes).
- Write validation (scan de injection patterns antes de gravar).
- Periodic audits (LLM audita a memory store, detecta contradições).
- User visibility (UI onde usuário vê e deleta memórias).

**Paradoxo do over-remembering:** injetar memória de baixa relevância reproduz o context rot. "The unsettling experience of dragging up something I said long ago with no context."
**Origem:** https://www.youngju.dev/blog/ai/2026-06-12-context-engineering-ai-agent-memory.en

## Ângulo unificador (a tese)

> **Prompt engineering morreu. O que sobrou se chama context engineering.** O leverage não está mais em escrever o prompt perfeito — está em projetar **tudo que o modelo vê antes de responder**: retrieval, memória, posicionamento, compressão, caching. Contexto é recurso escasso (custo, latência, attention budget com context rot). A Anthropic definiu a disciplina: "encontrar o menor conjunto de tokens de alto sinal que maximiza a probabilidade do resultado desejado." E os números confirmam: Contextual Retrieval corta falhas em 49% (67% com reranking); prompt caching corta custo em 90%.

**Conexão com posts anteriores:**
- Post #01 do v1 (harness engineering): context engineering é o harness aplicado ao **conhecimento** — não ao código.
- Post #01 do 2.0 (debt is a prompt): se o codebase é o prompt (Joshi/Voronin), então context engineering é a disciplina que **gerencia** esse prompt — posicionamento, retrieval seletivo, compressão, memória. Fecha a trilogia.

## Takeaways para posts

- **(POST #02 deste repo)** Tese central: prompt eng morreu → context eng; contexto é recurso escasso; 5 técnicas core; dado Anthropic (-49%/-67%/-90%); conexão com harness. Provas: Anthropic (canônica) + dev.to (5 técnicas) + youngju (economia $) + Anthropic Contextual Retrieval (números).
- **Derivado:** Memory tiers (working/episodic/semantic) rende um post profundo próprio — P-L no backlog.
- **Derivado:** Memory poisoning + prompt injection com persistência — post de segurança (conexão com VibeSec do v1).
- **Derivado:** "Just-in-time retrieval" como shift de paradigma — conexão com agentic vs pre-processed.
