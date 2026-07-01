# Pipeline — as 8 fases do Agente 2.0

> Execute as fases **em ordem**. Use `todowrite` para tracking. Não pule a Fase H.
> Voz/tom em `PERFIL-EDITORIAL.md`. Templates em `MODELO-POST.md`.

## Visão geral

```
A  Pesquisa       fontes + ângulo unificador
B  Redação        post denso (demonstra domínio)
C  Conceito img   conceito-primeiro (NÃO prompt-primeiro)
D  Geração img    Tier 0 OpenAI → fallback
E  Validação      GLM-4.6V rubric, gate score≥8
G  Empacotar      imagem + alt-text + notas + backlog
H  Humanizar      versão humana PRONTO PARA PUBLICAR  ← entregável principal
```

> (Sem Fase F no 2.0: o v1 tinha "vídeo curto, bônus". Removido do core — só se sobrar
> energia e o usuário pedir explicitamente.)

---

## Fase A — Pesquisa

**Ferramentas:** `zai-search` (`web_search_prime`), `zai-reader` (`webReader`),
`zai-zread` (`search_doc`/`read_file` só p/ repo GitHub).

**Passos:**
1. Busque fontes autoritativas recentes (blog Martin Fowler, eng. de empresas reais,
   papers). `search_recency_filter` em `oneMonth`/`oneYear` para frescor.
2. Leia as URLs promissoras com `zai-reader`.
3. Consolide em `pesquisas/NN-slug.md`: tópicos numerados, cada um com
   **insight + prova + origem (URL/arquivo)**.

**Saída-chave:** identificar um **ângulo unificador** — a tese que conecta as fontes
(ex.: "o modelo não é o produto, o harness é"; "dívida técnica virou prompt"). Sem
ângulo, não passe para a Fase B.

**Template de `pesquisas/NN-slug.md`:**
```markdown
# <Tema> — pesquisa

- **Fonte:** <URL>
- **Publicado:** <data>
- **Tags:** ...
- **Relevância p/ perfil:** ALTA/MÉDIA + por quê

## Tópicos
### 1. <insight>
<prova> (origem: <URL>)

### 2. ...

## Ângulo unificador
<uma frase, a tese que conecta tudo>

## Takeaways para posts
- <pauta 1>
- <pauta 2>
```

---

## Fase B — Redação do post denso

**Arquivo:** `posts-linkedin/NN-slug.md` (use `MODELO-POST.md` template denso).

**Estrutura obrigatória:**
- `# Post LinkedIn #NN — <título interno>`
- Metadados: Status, Tamanho, Perfil, Fontes.
- `## Post (copie a partir daqui)` — o texto publicável (~250–320 palavras).
- `## Hooks alternativos` — 4–5 opções de 1ª linha (A/B).
- `## Notas` — tom, créditos, corte opcional.

**Critério de pronto:** hook forte · tese clara em ≤2 linhas · 2–3 provas concretas
(número/caso) · takeaway acionável · CTA-pergunta · 5–8 hashtags.

---

## Fase C — Conceito da imagem (CONCEITO-PRIMEIRO, NÃO prompt-primeiro)

Esta é a fase que mais diferencia uma publicação que para o scroll de uma genérica.

1. **Extraia o VALOR:** do texto do post, qual é o único benefício/insight que o leitor
   leva? Qual o "e daí?" que a imagem precisa responder?
2. **Escolha um padrão de demonstração de valor:**
   - **Antes → Depois** (caos frágil → sistema limpo/robusto).
   - **KPI / métrica** (número-âncora do post, seta de melhoria).
   - **Outcome icons** (escudo=segurança, check=qualidade, raio=velocidade).
   - **Facilitação** (várias peças convergindo num nó central = a peça que importa).
   - **Metáfora lúdica simples** (robôs/engenheirinhos mini interagindo com o sistema).
3. **Desenhe um conceito LIMPO** aplicando as regras de redesign (abaixo).
4. **Vire um concept-brief** em `ferramentas/conceitos/NN-slug.txt` — **inclua o texto
   do post como contexto** (foi isso que gerou a imagem boa no v1).

### Regras de "limpeza" (rubric de redesign)
- Layout linear ou radial **simples, ≤6 blocos**, caminho de leitura óbvio.
- **Uma** fonte sans-serif, hierarquia nítida (título grande / seções médias /
  corpo legível ≥16pt-equivalente).
- **Ícones de um único estilo** (não misture linha com 3D).
- **Espaço em branco generoso** — não encaixe tudo.
- **Enfatize o OUTCOME** visualmente, não só enuncie a tese.
- Paleta: navy/teal/cyan + 1 acento (âmbar para tom humano/quente). Quadrado 1:1.
- **Figuras humanas estilizadas/acolhedoras são PERMITIDAS** (mãos que cuidam,
  mini-engenheiros, robôs com carinha simpática) — tom quente, não corporativo.
  Aprendizado da sessão 20/jun/2026: o autor aprovou esse padrão (validada pelo juiz de visao).
- **Texto na imagem: PT-BR, maiúsculo, COM ACENTOS** ("O CONTEXTO É O PRODUTO").
  O `gpt-image-2` renderiza PT-BR com acentos corretamente. *(Correção 25/jun/2026: antes "sem acentos" — ver `APRENDIZADOS-SESSAO.md`.)*
- **PROIBIDO**: esfera em wireframe solta, "beleza abstrata sem significado", texto
  distorcido, poluição, marca d'água, **cena de escritório/pessoas de negócio**/
  reunião corporativa/gráfico de vendas. (Figuras estilizadas acolhedoras ≠ cena
  de escritório.)

---

## Fase D — Geração / captura da imagem (TIER, do melhor p/ o pior)

Hierarquia completa em `ferramentas/runbooks/imagem-tiers.md`. Resumo:

| Tier | Backend | Quando | Script |
|------|---------|--------|--------|
| **0** | OpenAI `gpt-image-2` | DEFAULT — melhor qualidade + **texto perfeito** | `gerar-imagem-openai.mjs` |
| 1 | Gemini (Imagen) via Chrome logado | grátis, se OpenAI falhar/sem chave | `gemini-gen.mjs` |
| 2 | Web-sourced (Openverse CC) | diagrama pronto comunica melhor que IA | `web-sourcing.mjs` |
| 3 | Pollinations `flux` | fallback keyless, qualidade menor | `gerar-imagem.mjs --backend pollinations` |

**Regras:**
- **Tier 0 default.** Se a `OPENAI_API_KEY` não estiver definida, **avise o usuário** e
  caia para Tier 1/3 — documente qual tier foi usado de fato.
- Se a imagem tiver **TEXTO**, SEMPRE adicione ao prompt (Tier 0):
  *"Show ONLY this single headline — do NOT add any other labels, captions, callouts
  or annotations. Keep it to a maximum of 4 visual blocks."*
  (Evita o clutter que o `gpt-image-2` "ajuda" inventando rótulos extras.)
- Salve em `posts-linkedin/imagens/<slug>/openai-N.png` (ou `gemini-N.png`/`openverse-N.png`).
- Gere **≥2 variantes** quando possível; escolha a melhor na Fase E.
- Se um tier falhar, **caia para o próximo** sem parar; registre qual usou.

---

## Fase E — Validação (loop com GLM-4.6V — seus "olhos")

Toda imagem (de qualquer tier) passa pelo **zai-vision `analyze_image`** com esta rubric.
Peça resposta **APENAS em JSON**:

```json
{
  "score": "<1-10>",
  "value_demonstrated": "<bool>",
  "clutter": "<1-10>",          // 10 = poluído; alvo ≤6 (elevado de ≤4 em 20/jun/2026)
  "legibility": "<1-10>",
  "fidelity": "<1-10>",
  "on_brand": "<bool>",
  "weaknesses": ["...", "..."],
  "improved_concept": "..."
}
```

- **Alvo (gate):** `score ≥ 8` **E** `value_demonstrated=true` **E** `clutter ≤ 6`.
  (Gate de clutter elevado de ≤4 → ≤6 em 20/jun/2026 — a variante com 5 blocos
  passou com folga; o autor prefere um pouco mais de densidade visual desde que o
  outcome esteja claro.)
- Se não bate: aplique `improved_concept` e regere (máx 4 iterações). Best-of-N.
- Penalize: texto distorcido, tropo genérico (esfera/wireframe), poluição,
  ausência de outcome, cena de escritório.

---

## Fase G — Empacotamento e handoff

No `posts-linkedin/NN-slug.md` (denso), adicione ao final:
- `## Imagem` — caminho do arquivo final + tier usado + score GLM + log de iterações.
- `## Alt-text` — descrição curta para acessibilidade do LinkedIn (1 frase).
- `## Notas de publicação` — dia/horário sugerido, observações.

Atualize `ideias-futuras/backlog-posts.md` (riscar o que virou post, adicionar derivados).

---

## Fase H — Humanização ("pronto para publicar") ← entregável principal

**Arquivo:** `posts-linkedin/NNb-slug.md` (use `MODELO-POST.md` template humano).

Receba o post denso + imagem aprovada e produza a **versão humana** seguindo a
**régua do `PERFIL-EDITORIAL.md` → "Régua da versão humana `NNb-`"**:

1. Curto (~150–200 palavras).
2. Hook com dor relatável + **realidade de custo** ("ou a conta não fechou") + emoji leve ("??" duplo ok).
3. **Tom de autoridade** na frase de contexto: "confirmou como eu penso" (não "mudou"). O autor é practitioner — a leitura valida, não descobre.
4. **Uma metáfora concreta** que traduza o abstrato.
5. Provas simplificadas (corte números densos).
6. 3 ideias em 1️⃣2️⃣3️⃣, 1 linha cada.
7. Wrap-up frasal ("Resumo da ópera:...").
8. CTA-pergunta com emoji.
9. 5 hashtags focadas.
10. Metadados: `Status: Pronto para publicar`, `Pares com: <imagem aprovada>`.
11. `## Imagem` aponta para a **mesma** imagem aprovada da densa.
12. `## 📋 Registro de refinamento` (quando houver iteração de imagem) — tabela de variantes com scores + decisão do autor + pendências. O autor quer o **processo** documentado, não só o resultado.

**Antes de fechar**, leia o golden example
(`../agente-postagens/posts-linkedin/01b-harness-engineering-resumido.md`) e confira:
está no mesmo nível? Se não, reescreva.

---

## Fase R — Registro de refinamento (quando houver iteração de imagem)

O autor valoriza o **processo** documentado, não só o resultado final. Quando a Fase D
gerar múltiplas variantes (best-of-N) e/ou a Fase E iterar, adicione ao final do
`posts-linkedin/NN-slug.md` (e espelhe no `NNb-`):

```markdown
## 📋 Registro de refinamento (sessão <data>)

### Imagens geradas nesta sessão (todas em `imagens/<slug>/`)
| ID | Arquivo | Conceito | Score | Clutter | Status |
|----|---------|----------|-------|---------|--------|
| A | `<arq>.png` | <conceito> | <n> | <n> | ✅ passa / ⚠️ descartada |
| B | `<arq>.png` | <conceito> | <n> | <n> | ✅ **escolhida pelo autor** |

### Decisão do autor
- Aprovou a **<ID>** ("<reação do autor>").

### Onde mexemos (mudanças de gate/config)
- <se mudou clutter/blocos/prompt-template, documente aqui>

### Pendências
- <itens em aberto>
```

Isso transforma cada post em **case study** do próprio harness — útil para calibrar
futuros posts e para o autor revisitar decisões.

---

## Definition of Done (DoD)

1. `posts-linkedin/NN-slug.md` completo (post denso + hooks + imagem + alt-text + notas).
2. `posts-linkedin/NNb-slug.md` completo e marcado **"Pronto para publicar"**.
3. Imagem final com **score GLM-4.6V ≥ 8** **E** `value_demonstrated=true`.
4. Alt-text presente.
5. `ideias-futuras/backlog-posts.md` atualizado.

Faltou qualquer item → não está pronto.
