import { Transformers } from './transformer';
import { IriStem } from '../../types/shexTypes';

export default async function traverseIriStem(value: IriStem, transformers: Transformers): Promise<IriStem> {
  if (transformers.iriStem) {
    return await transformers.iriStem(value);
  }
  return value;
}
