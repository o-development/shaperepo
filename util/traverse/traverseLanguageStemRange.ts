import { LanguageStemRange, LanguageStem } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseLanguageStem from './traverseLanguageStem';

export default async function traverseLanguageStemRange(
  schema: LanguageStemRange,
  transformers: Transformers,
): Promise<LanguageStemRange> {
  return await traverseObject<LanguageStemRange>(
    schema,
    {
      exclusions: async (d) =>
        typeof d !== 'string' ? await traverseLanguageStem(d as LanguageStem, transformers) : d,
    },
    transformers.languageStemRange,
  );
}
