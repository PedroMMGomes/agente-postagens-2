# Modelo de Post — templates em branco

> Copie e preencha. Cada post gera **dois** arquivos: `NN-` (denso) e `NNb-` (humano).
> Voz/tom em `PERFIL-EDITORIAL.md`. Pipeline em `PIPELINE.md`.

---

## Template 1 — versão DENSA (`posts-linkedin/NN-slug.md`)

```markdown
# Post LinkedIn #NN — <título interno>

**Status:** Rascunho
**Tamanho:** Médio (~250–320 palavras)
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** <autor/empresa (#arquivo de pesquisa)>

---

## Post (copie a partir daqui)

<Hook curto e provocativo na 1ª linha — a que decide o scroll.>

<1 parágrafo: contexto + tese em ≤2 linhas.>

<Prova 1 — número/caso concreto.>

<Prova 2 — número/caso concreto.>

<Prova 3 (opcional) — número/caso concreto.>

<Takeaway acionável.>

<E você: <pergunta específica>? 👇>

#HashtagAmpla #HashtagNichada #... #... #...

---

## Hooks alternativos (teste A/B)
- "<hook 1>"
- "<hook 2>"
- "<hook 3>"
- "<hook 4>"
- "<hook 5>"

## Notas
- **Tom:** técnico, confiante, primeira pessoa.
- Créditos implícitos às fontes (<autor/empresa>).
- CTA-pergunta no fim (algoritmo do LinkedIn premia comentários).
- Corte opcional para versão curta: <o que cortar>.

---

## Imagem
- **Final:** `imagens/<slug>/<arquivo>.png` (<dimensões>, <Tier N — backend>)
- **Score GLM-4.6V:** <n>/10 (value_demonstrated=<bool>, clutter=<n>) — <passou/gate>
- **Conceito:** <1 frase descrevendo o conceito-primeiro>
- **Log:** <iterações, o que mudou, qual tier usou de fato>

## Alt-text (acessibilidade)
<1 frase descrevendo a imagem para leitores de tela>

## Notas de publicação
- Capa quadrada <dimensões> (LinkedIn aceita; ótima para feed mobile).
- Dia/horário sugerido: <terça 8h–10h> (audience do perfil).
```

---

## Template 2 — versão HUMANA (`posts-linkedin/NNb-slug.md`) ← PRONTO PARA PUBLICAR

```markdown
# Post LinkedIn #NNb — <título interno> (versão curta + humana)

**Status:** Pronto para publicar
**Tamanho:** Curto (~150–200 palavras), linguagem acessível
**Perfil:** Tech Lead / Product Builder focado em IA
**Fontes:** <autor/empresa (#arquivo de pesquisa)>
**Pares com:** imagem `imagens/<slug>/<arquivo>.png` ("<texto da imagem se houver>")

---

## Post (copie a partir daqui)

<Hook com dor relatável + realidade de custo ("ou a conta não fechou") + emoji leve ("??" duplo ok). Ex.: "já fez X... e tudo quebrou ou a conta não fechou?? 😅">

<1 parágrafo curto: contexto humano + a conclusão que CONFIRMOU como eu penso o assunto (tom de autoridade — o autor é practitioner, a leitura valida, não descobre).>

<A tese em 1 linha, sem jargão.>

<Uma metáfora concreta que traduza o abstrato em algo físico do dia-a-dia. Ex.: motor = modelo / harness = freio, direção, airbag.>

Em <três> ideias simples:

1️⃣ <prova simplificada, 1 linha, sem números densos.>

2️⃣ <prova simplificada, 1 linha.>

3️⃣ <prova simplificada, 1 linha.>

<Wrap-up frasal. Ex.: "Resumo da ópera: ...".>

E você: <pergunta específica>? 👇

#HashtagAmpla #HashtagNichada #... #... #...

---

## Hooks alternativos (teste A/B)
- "<hook 1>"
- "<hook 2>"
- "<hook 3>"

## Notas
- **Tom:** humano, conversacional, primeira pessoa — acessível até pra quem não é especialista em IA.
- A **metáfora do X** (= modelo / = harness) torna o conceito concreto pra qualquer leitor.
- Cortou os detalhes técnicos densos da v1 — aqui o foco é o "e daí?", não o "como".
- CTA-pergunta com emoji no fim.
- 5 hashtags focadas.

---

## Imagem
- **Final:** `imagens/<slug>/<arquivo>.png` (<dimensões>, <Tier N — backend>)
- **Score GLM-4.6V:** <n>/10 — passou no gate.
- **Por que combina com a versão curta:** <1 frase — ex.: "o texto na imagem reforça o hook no 1º segundo de scroll">.

## Alt-text (acessibilidade)
<1 frase descrevendo a imagem>

## Notas de publicação
- Postar o texto junto com a foto quadrada (ótima pro feed mobile).
- Tom mais leve que a v1 — alcança público além do hard-core técnico.

---

## 📋 Registro de refinamento (quando houver iteração de imagem)
```markdown
## 📋 Registro de refinamento (sessão <data>)

### Imagens geradas nesta sessão (todas em `imagens/<slug>/`)
| ID | Arquivo | Conceito | Score | Clutter | Status |
|----|---------|----------|-------|---------|--------|
| A | `<arq>.png` | <conceito> | <n> | <n> | ✅ passa / ⚠️ descartada |
| B | `<arq>.png` | <conceito> | <n> | <n> | ✅ **escolhida pelo autor** |

### Decisão do autor
- Aprovou a **<ID>** ("<reação do autor>").

### Pendências
- <itens em aberto>
```
O autor quer o **processo** documentado, não só o resultado. Adicione esta seção sempre
que a Fase D gerar múltiplas variantes.
```

---

## Checklist antes de commitar

- [ ] Post denso tem hook, tese em ≤2 linhas, 2–3 provas, takeaway, CTA, 5–8 hashtags.
- [ ] Post humano tem hook com dor+emoji, 1 metáfora concreta, 3 ideias em 1️⃣2️⃣3️⃣,
      wrap-up, CTA+emoji, 5 hashtags, "Status: Pronto para publicar".
- [ ] Imagem existe e passou no gate (score ≥ 8, value_demonstrated, clutter ≤ 4).
- [ ] Alt-text presente nos dois arquivos.
- [ ] Backlog atualizado.
- [ ] Nenhuma chave de API no commit.
