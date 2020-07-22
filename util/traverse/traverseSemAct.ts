import { SemAct } from '../../types/shexTypes';
import { Transformers } from './transformer';

export default async function traverseSemAct(
  semAct: SemAct,
  transformers: Transformers,
): Promise<SemAct> {
  if (transformers.semAct) {
    return await transformers.semAct(semAct);
  }
  return semAct;
}
