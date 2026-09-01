import {executeGit,type RepoState} from './git-engine';

export function prepareGuidedCommand(repo:RepoState,missionId:string,stepIndex:number,command:string):{repo:RepoState;recovered:boolean}{
  const target=command.trim().match(/^git merge\s+([\w-]+)$/i)?.[1];
  const staleMerge=missionId==='merge'&&stepIndex===1&&target===repo.currentBranch&&repo.currentBranch!=='main'&&Boolean(repo.branches.main);
  if(!staleMerge)return{repo,recovered:false};
  const switched=executeGit(repo,'git switch main');
  return{repo:switched.state,recovered:switched.ok};
}

