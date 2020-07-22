import { LiteralStemRange, LiteralStem } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseLiteralStem from './traverseLiteralStem';

export default async function traverseLiteralStemRange(
  schema: LiteralStemRange,
  transformers: Transformers,
): Promise<LiteralStemRange> {
  return await traverseObject(
    schema,
    {
      exclusions: async (d) =>
        typeof d !== 'string'
          ? await traverseLiteralStem(d as LiteralStem, transformers)
          : d,
    },
    transformers.literalStemRange,
  );
}
