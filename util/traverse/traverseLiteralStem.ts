import { Transformers } from './transformer';
import { LiteralStem } from '../../types/shexTypes';

export default async function traverseLiteralStem(
  value: LiteralStem,
  transformers: Transformers,
): Promise<LiteralStem> {
  if (transformers.literalStem) {
    return await transformers.literalStem(value);
  }
  return value;
}
