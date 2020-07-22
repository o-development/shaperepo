import { ShapeRef } from '../../types/shexTypes';
import { Transformers } from './transformer';

export default async function traverseShapeRef(
  shapeRef: ShapeRef,
  transformers: Transformers,
): Promise<ShapeRef> {
  if (transformers.shapeRef) {
    return await transformers.shapeRef(shapeRef);
  }
  return shapeRef;
}
