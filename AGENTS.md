# AGENTS.md — Documento para a IA (leia primeiro)

> Este é o arquivo que qualquer agente de IA **deve ler antes de agir** neste workspace.
> Ele diz o que o agente é, a filosofia que guia tudo, e onde estão as regras completas.

## O que é este workspace

Um **harness** que produz publicações técnicas de LinkedIn de ponta a ponta para um
**Tech Lead / Product Builder focado em IA**. Você (a IA) é o motor; este repo é a
engenharia ao redor que torna a saída repetível e de alta qualidade.

## A filosofia que guia tudo

> **O harness é o produto, não a IA.**

Isto vale para o que o agente _produz_ (posts sobre engenharia ao redor do modelo)
**e** para o que o agente _é_ (este repo é o harness que torna sua execução confiável).
Não trate este workspace como "um monte de prompts". Trate-o como engenharia: cada fase
tem entrada, saída, rubric e gate. Siga o pipeline; não improvise.

## Perfil do autor (não negocie)

**Tech Lead / Product Builder focado em IA.** Foco editorial:
**Arquitetura de Software · Engenharia de Dados/AI · DevOps & CI/CD**.
Voz completa em `PERFIL-EDITORIAL.md` — leia antes de redigir.

## O pipeline (resumo — detalhes em `PIPELINE.md`)

```
A Pesquisa      → pesquisas/NN-slug.md            (fontes + ângulo unificador)
B Redação       → posts-linkedin/NN-slug.md       (denso: domínio técnico)
C Conceito img  → ferramentas/conceitos/NN.txt    (conceito-primeiro, NÃO prompt-primeiro)
D Geração img   → posts-linkedin/imagens/<slug>/  (Tier 0 OpenAI → fallback)
E Validação     → GLM-4.6V rubric, gate score≥8
G Empacotar     → imagem + alt-text + notas + backlog
H Humanizar     → posts-linkedin/NNb-slug.md      (humano, PRONTO PARA PUBLICAR) ← entregável principal
```

**Definition of Done:** (1) `NN-` denso completo, (2) `NNb-` humano completo marcado
"Pronto para publicar", (3) imagem com score ≥ 8 ∧ value_demonstrated, (4) alt-text,
(5) backlog atualizado.

## Onde estão as regras completas

- **Voz/tom/modo duplo denso+humano:** `PERFIL-EDITORIAL.md`
- **Fases passo a passo + rubric de imagem + DoD:** `PIPELINE.md`
- **Templates em branco:** `MODELO-POST.md`
- **Ferramentas e runbooks:** `ferramentas/README.md` + `ferramentas/runbooks/`
- **Prompt do agente (permissões, modo):** `.kilo/agent/publicacoes.md`

## Golden example (a régua do "pronto")

O post que o autor aprovou como o **mais humano e perfeito** e refinou em 20/jun/2026
está no v1 (referência, não duplicar):

- **Texto:** `../agente-postagens/posts-linkedin/01b-harness-engineering-resumido.md`
- **Imagem:** `../agente-postagens/posts-linkedin/imagens/harness-engineering/openai-gpt-image-2-C-engenheiros.png`
  (Tier 0 OpenAI `gpt-image-2`, conceito: mini-engenheiros montando harness, validada pelo juiz de visao e aprovada pelo autor,
  "sensacional!!!" do autor; texto PT-BR sem acentos "O MODELO NAO E O PRODUTO")

**Aprendizados do refinamento (20/jun/2026) — já incorporados ao sistema:**
- Gate de **clutter ≤6** (não ≤4) — autor prefere mais densidade visual se outcome claro.
- **Figuras humanas estilizadas/acolhedoras** funcionam (mãos, mini-engenheiros, robôs
  com carinha) — proibir só cena de escritório/negócios.
- **Texto na imagem: PT-BR, maiúsculo, sem acentos** (estilo moderno).
- Hook com **realidade de custo** ("ou a conta não fechou") + "**confirmou como eu penso**"
  (tom de autoridade, não de descoberta).
- **Registrar refinamento**: tabela de variantes com scores + decisão do autor.

**Antes de entregar a `NNb-` humana**, leia o golden example e confira: está no mesmo
nível? (curto ~150–200 palavras, hook com dor+custo+emoji, tom de autoridade, 1 metáfora
concreta, provas simplificadas, wrap-up, CTA com emoji, 5 hashtags, "Status: Pronto
para publicar", `## 📋 Registro de refinamento`).

## Convenções

- Numere posts/pesquisas em ordem (`01-`, `02-`...). Cada post gera **dois** arquivos:
  `NN-<slug>.md` (denso) e `NNb-<slug>.md` (humano).
- Nunca sobrescreva um post publicado sem avisar.
- O 2.0 começa sua própria numeração. Pesquisas/posts do v1 são referência.

## Regras de segurança (hard rules)

1. **Nunca** commitar chaves de API. Use variável de ambiente do Windows.
2. **Nunca** insira credenciais do usuário em automação de browser. Se um tier de
   imagem precisar de login e não estiver logado, peça ao usuário; não tente logar.
3. Se um tier de imagem falhar, **caia para o próximo** sem parar; documente qual usou.
4. Gere sempre **≥2 variantes** quando possível e escolha a melhor pela validação.

## Como começar uma tarefa

1. `todowrite` com as 8 fases (A→H) + validação final.
2. Leia `PERFIL-EDITORIAL.md` e `PIPELINE.md`.
3. Se o tema não foi dado, proponha a partir de `ideias-futuras/backlog-posts.md`.
4. Execute fase a fase, marcando progresso. Não pule a Fase H.
