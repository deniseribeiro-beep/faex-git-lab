export type Commit={id:string;message:string;parent:string|null;branch:string};
export type HistoryItem={command:string;output:string;ok:boolean};
export type RepoState={initialized:boolean;branches:Record<string,string>;commits:Commit[];currentBranch:string;head:string;modified:boolean;staged:boolean;history:HistoryItem[];nextId:number};
export type CommandResult={ok:boolean;message:string;state:RepoState};
export const createInitialRepo=():RepoState=>({initialized:true,branches:{main:'c0'},commits:[{id:'c0',message:'início do projeto',parent:null,branch:'main'}],currentBranch:'main',head:'c0',modified:true,staged:true,history:[],nextId:1});
const logged=(s:RepoState,command:string,output:string,ok:boolean):RepoState=>({...s,history:[...s.history,{command,output,ok}]});
export function executeGit(state:RepoState,raw:string):CommandResult{const command=raw.trim(),low=command.toLowerCase();let next={...state,branches:{...state.branches},commits:[...state.commits]};let ok=true,message='Comando executado.';
if(low==='clear')return{ok:true,message:'Terminal limpo.',state:{...next,history:[]}};
if(low==='help')message='Use: init, status, add ., commit, log, branch, switch, merge ou reset.';
else if(low==='git init'){next={...createInitialRepo(),history:state.history};message='Repositório iniciado.'}
else if(low==='git status')message=next.staged?'Alterações prontas para commit.':next.modified?'Há arquivos modificados.':'Nada para registrar.';
else if(low==='git add .'){next.staged=true;next.modified=false;message='Alterações adicionadas à área de stage.'}
else if(/^git commit -m\s+"[^"]+"$/i.test(command)){if(!next.staged){ok=false;message='Nada está na área de stage. Use: git add .'}else{const msg=command.match(/"([^"]+)"/)![1],id=`c${next.nextId++}`;next.commits.push({id,message:msg,parent:next.head,branch:next.currentBranch});next.head=id;next.branches[next.currentBranch]=id;next.staged=false;next.modified=true;message=`Commit ${id} criado: ${msg}`}}
else if(low==='git log')message=next.commits.slice().reverse().map(c=>`${c.id} ${c.message}`).join(' · ');
else if(/^git branch\s+[\w-]+$/i.test(command)){const name=command.split(/\s+/)[2];if(next.branches[name]){ok=false;message='Essa branch já existe.'}else{next.branches[name]=next.head;message=`Branch ${name} criada.`}}
else if(/^git (switch|checkout)\s+[\w-]+$/i.test(command)){const name=command.split(/\s+/)[2];if(!next.branches[name]){ok=false;message=`Branch ${name} não existe.`}else{next.currentBranch=name;next.head=next.branches[name];next.modified=true;message=`Agora você está na branch ${name}.`}}
else if(/^git merge\s+[\w-]+$/i.test(command)){const name=command.split(/\s+/)[2];if(!next.branches[name]){ok=false;message=`Branch ${name} não existe.`}else if(name===next.currentBranch){ok=false;message='Escolha outra branch para integrar.'}else{const source=next.branches[name];if(source===next.head)message='Branches já estão integradas.';else{const id=`c${next.nextId++}`;next.commits.push({id,message:`merge ${name}`,parent:next.head,branch:next.currentBranch});next.head=id;next.branches[next.currentBranch]=id;message=`Branch ${name} integrada com sucesso.`}}}
else if(low==='git reset'){next.head=next.commits.at(-2)?.id||'c0';next.branches[next.currentBranch]=next.head;message='HEAD voltou um commit.'}
else{ok=false;message='Comando não reconhecido. Digite help para ver as opções.'}
return{ok,message,state:logged(next,command,message,ok)}}
