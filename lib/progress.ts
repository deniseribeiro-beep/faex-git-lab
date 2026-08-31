import {createInitialRepo,type RepoState} from './git-engine';
export type SavedProgress={missionIndex:number;stepIndex:number;completed:number[];repo:RepoState;answers:Record<string,string>};
export const newProgress=():SavedProgress=>({missionIndex:0,stepIndex:0,completed:[],repo:createInitialRepo(),answers:{}});
export const canAccessMission=(completed:number[],index:number)=>index<=completed.length;
export const isCourseComplete=(completed:number[],total:number)=>completed.length===total;
export const resetWorkflow=():SavedProgress=>newProgress();
export function normalizeProgress(value:unknown,total:number):SavedProgress{
 const fallback=newProgress();
 if(!value||typeof value!=='object')return fallback;
 const candidate=value as Partial<SavedProgress>;
 const supplied=Array.isArray(candidate.completed)?candidate.completed:[];
 const unique=[...new Set(supplied.filter((item):item is number=>Number.isInteger(item)&&item>=0&&item<total))].sort((a,b)=>a-b);
 const completed:number[]=[];
 for(let i=0;i<unique.length&&unique[i]===i;i++)completed.push(i);
 const firstIncomplete=Math.min(completed.length,total-1);
 const requested=Number.isInteger(candidate.missionIndex)?candidate.missionIndex!:firstIncomplete;
 const missionIndex=Math.max(0,Math.min(requested,firstIncomplete));
 return{...fallback,...candidate,completed,missionIndex,stepIndex:Math.max(0,Number.isInteger(candidate.stepIndex)?candidate.stepIndex!:0),repo:candidate.repo??fallback.repo,answers:candidate.answers??{}};
}
export function resetMission(progress:SavedProgress):SavedProgress{return{...progress,stepIndex:0,completed:progress.completed.filter(i=>i<progress.missionIndex),repo:progress.missionIndex===0?createInitialRepo():progress.repo}}
export function saveProgress(storage:Pick<Storage,'setItem'>,key:string,progress:SavedProgress){storage.setItem(key,JSON.stringify(progress))}
export function loadProgress(storage:Pick<Storage,'getItem'>,key:string,total=Number.MAX_SAFE_INTEGER):SavedProgress{try{return normalizeProgress(JSON.parse(storage.getItem(key)||''),total)}catch{return newProgress()}}
