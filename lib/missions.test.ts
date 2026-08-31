import {describe,expect,it} from 'vitest';
import {missions} from './missions';
describe('contexto prático das missões Git',()=>{
 it('explica a utilidade diária de cada comando',()=>{const steps=missions.filter(m=>m.type==='git').flatMap(m=>m.steps);expect(steps.length).toBeGreaterThan(0);expect(steps.every(step=>step.why&&step.why.length>35)).toBe(true)});
});
