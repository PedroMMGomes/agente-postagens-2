# Post LinkedIn #05b — A memória da IA é o vetor de ataque que não desliga (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~195 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Christian Schneider + Rehberger (Embrace The Red) + OWASP ASI06 (Habler) + MINJA (NeurIPS) + Anthropic — ver `pesquisas/05-memoria-poisoning.md`
**Pares com:** imagem `imagens/05-memoria-poisoning/openai-2.png` ("A MEMÓRIA É O VETOR")

---

## Post (copie a partir daqui)

Já achou ótimo aquele recurso de "memória" do agente de IA, que lembra do seu contexto entre conversas?? 😅

Pois é. Esse mesmo recurso é o vetor de ataque mais subestimado de 2026.

Prompt injection você conhece — enfiar instrução pra desviar o modelo. Mas termina quando a sessão fecha. Lendo o Christian Schneider (arquiteto de segurança) e o pessoal da OWASP, confirmei como eu penso: existe uma versão pior, o **memory poisoning** — prompt injection que virou permanente.

Pense num espião que planta um bilhete falso numa gaveta de arquivos. O ataque acontece uma vez. O bilhete fica lá pra sempre — e é lido em toda conversa seguinte, indistinguível de um arquivo legítimo.

Em 3 ideias simples:

1️⃣ **Tempo separado:** a injeção é em fevereiro, o dano em abril. O monitoramento tradicional não vê nada em momento nenhum.

2️⃣ **O número:** a metodologia MINJA (NeurIPS 2025) chegou a **mais de 95% de sucesso** contra agentes médicos, e-commerce e QA — todos vulneráveis.

3️⃣ **Defesa clássica falha:** a proteção nº1 contra injection é "cada conversa começa limpa". O ataque explora exatamente o oposto — o que persiste entre sessões.

Resumo da ópera: a feature que torna o agente útil é o attack surface. Memória merece o mesmo escrutínio de credenciais. E às vezes a melhor defesa é simplesmente **não lembrar**.

E você: a memória do seu agente é tratada como feature ou como brecha? 👇

#InteligenciaArtificial #SegurançaDeIA #Agentes #PromptInjection #OWASP

---

## Hooks alternativos (teste A/B)
- "A falha de segurança mais subestimada de IA com memória não é bug de prompt. É um ataque que sobrevive entre sessões."
- ">95% de sucesso contra agentes de IA (NeurIPS 2025). A memória útil é o attack surface."
- "Às vezes a melhor defesa de IA com memória é simplesmente não lembrar."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora do espião e o bilhete na gaveta** (ataque único, persistência permanente) torna o "prompt injection stateful" concreto.
- Cortou os números densos (Claude Code MemoryTrap, Rehberger payload exato, defense-in-depth de 4 camadas) — foco no "e daí?": ataca uma vez, dói meses depois + MINJA 95% + defesa falha.
- CTA-pergunta com emoji no fim (👇).
- 5 hashtags focadas.
- **Conexão:** #02 (contexto é recurso escasso) → **este #05** (memória = o contexto que persiste e vira brecha). Eixo de segurança.

---

## Imagem
- **Final (ESCOLHIDA):** `imagens/05-memoria-poisoning/openai-2.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, **texto_com_acento=true** "A MEMÓRIA É O VETOR") — passou no gate com folga.
- **Variantes validadas (sessão 25/jun/2026):**

  | ID | Arquivo | Score | Clutter | Acentos | Status |
  |----|---------|-------|---------|---------|--------|
  | 1 | `openai-1.png` | 8 | 2 | ✅ true | ✅ passa |
  | **2** | `openai-2.png` | **9** | **2** | ✅ **true** | ✅ **escolhida (sem problemas)** |
  | 3 | `openai-3.png` | 8 | 3 | ✅ true | ⚠️ value_demonstrated=false |

- **Conceito:** cilindro de memória com blocos teal legítimos + UM bloco âmbar "envenenado" (quase idêntico); documento injeção à esquerda → robô fofo alcançando o bloco âmbar numa sessão futura à direita; mãos humanas com escudo/auditoria. Outcome: veneno persiste e ressurge depois.
- **Texto na imagem:** "A MEMÓRIA É O VETOR" (maiúsculo, **com acentos** — novo padrão).

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um cilindro de memória com blocos brilhantes legítimos e um bloco âmbar "envenenado"; à esquerda um documento de injeção; à direita um robô simpático alcança o bloco âmbar numa sessão futura; mãos humanas acolhedoras seguram um escudo de auditoria sobre o cilindro. Texto "A MEMÓRIA É O VETOR".

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024×1024, ótima pro feed mobile).
- Dia/horário sugerido: terça 8h–10h ou quarta (tema de segurança prende).
- Resposta pronta a comentário ("mas isso é só teoria?"): "Não. A OWASP listou como ASI06 no Top 10 para aplicações agentic (dez/2025), e o caso do Claude Code (MemoryTrap, 2026) provou payload de repo alcançando memória + hooks + system prompt. Remediado só na v2.1.50." 👇
