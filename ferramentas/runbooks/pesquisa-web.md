# Runbook — Pesquisa web (Fase A)

> Como buscar e ler fontes autoritativas para os posts. Usa os MCPs do Kilo Code:
> `zai-search`, `zai-reader`, `zai-zread`.

## Ferramentas

| MCP | Tool | Quando |
|-----|------|--------|
| `zai-search` | `web_search_prime` | Buscar URLs (default para tudo) |
| `zai-reader` | `webReader` | Ler o conteúdo de uma URL específica |
| `zai-zread` | `search_doc` / `read_file` | Só se a fonte for um repo GitHub |

## Busca (zai-search / web_search_prime)

Parâmetros úteis:
- `query`: a pergunta/termo. Use inglês para fontes globais (Martin Fowler, eng.
  empresas reais, papers). Ex.: `"technical debt" "LLM" generative`.
- `search_recency_filter`: `oneMonth` (frescor máximo, default para temas quentes),
  `oneYear` (equilíbrio), `oneDay` (raro, só se breaking news).
- `count`: 10–20 resultados por página.

Heurísticas de boas fontes para o perfil (Tech Lead / Product Builder IA):
- ✅ Blogs de eng. de empresas reais: Martin Fowler (Thoughtworks), Netflix, Uber,
  Stripe, GitHub Engineering, Mozilla, Booking.com.
- ✅ Papers arXiv com case study.
- ✅ Posts de practitioners reconhecidos (Birgitta Böckeler, Andy Osmani, Adam
  Tornhill, Charity Majors, Pavel Voronin).
- ❌ Vendor hype (blog de SaaS vendendo IA).
- ❌ Listas genéricas ("10 dicas de...").
- ❌ Conteúdo sem autor identificável.

## Leitura (zai-reader / webReader)

Para cada URL promissora:
1. `zai-reader` `webReader` com `url: <URL>`.
2. Extraia: **insight** (o que o autor disse), **prova** (número/caso), **origem**
   (URL + autor + data).
3. Se for repo GitHub, use `zai-zread` `search_doc`/`read_file` no lugar.

## Consolidação (saída da Fase A)

Escreva `pesquisas/NN-slug.md` (template em `PIPELINE.md`):

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

**Saída-chave da Fase A:** o **ângulo unificador** — a tese em uma frase que conecta
as fontes. Sem ângulo, não passe para a Fase B. Exemplos bons do v1:
- "O modelo não é o produto. O harness é."
- "Dívida técnica sempre cobrou juros. Com LLMs ela passou a se multiplicar sozinha."
- "Você é o GIL dos seus agentes."

## Anti-padrões

- Buscar só 1 fonte → fraqueza. Mínimo 3 fontes independentes.
- Copiar o resumo do buscador → sempre leia (`zai-reader`) antes de consolidar.
- Sem ângulo unificador → vira resenha solta, não post.
- Fontes velhas (>1 ano) para tema quente → perde relevância. Use `oneMonth`.
