import { ShapeOr, shapeExpr } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseShapeExpr from './traverseShapeExpr';

export default async function traverseShapeOr(
  schema: ShapeOr,
  transformers: Transformers,
): Promise<ShapeOr> {
  return await traverseObject<ShapeOr>(
    schema,
    {
      shapeExprs: async (d) =>
        await traverseShapeExpr(d as shapeExpr, transformers),
    },
    transformers.shapeOr,
  );
}
