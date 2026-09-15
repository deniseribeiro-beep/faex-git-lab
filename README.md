# FAEX Git Lab

Simulador educacional de Git para alunos iniciantes de Engenharia de Software. O projeto funciona no navegador, não exige login e guarda o progresso no `localStorage`.

## Laboratórios de Arquitetura de Computadores

O mesmo repositório também hospeda laboratórios didáticos independentes usados nas aulas de Arquitetura de Computadores:

- `public/flipflops/`: Semana 05 — lógica sequencial, latches, flip-flops, registradores e PC.
- `public/ciclo-instrucao/`: Semana 06 — organização funcional, barramentos, ciclo de instrução e rastro arquitetural.

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
- `public/flipflops/`: laboratório da Semana 05 de Arquitetura de Computadores.
- `public/ciclo-instrucao/`: laboratório da Semana 06 de Arquitetura de Computadores.

## Publicação

O workflow `ci.yml` valida testes e build. O workflow `pages.yml` publica o cliente gerado no GitHub Pages quando houver push na branch `main`.
