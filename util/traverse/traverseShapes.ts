import { shapes, shapeExprObject } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseShapeExpr from './traverseShapeExpr';

export default async function traverseShapes(
  shapeCollection: shapes,
  transformers: Transformers,
): Promise<shapes> {
  const newShapeCollection: shapes = {};
  await Promise.all(
    Object.keys(shapeCollection).map(async (key) => {
      newShapeCollection[key] = (await traverseShapeExpr(
        shapeCollection[key],
        transformers,
      )) as shapeExprObject;
    }),
  );

  if (transformers.shapes) {
    return await transformers.shapes(shapeCollection);
  }
  return shapeCollection;
}
