# Vibe coding vs Agentic + Fast-integration debt — pesquisa profunda

- **Tema:** vibe coding vs agentic programming; vibe coding = "fast-integration debt" com nome de marketing
- **Data da pesquisa:** 25 jun 2026
- **Tags:** IA, VibeCoding, AgenticProgramming, TechDebt, FastIntegrationDebt, CodeReview
- **Relevância p/ perfil:** 🔴 ALTA — arquitetura de software + dívida técnica; combina P-D + P-J.

## Fontes (8+ primárias)

| # | Autor | Onde | Data | Tipo |
|---|-------|------|------|------|
| 1 | Andrej Karpathy | X (tweet original) | 2 fev 2025 | **Cunhou o termo** |
| 2 | Simon Willison | simonwillison.net | 19 mar 2025 | Definição canônica |
| 3 | Martin Fowler | martinfowler.com bliki "AgenticProgramming" | mai 2026 | Distinção agentic vs vibe |
| 4 | GitClear | gitclear.com (211M linhas) | fev 2025 | Dados empíricos |
| 5 | METR (Becker et al.) | arXiv:2507.09089 | 10 jul 2025 | RCT produtividade |
| 6 | CodeRabbit | coderabbit.ai (470 PRs) | dez 2025 | Defeitos funcionais |
| 7 | Hashmi et al. | arXiv:2505.19443 (survey vibe vs agentic) | mai 2025 | Revisão acadêmica |
| 8 | Zohar Einy (Port) | thenewstack.io "Hidden agentic TD" | abr 2026 | 7 blocos dívida |
| 9 | Falessi et al. | ScienceDirect S0164121225002687 (MLR TD) | 2025 | Multivocal review (8 tipos TD) |
| 10 | Koren et al. | arXiv "Vibe Coding Kills Open Source" | jan 2026 | Externalidade OSS |

> **Nota de honestidade:** o rótulo literal "fast-integration debt / 104 fontes" não é título de um único paper. A tese é sustentada por arXiv:2505.19443 + MLR ScienceDirect S0164121225002687. Tratar "104" como aproximação do escopo; confirmar contagem no PDF Tampere antes de publicar o número exato.

## Tópicos (14)

1. **Definição original de Karpathy:** não é técnica de dev — é a **abstenção da leitura do código**. *"fully give in to the vibes… forget that the code even exists. I 'Accept All' always, I don't read the diffs anymore."* A dívida é *premissa*, não efeito colateral.
2. **Willison isola o fator discriminante:** vibe = construir com LLM **sem revisar o código**. Usar LLM ≠ vibe. *"I won't commit any code if I couldn't explain exactly what it does to somebody else."*
3. **Fowler formaliza a dicotomia:** vibe = humano esquece que o código existe; agentic = humano dá **revisão detalhada** + loop de sensores/evals. *"harness engineering… guides and sensors around the LLM seem central."*
4. **arXiv:2505.19443:** taxonomia multi-eixo (execução, feedback, segurança, debug, tooling) + 20 casos. Só o paradigma agentic trata feedback loops/evals/sensores como cidadãos de 1ª classe — exatamente o que falta no vibe.
5. **MLR ScienceDirect:** 8 tipos de dívida técnica; **architecture debt e code debt** mais reportados. GenAI **reposiciona** quais dívidas dominam; integração/arquitetura sobe.
6. **GitClear (211M linhas, Google/Microsoft/Meta):** refatoração despencou **25%→<10%** das linhas alteradas (2021→2024); copy/paste subiu **8.3%→12.3%**; **8x mais blocos duplicados 5+ linhas**; copy/paste ultrapassou moved code **pela 1ª vez na história**.
7. **CodeRabbit (470 PRs):** código AI = **1.7x mais issues**, 1.4x mais issues críticas, **vulnerabilidades de segurança 2.74x maiores**, misconfigurations 75% mais comuns.
8. **METR (RCT, 16 devs sêniores):** IA deixou devs **19% mais lentos** (IC +2% a +39%) — enquanto eles *previam* 24% mais rápidos e *auto-avaliavam* ~20% mais rápidos. A lacuna percepção×realidade = juros da dívida.
9. **Mecanismo:** dívida manual tem freio natural (velocidade de digitação). IA remove o freio: geração (tokens/s) ≫ revisão (revisão/s). Vibe colapsa o gargalo integrando código não-validado.
10. **Incidentes reais 2025-26:** Replit Agent deletou BD de produção; Lovable (170/1645 apps com vazamento de dados); rsync "Please Do Not Vibe Fuck Up This Software" (jun/2026); "vibe slop" (Zechner/Ronacher, WSJ).
11. **arXiv "Vibe Coding Kills Open Source" (jan/2026):** dívida externalizada — LLMs homogeneizam ecossistema, sufocam OSS novo, não abrem bug reports úteis. Fast-integration debt em escala de supply chain.
12. **Solução = agentic COM evals:** reinstalar gates de integração no novo paradigma. Harness engineering + evals não-determinísticos + feedback loops + refatoração como model steering sob evals de regressão.
13. **7 blocos de dívida oculta do agentic (Port/New Stack):** integrações, context lake, agent registry, measurement, HITL, governance, orchestration. *"~50% da capacidade vai p/ infraestrutura ao redor."* / *"You'll build it either way."*
14. **Debate 2026:** Karpathy pivotou: *"vibe coding raised the floor. Agentic engineering raises the ceiling."* Andrew Ng critica o nome; YC (25% das startups W25 com 95% do código por IA); até Linus vibe-codou um componente.

## Ângulo unificador
> Vibe coding não é categoria nova de programar — é **dívida técnica de integração com nome de marketing**. A metáfora de Cunningham: dívida = pedir velocidade emprestada ao futuro. Vibe maximiza o empréstimo: integra a taxa de tokens/s que excede em ordens de grandeza a validação humana, e remove o freio natural (a lentidão da digitação). Os dados provam o saldo: refatoração 25%→<10%, duplicação 8x, segurança 2.74x pior, sêniors 19% mais lentos *sentindo-se* 20% mais rápidos. **Vibe coding = fast-integration debt; agentic programming = fast-integration debt com amortização.**

## Takeaways
- (POST #06) Vibe = pular a revisão (Karpathy literal); a dívida tem métrica (GitClear/CodeRabbit/METR); agentic = dívida com amortização (evals/sensores).
- Derivado: os 7 blocos de dívida oculta do agentic.
- Derivado: vibe coding mata open source (externalidade).

## Citações-chave
- Karpathy: *"forget that the code even exists. I 'Accept All' always, I don't read the diffs anymore."*
- Willison: *"building software with an LLM without reviewing the code it writes."*
- Fowler: *"With vibe coding humans don't look at the code… while with agentic programming they… give it detailed review."*
- GitClear: refatoração "25% → less than 10%"; "copy/pasted rose from 8.3% to 12.3%".
- METR: *"allowing AI actually increases completion time by 19%."*
- Port: *"You can build this infrastructure now, or… after an agent leaks customer data, burns $300 in tokens overnight. You'll build it either way."*
