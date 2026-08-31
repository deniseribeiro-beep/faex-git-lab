import {describe,expect,it,vi} from 'vitest';
import {canAccessMission,isCourseComplete,loadProgress,newProgress,normalizeProgress,resetMission,resetWorkflow,saveProgress} from './progress';
describe('progresso das missões',()=>{
 it('bloqueia missões fora de ordem',()=>{expect(canAccessMission([],1)).toBe(false);expect(canAccessMission([0],1)).toBe(true)});
 it('salva e recupera o progresso',()=>{let raw='';const storage={setItem:vi.fn((_k:string,v:string)=>raw=v),getItem:vi.fn(()=>raw)};const p={...newProgress(),completed:[0]};saveProgress(storage,'test',p);expect(loadProgress(storage,'test').completed).toEqual([0])});
 it('retoma exatamente a missão, etapa, árvore e histórico salvos',()=>{let raw='';const storage={setItem:(_k:string,v:string)=>raw=v,getItem:()=>raw};const original={...newProgress(),missionIndex:2,stepIndex:1,completed:[0,1],repo:{...newProgress().repo,currentBranch:'feature',history:[{command:'git switch feature',output:'ok',ok:true}]}};saveProgress(storage,'test',original);const restored=loadProgress(storage,'test',8);expect(restored.missionIndex).toBe(2);expect(restored.stepIndex).toBe(1);expect(restored.repo.currentBranch).toBe('feature');expect(restored.repo.history).toHaveLength(1)});
 it('remove conclusões fora de ordem e impede saltos adulterados',()=>{const restored=normalizeProgress({...newProgress(),missionIndex:6,completed:[0,2,5]},8);expect(restored.completed).toEqual([0]);expect(restored.missionIndex).toBe(1);expect(canAccessMission(restored.completed,2)).toBe(false)});
 it('reinicia a missão atual',()=>{const p={...newProgress(),missionIndex:1,stepIndex:2,completed:[0,1]};const r=resetMission(p);expect(r.stepIndex).toBe(0);expect(r.completed).toEqual([0])});
 it('reinicia todo o workflow e zera a barra de progresso',()=>{const r=resetWorkflow();expect(r.missionIndex).toBe(0);expect(r.stepIndex).toBe(0);expect(r.completed).toHaveLength(0);expect(r.repo.currentBranch).toBe('main')});
 it('detecta a liberação do certificado',()=>{expect(isCourseComplete([0,1,2],3)).toBe(true);expect(isCourseComplete([0,1],3)).toBe(false)});
});
