# FAEX Git Lab

Portal educacional da FAEX com simulador de Git e laboratórios de Arquitetura de Computadores.

Tudo roda no navegador, sem login. O progresso do Git Lab fica no `localStorage`.

## Mapa do portal (GitHub Pages)

Base: `/faex-git-lab/`

| Recurso | Caminho |
|---|---|
| Portal (menu) | `/` |
| Git Lab | `/git-lab/` |
| Flip-flops (Semana 05) | `/flipflops/` |
| Ciclo de instrução (Semana 06) | `/ciclo-instrucao/` |
| ISA RV32I (Semana 07) | `/isa-rv32i/` |

## Laboratórios de Arquitetura de Computadores

- `public/flipflops/`: Semana 05 — lógica sequencial, latches, flip-flops, registradores e PC.
- `public/ciclo-instrucao/`: Semana 06 — organização funcional, barramentos, ciclo de instrução e rastro arquitetural.
- `public/isa-rv32i/`: Semana 07 — ISA, formatos R/I/S/B/U/J, codificação, decodificação e vetores do subconjunto MiniRV.

## Executar

Requer Node.js 22 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000` (Git Lab via Vinext/Next).

Para pré-visualizar o portal estático localmente após o build Pages:

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
- `portal/faex-logo.svg`: logo institucional do dashboard.
- `git-lab/index.html`: entrada do simulador Git (build Pages).
- `app/`: interface React do Git Lab (dev Vinext).
- `lib/git-engine.ts`: interpretador Git em memória.
- `lib/missions.ts`: conteúdo das missões.
- `lib/progress.ts`: regras de progresso e persistência.
- `docs/arquitetura.md`: decisões de arquitetura.
- `public/flipflops/`, `public/ciclo-instrucao/`, `public/isa-rv32i/`: labs de Arquitetura.

## Publicação

O workflow `ci.yml` valida testes e build. O workflow `pages.yml` publica o cliente gerado no GitHub Pages quando houver push na branch `main` (`pnpm build:pages` → `dist-pages`).
