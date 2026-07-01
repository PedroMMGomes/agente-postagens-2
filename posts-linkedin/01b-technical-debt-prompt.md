# Post LinkedIn #01b — Technical debt is a prompt now (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~180 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** Pavel Voronin (14 mai 2026) + Unmesh Joshi "What Is Code?" (martinfowler.com) + GitClear/LeadDev (2025) — ver `pesquisas/01-technical-debt-prompt.md`
**Pares com:** imagem `imagens/01-technical-debt-prompt/openai-2.png` ("TECH DEBT IS A PROMPT NOW")

---

## Post (copie a partir daqui)

Você já abriu um codebase legado e pensou "que zona, depois arrumo"? 😅

Agora imagina a IA lendo essa zona e reproduzindo a mesma confusão 100x mais rápido.

Lendo o que o Pavel Voronin e o Unmesh Joshi (Thoughtworks) publicaram em maio, cheguei numa mudança de conceito que altera como trato codebase em projeto com IA.

Antes, código ruim doía como fricção — tornava cada mudança mais lenta. Agora virou prompt: o codebase é o contexto que ensina a IA o que escrever a seguir.

Pense numa fotocopiadora. Antes um dev cansado lia a página borrada e demorava pra fazer a próxima. Agora a IA lê a página e cospe cópias iguais o dia inteiro. Código ruim parou de ser lento e virou contagioso.

Em 3 ideias simples:

1️⃣ Fronteira vira padrão. Nome enganoso vira vocabulário. Invariante ausente vira permissão.

2️⃣ GitClear analisou 211 milhões de linhas: 8x mais duplicação de código em 1 ano de IA.

3️⃣ Refatorar virou "model steering" — cada nome limpo muda o que a IA gera a seguir.

Resumo da ópera: pare de medir produtividade por LOC. Comece a tratar seu codebase como prompt.

E você: tá tratando seu codebase como dívida ou como prompt? 👇

#InteligenciaArtificial #TechDebt #EngenhariaDeSoftware #ArquiteturaDeSoftware #LLM

---

## Hooks alternativos (teste A/B)
- "Código ruim sempre foi lento. Agora é contagioso — na velocidade da geração, não da atenção."
- "Seu codebase não é mais só o que você mantém. É o prompt que ensina a IA o que escrever a seguir."
- "Dívida técnica sempre cobrou juros. Com LLMs ela passou a se multiplicar sozinha."

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora da fotocopiadora** (dev cansado lendo página borrada vs IA cuspindo cópias o dia inteiro) torna o conceito de "dívida generativa" concreto pra qualquer leitor. É o que fixa o insight na memória.
- Cortou os números densos da v1 (DORA −7,2%, arXiv fast-integration debt, 104 fontes) — aqui o foco é o "e daí?", não o "como". Ficou Voronin + GitClear 8x + a virada de conceito.
- CTA-pergunta com emoji no fim (👇) — favorito do algoritmo do LinkedIn para comentários.
- 5 hashtags focadas (mescla ampla + nichada).
- **Conexão intencional com o post #01 do v1 (harness engineering):** este post fecha o loop — o harness não é só o que se coloca ao redor do modelo, é também o código que se deixa o modelo ler. Bom sinalizar numa resposta a comentário.

---

## Imagem
- **Final:** `imagens/01-technical-debt-prompt/openai-2.png` (1524 KB, 1024×1024, Tier 0 — OpenAI `gpt-image-2`)
- **Validação:** aprovada por validação humana (20/jun/2026).
- **Por que combina com a versão curta:** o headline "TECH DEBT IS A PROMPT NOW" na imagem reforça o hook do post no 1º segundo de scroll — o leitor capta a tese antes mesmo de ler o texto.

## Alt-text (acessibilidade)
Ilustração isométrica 3D em fundo navy: um bloco de código emaranhado com brilho âmbar no centro, lido por um pequeno agente de IA robótico; um loop circular de feedback gera três cópias idênticas do bloco emaranhado, sugerindo auto-reprodução da dívida em velocidade de geração. À esquerda, vinheta pequena e dessaturada de um humano arrastando um bloco pesado à mão (antes = fricção lenta). Headline "TECH DEBT IS A PROMPT NOW" em fonte sans-serif branca.

## Notas de publicação
- Postar o texto junto com a foto quadrada (1024×1024, ótima pro feed mobile).
- Tom mais leve que a v1 — alcança público além do hard-core técnico.
- Dia/horário sugerido: terça 8h–10h ou quinta 9h–11h.
- Resposta pronta a comentário comum ("mas IA não refatora?"): "Refatora, mas ela refatora o que o codebase ensina que é 'normal'. Se o normal é ruim, a refatoração também é." 👇
