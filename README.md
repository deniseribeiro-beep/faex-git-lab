# FAEX Git Lab

Portal educacional da FAEX com simulador de Git, laboratórios de Arquitetura de Computadores e palestra interativa do curso de Análise e Desenvolvimento de Sistemas (ADS).

Tudo roda no navegador, sem login. O progresso do Git Lab fica no `localStorage`.

## Mapa do portal (GitHub Pages)

Base: `/faex-git-lab/`

| Recurso | Caminho |
|---|---|
| Portal (menu) | `/` |
| Palestra ADS (enquete + quiz) | `/palestra-ads/` |
| Git Lab | `/git-lab/` |
| Flip-flops (Semana 05) | `/flipflops/` |
| Ciclo de instrução (Semana 06) | `/ciclo-instrucao/` |
| ISA RV32I (Semana 07) | `/isa-rv32i/` |

## Laboratórios de Arquitetura de Computadores

- `public/flipflops/`: Semana 05 — lógica sequencial, latches, flip-flops, registradores e PC.
- `public/ciclo-instrucao/`: Semana 06 — organização funcional, barramentos, ciclo de instrução e rastro arquitetural.
- `public/isa-rv32i/`: Semana 07 — ISA, formatos R/I/S/B/U/J, codificação, decodificação e vetores do subconjunto MiniRV.

## Palestra ADS

- `public/palestra-ads/`: apresentação HTML (projetor) com templates claros (hero / split / spotlight), enquete ao vivo, reveal de docentes, quiz em estilo arena e teaser Robocode.
- Imagens wide/full-bleed em `public/palestra-ads/assets/figures/` (staging em `docs/figures/`). Exports futuros das figuras devem ser **16:9** (evitar 1:1) para encaixar bem com `object-fit: cover`.
- Fontes em `docs/`: `Palestra ADS FAEX.pptx`, `Template_FAEX.pptx` (identidade visual).

## Executar

Requer Node.js 22 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000` (Git Lab via Vinext/Next).

Para pré-visualizar o portal estático e a palestra localmente após o build Pages:

```bash
pnpm build:pages
```

Os arquivos ficam em `dist-pages/` (abra com um servidor estático na pasta, respeitando a base `/faex-git-lab/` se necessário).

## Validar

```bash
pnpm test
pnpm lint
pnpm build
```

## Estrutura

- `index.html`: portal/dashboard (entrada do GitHub Pages).
- `portal/style.css`: estilos do portal.
- `git-lab/index.html`: entrada do simulador Git (build Pages).
- `app/`: interface React do Git Lab (dev Vinext).
- `lib/git-engine.ts`: interpretador Git em memória.
- `lib/missions.ts`: conteúdo das missões.
- `lib/progress.ts`: regras de progresso e persistência.
- `docs/arquitetura.md`: decisões de arquitetura.
- `docs/figures/`: staging das imagens da palestra.
- `public/palestra-ads/`: palestra ADS (descoberta + quiz).
- `public/flipflops/`, `public/ciclo-instrucao/`, `public/isa-rv32i/`: labs de Arquitetura.

## Publicação

O workflow `ci.yml` valida testes e build. O workflow `pages.yml` publica o cliente gerado no GitHub Pages quando houver push na branch `main` (`pnpm build:pages` → `dist-pages`).
