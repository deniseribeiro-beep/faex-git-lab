# Arquitetura

## Visão geral

O FAEX Git Lab é uma aplicação React/TypeScript sem servidor. O estado do repositório simulado e o progresso do aluno existem apenas no navegador.

## Componentes

- **Interface (`app/page.tsx`)**: coordena missão, terminal, árvore, feedback e certificado.
- **Interpretador (`lib/git-engine.ts`)**: recebe uma string, valida o comando e retorna um novo estado imutável do repositório.
- **Conteúdo (`lib/missions.ts`)**: descreve missões Git e conceituais em ordem progressiva.
- **Progresso (`lib/progress.ts`)**: concentra bloqueio, reinício, conclusão e serialização.
- **Persistência**: `localStorage`, sem dados remotos.

## Fluxo

1. O aluno vê uma única etapa e o resultado esperado.
2. A ação é avaliada localmente.
3. O interpretador produz o novo estado.
4. A árvore é redesenhada pelo React.
5. A conclusão libera manualmente a próxima missão.
6. O progresso é salvo no navegador.

## Acessibilidade

Estados combinam cor, texto e ícones. A interface usa alto contraste, fonte grande, foco visível, regiões de status e rótulos textuais.
