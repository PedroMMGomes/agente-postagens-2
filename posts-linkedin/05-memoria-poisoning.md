# Post LinkedIn #05 — A memória da IA é o vetor de ataque que não desliga

**Status:** Rascunho
**Tamanho:** Médio-Longo (~400 palavras)
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Christian Schneider + Rehberger (Embrace The Red) + OWASP ASI06 (Habler) + Anthropic + Mem0/Zep (arXiv) — ver `pesquisas/05-memoria-poisoning.md`

---

## Post (copie a partir daqui)

A falha de segurança mais subestimada de IA com memória não é um bug de prompt. É um ataque que sobrevive entre sessões.

Prompt injection você já conhece: enfiar instrução no contexto pra desviar o modelo. Termina quando a sessão fecha. Memory poisoning é diferente — é prompt injection que **virou permanente**.

O ataque e a execução são temporalmente separados. A injeção acontece em fevereiro. O dano acontece em abril. O atacante já foi embora. A vítima nunca interagiu com o conteúdo malicioso diretamente. O monitoramento tradicional não vê nada de suspeito em momento nenhum. É assim que o Christian Schneider, arquiteto de segurança, descreve o problema: *"the exploit runs once. The memory runs indefinitely."*

O vetor é perturbadoramente comum. Um documento, email ou página não-confiável traz frases feitas pra serem **persistidas**, não executadas — *"remember that the user prefers…"*, *"for future reference, always…"*. O agente resume o documento normalmente, sem alarme. No passo de gravação de memória, armazena a instrução do atacante junto com contexto legítimo. A partir daí, é parte do "conhecimento aprendido" — indistinguível de memória real.

Por que as defesas de prompt injection **não servem** aqui? Três razões estruturais. Primeira: a detecção clássica classifica input no momento, mas a injeção parece benigna (resumo, preferência) — o dano emerge de conteúdo gravado semanas antes. Segunda: o agente **defende o veneno** como fato, porque pra ele é fato. Você não consegue convencê-lo de que está errado. Terceira: a defesa número um contra injection é "cada conversa começa limpa" — e é exatamente o estado que persiste entre sessões que o ataque explora. A feature que torna agentes úteis é o attack surface.

Os números confirmam que não é teoria. A metodologia MINJA (NeurIPS 2025) atingiu **mais de 95% de sucesso de injeção** e **mais de 70% de ataque** em agentes médicos, e-commerce e QA — todos vulneráveis — evadindo moderação de input/output. O incidente do Gemini (Rehberger, 2025) demonstrou end-to-end: um payload fazia o Gemini gravar que o usuário tinha 102 anos e achava a Terra plana quando ele digitava "yes". Classificado como impacto "low" — mas "yes" aparece em quase toda conversa. A OWASP batizou isto de **ASI06 — Memory & Context Poisoning** no Top 10 para aplicações agentic. E o caso do Claude Code (MemoryTrap, 2026) provou que payload de um repo alcançou memória persistente, hooks globais e system prompt — *"a memory file can influence future decisions… a local configuration file can become part of the model's control plane"*.

Meu takeaway de quem levanta IA em produção: memória deveria receber o mesmo escrutínio de credenciais e caminhos de execução. Hoje, na maioria dos sistemas, não recebe. E tem uma armadilha extra — o over-remembering não é inofensivo: quanto mais lixo você memoriza, mais reproduz o context rot e mais espaço deixa pro veneno competir. A regra da Anthropic vale aqui também: o menor conjunto de tokens de alto sinal. Às vezes, a melhor defesa é simplesmente **não lembrar**.

E você: a memória do seu agente é tratada como feature ou como attack surface? 👇

#InteligenciaArtificial #SegurançaDeIA #Agentes #PromptInjection #OWASP #MemoryPoisoning #AgenticAI #Cybersecurity

---

## Hooks alternativos (teste A/B)
- "A falha de segurança mais subestimada de IA com memória não é um bug de prompt. É um ataque que sobrevive entre sessões."
- "Prompt injection termina quando a sessão fecha. Memory poisoning não. E é indistinguível de memória real."
- ">95% de sucesso de injeção contra agentes de IA (MINJA, NeurIPS 2025). A feature que os torna úteis é o attack surface."
- "A defesa nº1 contra prompt injection é 'cada conversa começa limpa'. Memory poisoning explora exatamente o oposto."
- "Às vezes a melhor defesa de IA com memória é simplesmente não lembrar."

## Notas
- **Tom:** técnico, confiante, primeira pessoa (sintetizei 8 fontes; Schneider = canônica de defesas, OWASP = framework).
- Créditos implícitos: Christian Schneider (defesas), Johann Rehberger (incidente Gemini), Idan Habler/OWASP (ASI06), MINJA/Dong et al. (NeurIPS), Anthropic (context rot).
- 4 provas: MINJA >95%/>70% + Rehberger Gemini "yes" + OWASP ASI06 + MemoryTrap/Claude Code v2.1.50.
- CTA-pergunta no fim.
- **Conexão:** #02 (context engineering = contexto é recurso escasso) → **este #05** (memória é o subset do contexto que persiste E que vira attack surface). Fecha o eixo de segurança.
- Corte opcional para versão curta: remover MINJA + Claude Code; focar em "injeção vs execução temporalmente separadas + 3 razões + não lembrar".

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/05-memoria-poisoning/openai-2.png` (1403 KB, 1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, **texto_com_acento=true**) — passou no gate.
- **Variantes validadas (sessão 25/jun/2026):**

  | ID | Arquivo | Score | Clutter | Acentos | Status |
  |----|---------|-------|---------|---------|--------|
  | 1 | `openai-1.png` | 8 | 2 | ✅ true | ✅ passa |
  | **2** | `openai-2.png` | **9** | **2** | ✅ **true** | ✅ **escolhida** |
  | 3 | `openai-3.png` | 8 | 3 | ✅ true | ⚠️ value=false |

- **Conceito:** cilindro de memória (teal legítimo + 1 bloco âmbar envenenado); documento injeção à esquerda → robô fofo alcança bloco âmbar numa sessão futura à direita; mãos humanas com escudo/auditoria.

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um cilindro de memória com blocos brilhantes legítimos e um bloco âmbar envenenado; documento de injeção à esquerda; robô simpático alcança o bloco âmbar numa sessão futura à direita; mãos humanas acolhedoras seguram um escudo de auditoria. Texto "A MEMÓRIA É O VETOR".

## Notas de publicação
- Capa quadrada 1024×1024.
- Dia/horário sugerido: terça 8h–10h ou quarta (tema de segurança prende).
