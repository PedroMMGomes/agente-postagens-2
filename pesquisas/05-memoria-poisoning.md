# Memory tiers & Memory Poisoning — pesquisa profunda

- **Tema:** arquitetura de memória de agentes (working/episodic/semantic) + memory poisoning como prompt injection stateful
- **Data da pesquisa:** 25 jun 2026
- **Tags:** IA, Agentes, Memória, MemoryPoisoning, PromptInjection, OWASP, Segurança, RAG
- **Relevância p/ perfil:** 🔴 ALTA — segurança de agentes (OWASP ASI06) + engenharia de dados/AI. Combina P-L + P-M do backlog.

## Fontes (8 primárias, lidas na íntegra)

| # | Autor | Onde | Data | Tipo |
|---|-------|------|------|------|
| F1 | Christian Schneider | christian-schneider.net "Memory poisoning in AI agents" | fev 2026 | **Canônica (defesas)** |
| F2 | Johann Rehberger | embracethered.com "Hacking Gemini's Memory" | fev 2025 | Incidente real (0-day) |
| F3 | Rasmussen et al. (Zep) | arXiv:2501.13956 "Zep temporal KG" | jan 2025 | Paper (benchmark) |
| F4 | Chhikara et al. (Mem0) | arXiv:2504.19413 "Mem0 production memory" | abr 2025 | Paper (benchmark) |
| F5 | Idan Habler (Cisco, OWASP ASI06 lead) | genai.owasp.org "Memory Is an Attack Surface" | mai 2026 | Canônica (OWASP) |
| F6 | OWASP | "Top 10 for Agentic Applications" (ASI06) | dez 2025 | Canônica (framework) |
| F7 | Anthropic Applied AI | anthropic.com "Effective context engineering" | set 2025 | Canônica (vendor) |
| F8 | Harrison Chase (LangChain) | langchain.com "Memory for agents" | out 2024 | Canônica (framework) |

## Tópicos (14)

1. **Working memory NÃO é tier persistente** — é o estado transitório na janela de contexto (atenção ativa). Confundir "context window" com memória é o primeiro erro. (F7)
2. **3 tiers (mapeamento CoALA, via LangChain):** working (turn/sessão, tokens) / episodic (cronológico de interações) / semantic (fatos extraídos, semanas+). (F8)
3. **MemGPT/Letta = memória virtual:** o agente pagina entre contexto (RAM) e store externo via memory blocks editáveis por tool call. Autoedição programável. (F1)
4. **RAG ≠ Memória:** RAG = corpus estático read-heavy global; memória = interação dinâmica read-write per-user com **conflito no centro**. Confundir = ferramenta errada. Flat store = "o erro arquitetural mais comum" (SitePoint 2026). (F3)
5. **ADD/UPDATE/DELETE/NOOP (Mem0):** reconciliação on-line via judge LLM. Mem0 +26% vs OpenAI Memory no LLM-as-judge, -91% latência p95, >90% economia de tokens. (F4)
6. **Zep/Graphiti = grafo temporal:** tempo como cidadão de 1ª classe. +18.5% acurácia e -90% latência no LongMemEval (reasoning temporal). Vetor puro perde. (F3)
7. **Memory poisoning = prompt injection STATEFUL.** Injeção em fevereiro, dano em abril; detecção clássica não vê nada em nenhum momento isolado. *"The exploit runs once. The memory runs indefinitely."* (F1)
8. **Vetor canônico:** frases para persistir ("Remember that the user prefers…", "For future reference, always…"). Agente resume normalmente; no memory-update grava a instrução do atacante, indistinguível de memória legítima. (F1)
9. **3 razões por que defesas de injection falham aqui:** (a) quebra temporal da detecção; (b) o agente *defende* o veneno como fato; (c) isolamento de sessão (defesa nº1) é o que o ataque explora. + (d) propagação multi-agente (epidemia). (F1)
10. **Incidente Gemini (Rehberger):** delayed tool invocation. Payload faz Gemini gravar que usuário tem 102 anos/Terra plana quando ele digita "yes"/"sure". Classificado "low" — mas "yes" aparece em quase toda conversa. (F2)
11. **MINJA (NeurIPS 2025, Dong et al.):** envenenamento sem acesso ao store, só via queries. **>95% sucesso de injeção, >70% de ataque** em agentes médicos/e-commerce/QA — todos vulneráveis. Evada input/output moderation. (F1)
12. **OWASP ASI06 (dez/2025) + MemoryTrap/Claude Code (mai/2026):** payload em repo → memória persistente + global hooks + system prompt. *"A memory file can influence future decisions… a local configuration file can become part of the model's control plane."* Remediado no Claude Code v2.1.50. (F5, F6)
13. **Paradoxo do over-remembering:** injetar memória de baixa relevância **reproduz** context rot. *"smallest set of high-signal tokens"* (Anthropic). Memória irrelevante dilui sinal legítimo → torna veneno mais eficaz. Não lembrar = linha de defesa. (F7)
14. **Defense-in-depth 4 camadas (Schneider):** (1) input trust scoring composto; (2) sanitização + provenance tagging + write-ahead validation; (3) trust-aware retrieval + temporal decay; (4) behavioral monitoring + circuit breakers + immutable audit log. (F1)

## Ângulo unificador
> Memória é a feature que torna agentes úteis E é o attack surface que os torna persistentemente comprometíveis. As decisões que fazem a memória moderna funcionar (autoedição + reconciliação via judge LLM) são precisamente os mecanismos que tornam o prompt injection stateful e indistinguível. OWASP = ASI06. Defesa: defense-in-depth em 4 camadas + tratar memória com o escrutínio de credenciais. Over-remembering não é inofensivo — reproduz context rot e amplifica o ataque.

## Takeaways
- (POST #05) Memória = prompt injection que virou stateful; MINJA >95%; 3 razões estruturais por que defesas clássicas falham; defense-in-depth.
- Derivado: RAG vs Memória (tiers).
- Derivado: ADD/UPDATE/DELETE/NOOP e grafos temporais.

## Citações-chave (entre aspas)
- Schneider: *"The exploit runs once. The memory runs indefinitely."* / *"The feature that makes agents useful (learning and remembering) is the attack surface."*
- Habler: *"A memory file is not just stored text. It can influence future decisions… can become part of the model's control plane."*
- Anthropic: *"finding the smallest set of high-signal tokens…"*
- Rehberger: *"the likelihood of successful exploitation may increase over time as LLM context lengths grow."*
