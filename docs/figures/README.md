# Figuras da palestra ADS

Preferência de proporção para o projetor: **16:9** (wide).

Arquivos servidos em `public/palestra-ads/assets/figures/`:

| Arquivo | Uso no redesign |
|---|---|
| `01-cover.jpg` | Capa hero full-bleed + slide de contatos |
| `02-mercado.jpg` | Split “Por que TI?” (faixa 16:9) |
| `03-campus.jpg` | Split docentes (lab real) |
| `04-labs.jpg` | Split infraestrutura (lab real) |
| `07-contato.jpg` | Hero teaser Robocode |

O layout usa `object-fit: cover` em hero full-bleed e em figuras com `aspect-ratio: 16/9`. Para novos exports, gere crops horizontais quando possível.
