# NOTES — trabalho autônomo (sessão 25/jun/2026)

> Scratchpad que sobrevive a reset de contexto. Concluído.

## ✅ ENTREGUES

### Posts profundos (#05, #06) — pesquisa exaustiva + acentos corrigidos
- #05 Memória/poisoning: `posts-linkedin/05-*.md` + `05b-*.md` + imagem `openai-2.png` (score 9, **acentos ✓**). Pesquisa `pesquisas/05-memoria-poisoning.md` (8 fontes: Schneider, OWASP ASI06, Rehberger/Gemini, MINJA NeurIPS, Anthropic, Mem0/Zep arXiv).
- #06 Vibe/fast-integration debt: `posts-linkedin/06-*.md` + `06b-*.md` + imagem `openai-1.png` (score 9, **acentos ✓**). Pesquisa `pesquisas/06-*.md` (Karpathy, Willison, Fowler, GitClear 211M, METR -19%, CodeRabbit 2.74x).

### Correção de acentos (anotada)
- `APRENDIZADOS-SESSAO.md` criado. Regras atualizadas em 4 arquivos: PERFIL-EDITORIAL.md, PIPELINE.md, gerar-e-validar-imagens.skill.md (+ gate texto_com_acento=true).
- NOVO padrão: texto da imagem PT-BR maiúsculo **COM ACENTOS**. #05/#06 já seguem. #01-04 sem acento (pendência de regenerar se o autor quiser consistência total).

### POCs (workspace `C:\1Repos\poc-ia-monetizacao`) — TODOS RODANDO
1. **eval-runner/** ✅ testado: baseline 8.2 → prompt pior detecta 4 regressões, GATE BLOQUEADO (exit 1). Golden dataset + LLM-judge + score-delta.
2. **mcp-server-br/** ✅ testado: buscar_cep (Praça da Sé, SP) + consultar_cnpj (Banco do Brasil, ATIVA). JSON-RPC/MCP stdio, sem deps.
3. **whatsapp-quote-agent/** ✅ testado: vazamento de pia → Hidráulica, urgência alta, R$180–900, agendamento proposto, mensagem WhatsApp pronta (3,3s).
- `RELATORIO-OPORTUNIDADES.md` (11 oportunidades) + `README.md` mestre.

## Métricas das imagens (gate juiz glm-4.6v)
| Post | Arquivo | Score | Clutter | Acentos | Custo~ |
|---|---|---|---|---|---|
| #02 | openai-2 | 9 | 3 | sem* | $0.04 |
| #03 | openai-1 | 9 | 2 | sem* | $0.04 |
| #04 | openai-1 | 9 | 2 | sem* | $0.04 |
| #05 | openai-2 | 9 | 2 | ✅ true | $0.04 |
| #06 | openai-1 | 9 | 2 | ✅ true | $0.04 |
*#02-04 gerados antes da correção de acentos (pendência: regenerar).

## Pendências (amanhã, se o autor quiser)
- [ ] Regenerar capas de #02/#03/#04 com acentos (consistência).
- [ ] Conectar mcp-server-br no Claude Desktop/Cursor p/ validar UX.
- [ ] Trocar golden.json do eval-runner por um caso real do autor.
- [ ] Cascar whatsapp-quote-agent com WhatsApp Business API.

## Ambiente
- OPENAI_API_KEY SET. ZAI via MCPs (juiz glm-4.6v). Node v22. PowerShell 5.1.
