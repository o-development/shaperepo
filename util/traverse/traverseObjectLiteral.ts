import { Transformers } from './transformer';
import { ObjectLiteral } from '../../types/shexTypes';

export default async function traverseObjectLiteral(
  value: ObjectLiteral,
  transformers: Transformers,
): Promise<ObjectLiteral> {
  if (transformers.objectLiteral) {
    return await transformers.objectLiteral(value);
  }
  return value;
}
