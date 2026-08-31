import {describe,expect,it} from 'vitest';
import {createInitialRepo,executeGit} from './git-engine';
describe('interpretador Git',()=>{
 it('cria commits e mantém histórico',()=>{const r=executeGit(createInitialRepo(),'git commit -m "primeiro commit"');expect(r.ok).toBe(true);expect(r.state.commits).toHaveLength(2);expect(r.state.history[0].command).toContain('commit')});
 it('cria e muda de branch',()=>{let s=executeGit(createInitialRepo(),'git branch feature').state;expect(s.branches.feature).toBe('c0');s=executeGit(s,'git switch feature').state;expect(s.currentBranch).toBe('feature')});
 it('aceita checkout como alternativa',()=>{let s=executeGit(createInitialRepo(),'git branch feature').state;s=executeGit(s,'git checkout feature').state;expect(s.currentBranch).toBe('feature')});
 it('adiciona ao stage e registra alteração',()=>{let s=createInitialRepo();s=executeGit(s,'git commit -m "base"').state;s=executeGit(s,'git add .').state;expect(s.staged).toBe(true);s=executeGit(s,'git commit -m "nova"').state;expect(s.commits.at(-1)?.message).toBe('nova')});
 it('faz merge na branch principal',()=>{let s=createInitialRepo();s=executeGit(s,'git branch feature').state;s=executeGit(s,'git switch feature').state;s=executeGit(s,'git add .').state;s=executeGit(s,'git commit -m "feature"').state;s=executeGit(s,'git switch main').state;s=executeGit(s,'git merge feature').state;expect(s.commits.at(-1)?.message).toBe('merge feature');expect(s.branches.main).toBe(s.head)});
 it('mostra log e limpa terminal',()=>{let s=executeGit(createInitialRepo(),'git log').state;expect(s.history.at(-1)?.output).toContain('início do projeto');s=executeGit(s,'clear').state;expect(s.history).toHaveLength(0)});
});
