import { ShapeNot, shapeExpr } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseShapeExpr from './traverseShapeExpr';

export default async function traverseShapeNot(
  shapeNot: ShapeNot,
  transformers: Transformers,
): Promise<ShapeNot> {
  return (await traverseObject(
    shapeNot,
    {
      shapeExprs: async (d) =>
        await traverseShapeExpr(d as shapeExpr, transformers),
    },
    transformers.shapeNot,
  )) as ShapeNot;
}
