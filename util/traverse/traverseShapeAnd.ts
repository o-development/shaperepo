import { ShapeAnd, shapeExpr } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseShapeExpr from './traverseShapeExpr';

export default async function traverseShapeAnd(
  schema: ShapeAnd,
  transformers: Transformers,
): Promise<ShapeAnd> {
  return await traverseObject<ShapeAnd>(
    schema,
    {
      shapeExprs: async (d) =>
        await traverseShapeExpr(d as shapeExpr, transformers),
    },
    transformers.shapeAnd,
  );
}
