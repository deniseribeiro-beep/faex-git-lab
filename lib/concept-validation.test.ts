import {describe,expect,it} from 'vitest';
import {evaluateConceptAnswer} from './concept-validation';

describe('validação de respostas conceituais',()=>{
  const scrum=['sprint','daily','diária','revisão','retrospectiva'];
  it('aceita um evento curto correto',()=>expect(evaluateConceptAnswer('Daily',scrum)).toBe('matched'));
  it('ignora acentos e aceita o exemplo em português',()=>expect(evaluateConceptAnswer('Reunião diária',scrum)).toBe('matched'));
  it('aceita variações livres com ressalva',()=>expect(evaluateConceptAnswer('refinamento do backlog',scrum)).toBe('review'));
  it('pede mais conteúdo apenas para respostas mínimas',()=>expect(evaluateConceptAnswer('oi',scrum)).toBe('too-short'));
});

