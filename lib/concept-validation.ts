export type ConceptAnswerResult='too-short'|'matched'|'review';

const normalize=(value:string)=>value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();

export function evaluateConceptAnswer(value:string,keywords:string[]):ConceptAnswerResult{
  const answer=normalize(value);
  if(answer.length<4)return 'too-short';
  return keywords.some(keyword=>answer.includes(normalize(keyword)))?'matched':'review';
}

