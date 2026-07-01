# Como fazer um MASTER POST (carrossel unindo vários posts)

> Guia de produção: transforma N posts individuais (ex.: a série #01–#06) num
> **carrossel master** de LinkedIn, com humor e fio condutor. O exemplo de régua
> é o `posts-linkedin/07b-master-manual-anti-vibe.md` (leia antes de produzir).

## Quando fazer
Quando você tem uma **série coesa** de posts (3–6) que compartilham um tema
guarda-chuva. O master junta todos num só artefato "desliza e consome" — alto
engajamento e ótimo pra fixar posicionamento.

## Fio condutor (o mais importante)
Escolha UMA metáfora/tese que una tudo. Para a série de engenharia de IA:
> **"A IA constrói a fachada. A engenharia constrói a fundação."**

Cada post vira um **pilar** que sustenta a fundação. Sem fio condutor, é só
um apanhado — não é master.

## Estrutura do carrossel (9 slides)
1. **CAPA (slide 0):** headline de efeito + a dor/ironia + "N coisas que ninguém te conta".
   - Gerar imagem (Tier 0, gpt-image-2 ou glm-image) **com acentos** no headline.
2. **Slides 1..N:** um pilar por slide. Cada um:
   - Headline maiúsculo (tese em 1 linha, com ironia se possível).
   - 2–3 linhas de corpo (a metáfora + 1 prova/número).
   - Roube o "gancho" do post humano correspondente.
3. **RECAP:** o fio condutor + checklist dos pilares (✅/☐) — reforça e dá
   utilidade (salvar/posterior).
4. **CTA:** pergunta específica + "salva esse post".

## Régua de tom (humor, sem perder o técnico)
- **Expectativa vs realidade:** "PoC em 1 dia 🚀 / produção 💀".
- **Comparações em 2 colunas:** caos âmbar vs ordem teal (casa com a paleta).
- **Ângulo do usuário:** "ninguém liga pra velocidade, liga se funciona".
- **Inside-jokes de dev:** "works on my machine", "copy paste", "humilhado no Stack Overflow".
- **Auto-depreciação:** rir da própria dor gera identificação.
- **NUNCA hype** ("revolucionário", "muda tudo"). Tom de **autoridade**, não de descoberta.

## Distribuir as provas pelos pilares (exemplo da série #01–#06)
| Slide | Pilar (post) | Prova |
|---|---|---|
| 1 | Dívida é prompt (#01) | GitClear: 8x mais duplicação |
| 2 | Context engineering (#02) | Anthropic: -67% sem trocar modelo |
| 3 | Eval-driven (#03) | "pareceu bom" não é teste; juiz fraco = placebo |
| 4 | Você é o GIL (#04) | 20 agentes, revisa 1 por vez |
| 5 | Memory poisoning (#05) | MINJA >95% (NeurIPS) |
| 6 | Vibe = dívida (#06) | METR: sênior -19% se achando +20% |

## Legenda curta (acompanha o PDF no post)
- Repete o gancho da capa + "desliza 👉".
- Lista os pilares em 1️⃣2️⃣3️⃣… (cada um 1 linha).
- Fecha com a tese-mãe + CTA-pergunta com emoji.
- 5 hashtags focadas.

## Imagem da capa (regra OBRIGATÓRIA)
- Isométrico 3D, paleta **navy/teal/cyan + âmbar**, max 6 blocos, figuras humanas
  estilizadas, **sem cena de escritório**.
- **Texto na imagem: PT-BR, MAIÚSCULO, COM ACENTOS** ("A FACHADA NÃO É A OBRA").
- Gerar 2+ variantes, validar com juiz GLM-4.6V. **Gate: score≥8 ∧ value_demonstrated ∧ clutter≤6 ∧ texto_com_acento.**

## Montar o PDF
Cada `### Slide N` do arquivo `.md` = uma página 1080×1350 (ou 1024²). Use um
template com a paleta da marca; headline no topo, corpo central, fundo navy.
A capa = a imagem gerada. Exporte as páginas como PDF e publique com a legenda.

## Checklist de pronto (Definition of Done)
- [ ] Fio condutor definido e presente na capa + recap + CTA.
- [ ] Cada pilar = 1 slide com headline + metáfora + 1 prova.
- [ ] Humor aplicado (≥1 recurso: expectativa×realidade, inside-joke, auto-depreciação).
- [ ] Capa com imagem validada (gate aprovado, acentos corretos).
- [ ] Legenda curta com pilares numerados + 5 hashtags + CTA-pergunta.
- [ ] Recap com checklist acionável.

## Referência (o "pronto")
`posts-linkedin/07b-master-manual-anti-vibe.md` — o master aprovado da série
#01–#06. Use como régua de nível.
