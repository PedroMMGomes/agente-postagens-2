# Post LinkedIn #07b — MASTER: O manual anti-vibe (CARROSSEL, pronto para publicar)

**Status:** Pronto para publicar
**Tipo:** Carrossel (PDF de 9 slides) + legenda curta com humor
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** síntese #01–#06 + pegada de humor (`1ideias/RESUMO-IDEIAS.md`)
**Pares com:** capa de carrossel `imagens/07-master-manual-anti-vibe/openai-2.png` ("A FACHADA NÃO É A OBRA")

---

## Como montar (resumo do carrossel)

Exporte as 9 "slides" abaixo como PDF (cada `### Slide N` = uma página 1080×1350 ou 1024²). A capa é a imagem gerada; as demais são texto sobre fundo navy/teal, no nosso estilo. Publicar com a legenda curta ao final.

---

### Legenda curta (cole no LinkedIn)

Você fez a PoC de IA em 1 dia 🚀. A produção foi outra história 💀.

Lendo muito material de quem já quebrou a cara com IA em produção (Anthropic, Martin Fowler, Hamel Husain, Addy Osmani), cheguei em 6 ideias que confirmam como eu penso — e que salvam a vida antes de subir IA pra valer.

Resumão do carrossel 👉 desliza:

1️⃣ Seu codebase virou o prompt (dívida agora é contagiosa)
2️⃣ Contexto > prompt (a Anthropic cortou 67% das falhas sem trocar modelo)
3️⃣ Sua IA não quebra, ela deriva (eval no PR, senão é placebo)
4️⃣ Você é o gargalo, não o compute (20 agentes, você revisa 1 por vez)
5️⃣ A memória é a brecha que não desliga (>95% de sucesso, NeurIPS)
6️⃣ Vibe coding = dívida com nome bonito (sênior -19% se achando +20%)

Tese: a IA constrói a fachada. A engenharia constrói a fundação. 🏗️

E você: tá construindo fachada ou fundação? 👇

#InteligenciaArtificial #EngenhariaDeSoftware #VibeCoding #ContextEngineering #EvalDriven

---

## SLIDES DO CARROSSEL

### Slide 0 — CAPA (imagem gerada)
- **Imagem:** `imagens/07-master-manual-anti-vibe/openai-2.png` (headline "A FACHADA NÃO É A OBRA")
- **Texto sobreposto à imagem (ou acima):**
  > **Fiz minha PoC de IA em 1 dia 🚀**
  > **Produção foi outra história 💀**
  > **6 coisas que ninguém te conta antes de subir IA pra valer.**

---

### Slide 1 — #01: Seu codebase virou o prompt
**Headline:** CÓDIGO RUIM DEIXOU DE SER LENTO. VIROU CONTAGIOSO.

Antes: um dev cansado lia a página borrada e demorava pra fazer a próxima.
Hoje: a IA lê a mesma página e cospe cópias iguais o dia inteiro.

GitClear (211M linhas): **8x mais duplicação** em 1 ano de IA.
→ Trate seu codebase como prompt. Cada nome limpo muda o que a IA gera.

---

### Slide 2 — #02: Contexto > Prompt
**Headline:** O MELHOR PROMPT DO MUNDO NÃO SALVA UM CONTEXTO RUIM.

Pense numa cozinha. O prompt é o pedido do cliente. O contexto é a despensa:
jogar tudo lá dentro (velho, duplicado, sem ordem) = prato ruim, caro e demorado.

A Anthropic cortou **67% das falhas de retrieval sem trocar de modelo.**
Só engenharia de contexto.

---

### Slide 3 — #03: Eval (senão é placebo)
**Headline:** SUA IA NÃO QUEBRA. ELA DERIVA.

"Testei na mão, pareceu bom" não é teste. É vibe-check. 😅

O `assertEqual` da IA virou o **eval**: um golden dataset rodando no PR,
pontuado por um LLM-juiz.
Juiz fraco passa em tudo → você não tem eval. **Tem placebo.**

---

### Slide 4 — #04: Você é o gargalo
**Headline:** 20 AGENTES EM PARALELO. EU REVISO 1 POR VEZ.

Spawnei uma frota de agentes, achei que era produtividade. Mentira.
É como um caixa único com fila enorme — abrir mais guichê não adianta
quando o guichê é você. (Você é o GIL dos seus agentes.)

A métrica certa: **decisões bem revisadas por hora**, não agentes rodando.

---

### Slide 5 — #05: A memória é a brecha
**Headline:** A MEMÓRIA DA IA É A BRECHA QUE NÃO DESLIGA.

Prompt injection termina quando a sessão fecha. Memory poisoning não.
Um espião planta um bilhete falso na gaveta — fica lá pra sempre,
lido em toda conversa seguinte.

MINJA (NeurIPS 2025): **>95% de sucesso** contra agentes.
Às vezes a melhor defesa é simplesmente **não lembrar**.

---

### Slide 6 — #06: Vibe = dívida com nome bonito
**Headline:** VIBE CODING É DÍVIDA COM NOME BONITO.

"Aceitar tudo sem ler os diffs" = integrar código que ninguém auditou.
A fachada fica linda 🏛️. A fundação apodrece 🕳️.

METR (estudo controlado): sêniores ficaram **19% mais lentos** com IA,
*acreditando* estar **20% mais rápidos**.
A velocidade não era produtividade. Era **empréstimo com juros**.

---

### Slide 7 — RECAP: fachada vs fundação
**Headline:** IA CONSTROI A FACHADA. ENGENHARIA CONSTROI A FUNDAÇÃO.

O usuário não liga o quanto você gerou código rápido.
Ele liga se:
✅ funciona
✅ é seguro
✅ escala

Checklist anti-vibe:
☐ codebase tratado como prompt
☐ contexto projetado, não só prompt
☐ eval no PR (com juiz de verdade)
☐ atenção humana como gargalo medido
☐ memória tratada como attack surface
☐ dívida com amortização, não só nome bonito

---

### Slide 8 — CTA
**Headline:** FACHADA OU FUNDAÇÃO?

Funciona na minha máquina ≠ isto está engenheirado.

Comenta aí 👇: qual dessas 6 você já sentiu na pele?

(salva esse post — daqui a 3 meses você vai precisar dele) 💾

---

## Notas
- **Tom:** técnico + humor (auto-depreciação e inside-jokes de dev — "copy paste", "works on my machine", "caixa único"). Emprestado das `1ideias`.
- **Fio condutor:** fachada (PoC bonita) vs fundação (engenharia). Cada slide = um pilar que sustenta a fundação.
- **Layout das slides internas:** headline maiúscula topo + corpo curto + 1 dado/prova. Fundo navy, acento âmbar nos "erros" e teal nos "acertos" (roubado das ideias 1/2, casa com nossa paleta).
- Capa usa nossa estética isométrica (mais bonita que as referências) + o headline com **acentos**.
- 5 hashtags focadas na legenda.

## Imagem
- **Final (ESCOLHIDA):** `imagens/07-master-manual-anti-vibe/openai-2.png` (1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Score GLM-4.6V:** 9.0/10 (value_demonstrated=true, clutter=2, **texto_com_acento=true** "A FACHADA NÃO É A OBRA") — passou no gate.
- **Variantes validadas (sessão 26/jun/2026):** openai-1 (9/10, clutter 3) ✅ passa; **openai-2 (9/10, clutter 2)** ✅ escolhida.
- **Conceito:** fachada bonita (IA) sobre fundação rachada âmbar (vibe/debt) vs fundação sólida teal com ícones (escudo/segurança, checklist/evals, sensor/monitoramento); mãos humanas reforçando um pilar; robô fofo entregando ferramenta; seta de transformação.
- **Texto na imagem:** "A FACHADA NÃO É A OBRA" (maiúsculo, **com acentos**).

## Alt-text (acessibilidade)
Capa de carrossel em estilo isométrico 3D: à esquerda uma fachada bonita (IA gerando) sobre fundação rachada/âmbar; à direita uma fundação sólida teal com sensores, evals e harness. Headline "A FACHADA NÃO É A OBRA".
