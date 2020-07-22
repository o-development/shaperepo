import { Transformers } from './transformer';
import { Language } from '../../types/shexTypes';

export default async function traverseLanguage(value: Language, transformers: Transformers): Promise<Language> {
  if (transformers.language) {
    return await transformers.language(value);
  }
  return value;
}
