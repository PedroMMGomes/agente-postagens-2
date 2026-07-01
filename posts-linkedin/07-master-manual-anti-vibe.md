# Post LinkedIn #07 — MASTER: O manual anti-vibe de quem leva IA a produção

**Status:** Rascunho
**Tamanho:** Longo (~480 palavras) — versão "carrossel expandido" que une os 6 posts
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** síntese dos posts #01–#06 (Voronin/Joshi, Anthropic, Hamel Husain/Red Hat, Addy Osmani, OWASP ASI06/MINJA, Karpathy/Willison/Fowler/GitClear/METR) + referências de humor (`1ideias/RESUMO-IDEIAS.md`)
**Entregável de imagem:** capa de carrossel — ver `07b`

---

## Post (copie a partir daqui)

Você fez a PoC de IA em um dia. Ficou maravilhoso na demo. Parabéns.

Aí tentou subir pra produção — e descobriu que a parte bonita era só a fachada.

O que ninguém te conta antes de levar IA a sério cabe em 6 ideias. Cada uma eu aprendi do jeito difícil (ou lendo quem já quebrou a cara).

1️⃣ **Seu codebase virou o prompt.** Antes, código ruim doía como lentidão — um dev cansado lia a página borrada e demorava. Hoje a IA lê essa mesma zona e cospe cópias iguais o dia inteiro. Código ruim parou de ser lento e virou **contagioso**. (GitClear: 8x mais duplicação em 1 ano de IA.)

2️⃣ **O melhor prompt do mundo não salva um contexto ruim.** Pare de polir o wording. O jogo migrou pro que a IA **vê** antes de responder — em que ordem, quanto, com que estrutura. Contexto é recurso escasso: a $3/M tokens, uma sessão de 50 turnos arrastando lixo custa R$ 120. A Anthropic cortou 67% das falhas de retrieval **sem trocar de modelo**. Só engenharia de contexto.

3️⃣ **Sua IA não quebra. Ela deriva.** E ninguém percebe até o cliente reclamar. "Pareceu bom" não é teste. O equivalente ao seu `assertEqual` virou o **eval**: um golden dataset rodando no PR, com um LLM-juiz. Juiz fraco passa em tudo — você não tem eval, tem placebo.

4️⃣ **Você é o gargalo, não o compute.** Spawnei 20 agentes em paralelo e achei que era produtividade. Mentira: eu reviso 1 por vez. É como um caixa único com fila enorme — abrir mais guichê não adianta quando o guichê é você. A métrica certa é decisões bem revisadas por hora, não agentes rodando.

5️⃣ **A memória da IA é a brecha que não desliga.** Prompt injection termina quando a sessão fecha. Memory poisoning não — a injeção fica gravada e é reativada semanas depois, numa conversa sem nada a ver. >95% de sucesso contra agentes (MINJA, NeurIPS 2025). Às vezes a melhor defesa é simplesmente **não lembrar**.

6️⃣ **Vibe coding é dívida com nome bonito.** "Aceitar tudo sem ler os diffs" é integrar código que ninguém auditou. A fachada fica linda; a fundação apodrece. Sêniores ficaram **19% mais lentos** com IA, *acreditando* estar 20% mais rápidos (METR). A velocidade era um empréstimo — com juros.

Resumo da ópera: **a IA constrói a fachada. A engenharia constrói a fundação.** E o usuário não liga o quanto você gerou código rápido — ele liga se funciona, se é seguro e se escala.

Não é "usar menos IA". É parar de confundir "funciona na minha máquina" com "isto está engenheirado".

E você: tá construindo fachada ou fundação? 👇

#InteligenciaArtificial #EngenhariaDeSoftware #VibeCoding #ContextEngineering #EvalDriven #AgenticAI #TechDebt #HarnessEngineering

---

## Hooks alternativos (teste A/B)
- "Você fez a PoC de IA em 1 dia. A produção foi outra história."
- "IA constrói a fachada. Engenharia constrói a fundação. 6 coisas que ninguém te conta."
- "Fiquei empolgado com 20 agentes em paralelo. Mentira: eu reviso 1 por vez."
- "Sêniores ficaram 19% mais lentos com IA — se achando 20% mais rápidos. A velocidade era um empréstimo."
- "Sua IA não quebra. Ela deriva. E 'pareceu bom' não é teste."

## Notas
- **Tom:** técnico com humor (auto-depreciação + inside-jokes de dev, emprestado das `1ideias`); primeira pessoa.
- Une os 6 posts num fio condutor: **fachada vs fundação**.
- Provões distribuídas: 8x duplicação (#01) · -67% sem trocar modelo (#02) · eval/placebo (#03) · 1 por vez (#04) · >95% MINJA (#05) · -19%/+20% percepção (#06).
- **Versão publicável:** o carrossel `07b` (humana, slide a slide) é o entregável principal; este denso é o "texto longo" opcional.

---

## Imagem
- **Capa de carrossel (mesma do 07b):** `imagens/07-master-manual-anti-vibe/openai-2.png` (1024×1024, Tier 0 `gpt-image-2`, score 9.0, **acentos ✓** "A FACHADA NÃO É A OBRA").
