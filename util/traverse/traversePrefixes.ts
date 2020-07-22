import { prefixes } from '../../types/shexTypes';
import { Transformers } from './transformer';

export default async function traversePrefixes(
  pref: prefixes,
  transformers: Transformers,
): Promise<prefixes> {
  if (transformers.prefixes) {
    return await transformers.prefixes(pref);
  }
  return pref;
}
