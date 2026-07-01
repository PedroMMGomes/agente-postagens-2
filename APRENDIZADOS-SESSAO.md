# Aprendizados da sessão — correção de acentos na imagem

> Log de aprendizados vividos em sessão. Cada entrada = uma correção de sistema que passa a valer como regra.

---

## 2026-06-25 — Texto da imagem DEVE ter acentos (correção de rumo)

### O problema
Vinhamos pedindo o texto da imagem em PT-BR **maiúsculo e SEM acentos** ("O CONTEXTO E O PRODUTO"), herdado do golden example do v1 ("O MODELO NAO E O PRODUTO"). O juiz de visão (`glm-4.6v`) marcava `texto_com_acento: false` como **problema** em toda imagem. O autor confirmou: está errado — o português da imagem precisa dos acentos.

### Correção (NOVO padrão, sobrescreve o antigo)
- **Texto na imagem: PT-BR, maiúsculo, COM ACENTOS** ("O CONTEXTO É O PRODUTO", "VOCÊ É O GIL", "O EVAL É O SEU CI", "A MEMÓRIA É O VETOR").
- Exceção: se a palavra não tiver acento, mantém sem (ex.: "PRODUTO", "GIL" — não há "GÌL").
- O `gpt-image-2` renderiza acentos PT-BR corretamente quando o `--text` os inclui; validar sempre no juiz (`texto_com_acento: true`).

### Onde mexemos (regras atualizadas nesta sessão)
- `PERFIL-EDITORIAL.md` → "Texto na imagem" alterado de "sem acentos" para "COM ACENTOS".
- `gerar-e-validar-imagens.skill.md` → "Aprendidos" e rubric do juiz: exigir `texto_com_acento: true`.
- `PIPELINE.md` → Fase C regra de texto da imagem: "COM ACENTOS".
- `.kilo/agent/publicacoes.md` → espelhar a mesma regra (se existir).

### Pendência
- Imagens de #01–#04 (geradas nesta sessão sem acentos) ficam com texto legível mas sem acento. **Regenerar com acentos** quando for republicar/refinar capas (não bloqueia publicação — o juiz deu score 9 mesmo sem acento, mas o novo padrão exige acento). Prioridade: regenerar capas de #02/#03/#04 se o autor quiser consistência total.

### Lição genérica
Sempre confiar no juiz de visão quando ele aponta `texto_com_acento: false` como problema — ele estava certo desde a primeira imagem. Sinais do juiz são dados, não ruído.
