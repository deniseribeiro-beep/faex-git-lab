# FAEX Git Lab

Simulador educacional de Git para alunos iniciantes de Engenharia de Software. O projeto funciona no navegador, não exige login e guarda o progresso no `localStorage`.

## Executar

Requer Node.js 22 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

## Validar

```bash
pnpm test
pnpm lint
pnpm build
```

## Estrutura

- `app/`: interface e estilos.
- `lib/git-engine.ts`: interpretador Git em memória.
- `lib/missions.ts`: conteúdo das missões.
- `lib/progress.ts`: regras de progresso e persistência.
- `docs/arquitetura.md`: decisões de arquitetura.

## Publicação

O workflow `ci.yml` valida testes e build. O workflow `pages.yml` publica o cliente gerado no GitHub Pages quando houver push na branch `main`.
