import { Transformers } from './transformer';
import { LanguageStem } from '../../types/shexTypes';

export default async function traverseLanguageStem(
  value: LanguageStem,
  transformers: Transformers,
): Promise<LanguageStem> {
  if (transformers.languageStem) {
    return await transformers.languageStem(value);
  }
  return value;
}
