# Technical debt is a prompt now — pesquisa

- **Tema:** dívida técnica na era dos LLMs — de atrito para prompt
- **Data da pesquisa:** 20 jun 2026
- **Tags:** Arquitetura, IA, LLM, Technical Debt, Refactoring, Cognitive Debt, Generative Debt
- **Relevância p/ perfil:** 🔴 ALTA — Arquitetura + IA, duas das três áreas do perfil; tema central para quem constrói produto com IA e delega código a agentes.

## Fontes (4, independentes)

| # | Autor | Onde | Data | Tipo |
|---|-------|------|------|------|
| 1 | Pavel Voronin | pavelvoronin.com | 14 mai 2026 | Practitioner (3 décadas) |
| 2 | Unmesh Joshi | martinfowler.com | 12 mai 2026 | Distinguished Engineer @ Thoughtworks |
| 3 | Ehsani et al. | arXiv 2606.14796 | 11 jun 2026 | Acadêmico (aceito TOSEM 2026) |
| 4 | GitClear / LeadDev | leaddev.com | fev 2025 | Dado empírico (211M linhas) |

> #1 (Voronin) rifa explicitamente #2 (Joshi "What Is Code?"). #3 é a âncora acadêmica recente. #4 traz o número duro.

## Tópicos

### 1. A virada de conceito: dívida era atrito, virou prompt (Voronin)
**Insight:** antes dos LLMs, dívida técnica doía como **fricção** — tornava cada mudança mais lenta (humano lia mais, lembrava mais complexidade acidental, contornava compromissos velhos). Era um **problema de custo de mudança**. Com LLMs usando o codebase como contexto, a dívida virou **prompt**: o código existente é evidência (nomes, módulos, interfaces, testes, padrões de chamada, convenções locais) que sugere o que pertence ali.

> "In a degraded codebase, the model does not see 'technical debt' as debt. It sees examples. It sees precedent. It sees a style to continue." — Voronin

Concretização em 4 linhas:
- Uma fronteira vira padrão.
- Um nome enganoso vira vocabulário.
- Uma abstração falsa vira arquitetura.
- Um invariante ausente vira permissão.

**Prova:** "Traditional technical debt is a cost-of-change problem. Generative technical debt is a probability-distribution problem. It changes what gets written next." (Voronin)
**Origem:** https://pavelvoronin.com/technical-debt-is-a-prompt-now/

### 2. O multiplicador: o sistema reproduz a própria confusão (Voronin)
**Insight:** a dinâmica de "código novo espelha código velho" sempre existiu (humanos copiam o que está por perto). LLMs **não introduzem** isso — **aceleram**. O que se espalhava na velocidade da atenção humana agora se espalha na velocidade da geração.

> "Bad structure leads to worse context. Worse context leads to worse generated code. Worse generated code further degrades the structure. The system begins to reproduce its own confusion." — Voronin

**Consequência prática:** "If code is context, architecture is model steering." Refatoração que clarifica um conceito de domínio não só ajuda o próximo humano — melhora a **prompt surface** do codebase. Um teste que codifica um invariante ensina o modelo o que não pode ser violado.
**Origem:** https://pavelvoronin.com/technical-debt-is-a-prompt-now/

### 3. Code = harness: a base teórica (Joshi, martinfowler.com)
**Insight:** Unmesh Joshi (Distinguished Engineer @ Thoughtworks, autor de "Patterns of Distributed Systems") argumenta que LLMs forçam distinguir **dois papéis do código**:
1. **Instruções para a máquina** — parte sendo commoditizada pelos LLMs.
2. **Modelo conceitual do domínio** — vocabulário, nomes, fronteiras, relações, abstrações, invariantes. **Esta parte fica MAIS importante**, não menos.

> "A well-structured code with abstractions forming a well defined vocabulary itself acts as the most important part of the harness and context." — Joshi

**Conexão com o post #01 do v1 (harness engineering):** Joshi fecha o loop — muito da discussão de harness/context engineering trata código como blackbox e gere o contexto externamente (prompts, specs, testes). Joshi diz: o **próprio código bem estruturado** é a parte mais importante do harness. "When the code is built with stable abstractions with clear semantics, you get some freedom to choose whatever LLM model you use and do not need to worry much about how accurate your prompts are."

**Prova:** "Coding can not happen in isolation... Techniques like TDD are excellent for this iterative development of the vocabulary." / "The act of writing code is itself part of our thinking. We are not meant to be passive reviewers of generated code."
**Origem:** https://martinfowler.com/articles/what-is-code.html

### 4. Cognitive debt: vocabulário sem entendimento (Joshi + arXiv 2603.22106)
**Insight:** Joshi define **cognitive debt** (citando arXiv 2603.22106): acumula quando palavras/abstrações/estruturas são usadas **sem que as pessoas entendam seu significado**. LLMs amplificam porque geram código plausível rápido — controllers, repositories, reducers, factories... compila, passa testes básicos, mas a equipe não entende o modelo conceitual por trás.

> "The problem is not that the LLM generated code. The problem is that the code introduced vocabulary faster than the developers built understanding." — Joshi

**Distinção de Voronin (refinamento):**
- **Cognitive debt** = o que o **time** não entende mais.
- **Generative debt** = o que o **modelo** agora provavelmente vai reproduzir.

**Origem:** https://martinfowler.com/articles/what-is-code.html + https://pavelvoronin.com/technical-debt-is-a-prompt-now/

### 5. Âncora acadêmica: 104 fontes, novas categorias de dívida (arXiv, jun 2026)
**Insight:** revisão multivocal de **104 fontes (31 formais, 73 grey)** sobre dívida técnica em dev assistido por LLM. Achados:
- LLMs **amplificam** formas tradicionais (code, design, documentation debt) **e** introduzem dívidas novas específicas.
- Nova categoria-chave: **fast-integration debt** — código gerado rápido prioriza velocidade sobre qualidade, dispara efeito dominó → governance debt → custo de manutenção de longo prazo.
- Outras emergentes: **prompt, ethical, data, provenance debt**.
- **Gap:** ainda **não existem** benchmarks padronizados ou métricas LLM-específicas. Ferramentas: SonarQube (prática), CodeSmellEval (protótipo de pesquisa).
- Estratégias citadas: human-in-the-loop, prompt engineering, data quality alignment.

**Prova:** "LLMs often amplify traditional forms of technical debt... while also introducing new LLM-specific debts. Notably, we identify fast-integration debt, where rapidly generated code prioritizes speed over quality, triggering a domino effect that leads to governance debt and increased long-term maintenance costs."
**Origem:** https://arxiv.org/abs/2606.14796 (Ehsani, Rawal, Cai, Chatterjee; aceito ACM TOSEM 2026)

### 6. O número duro: 211 milhões de linhas (GitClear / LeadDev)
**Insight:** GitClear analisou **211 milhões de linhas mudadas (2020–2024)** em repos privados + 25 dos maiores open-source. Dados concretos:
- **Aumento de 8x** na frequência de blocos de código (5+ linhas) que duplicam código adjacente em 2024.
- Duplicação **10x maior** que 2 anos antes.
- 46% das mudanças = linhas novas; linhas **copy-pasted > linhas movidas** (movidas = sinal de refatoração/reuso; está caindo ano a ano).
- DORA 2024 (Google): **+25% uso de IA** → code reviews mais rápidas e docs melhores, **MAS −7,2% na estabilidade de entrega**.
- Citação forte: "I don't think I have ever seen so much technical debt being created in such a short period of time during my 35-year career in technology." — Kin Lane (API evangelist).

**Prova:** "If developer productivity continues being measured by commit count or lines added, AI-driven maintainability decay will proliferate." — Bill Harding, CEO GitClear/Amplenote.
**Origem:** https://leaddev.com/technical-direction/how-ai-generated-code-accelerates-technical-debt (GitClear AI Copilot Code Quality 2025)

## Ângulo unificador (a tese)

> **Dívida técnica deixou de ser atrito e virou prompt.** Antes, código ruim deixava a próxima mudança mais lenta (um problema de custo de mudança). Agora, o codebase é o contexto que ensina o modelo o que escrever a seguir — código ruim se multiplica na velocidade da geração, não da atenção humana. Refatorar não é mais só limpeza: é **model steering**. E o próprio código bem estruturado, com abstrações estáveis e invariantes, **é a parte mais importante do harness** (Joshi). Quem mede produtividade por LOC/commits está abastecendo a própria dívida generativa.

Conexão com o post #01 do v1 ("o harness é o produto"): este post é o **complemento natural** — o harness não é só o que você coloca ao redor do modelo (Fase C/D do post #01), é também **o código que você deixa o modelo ler**.

## Takeaways para posts

- **(POST #01 deste repo)** Tese central: dívida virou prompt; refatorar = model steering; cognitive vs generative debt. Provas: Voronin + Joshi + GitClear (8x duplicação) + arXiv (fast-integration debt).
- **Derivado:** "Vibe coding é fast-integration debt com nome bonito" — conexao com P-D (vibe vs agentic) do backlog.
- **Derivado:** "Code is harness" — Joshi sozinho rende um post profundo sobre code-as-conceptual-model (conexão DDD + LLM, P-H do backlog).
- **Derivado:** Métricas que alimentam dívida generativa (LOC/commits) — conexao com P1 métricas do v1.
