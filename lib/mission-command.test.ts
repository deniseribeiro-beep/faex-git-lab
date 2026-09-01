import {describe,expect,it} from 'vitest';
import {createInitialRepo,executeGit} from './git-engine';
import {prepareGuidedCommand} from './mission-command';

describe('recuperação do fluxo guiado',()=>{
  it('recupera a missão 5 salva na feature e permite o merge',()=>{
    let repo=createInitialRepo();
    repo=executeGit(repo,'git branch feature-requisitos').state;
    repo=executeGit(repo,'git switch feature-requisitos').state;
    repo=executeGit(repo,'git add .').state;
    repo=executeGit(repo,'git commit -m "adiciona requisitos"').state;
    const prepared=prepareGuidedCommand(repo,'merge',1,'git merge feature-requisitos');
    expect(prepared.recovered).toBe(true);
    expect(prepared.repo.currentBranch).toBe('main');
    const merged=executeGit(prepared.repo,'git merge feature-requisitos');
    expect(merged.ok).toBe(true);
    expect(merged.state.branches.main).toBe(merged.state.head);
  });
  it('não altera um fluxo que já está correto',()=>{
    const repo=createInitialRepo();
    expect(prepareGuidedCommand(repo,'merge',1,'git merge feature-requisitos')).toEqual({repo,recovered:false});
  });
});

