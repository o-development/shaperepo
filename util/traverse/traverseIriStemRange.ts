import { IriStemRange, IriStem } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseIriStem from './traverseIriStem';

export default async function traverseIriStemRange(
  schema: IriStemRange,
  transformers: Transformers,
): Promise<IriStemRange> {
  return await traverseObject<IriStemRange>(
    schema,
    {
      exclusions: async (d) => (typeof d !== 'string' ? await traverseIriStem(d as IriStem, transformers) : d),
    },
    transformers.iriStemRange,
  );
}
