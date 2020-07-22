import { shapeExpr } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseShapeOr from './traverseShapeOr';
import traverseShapeAnd from './traverseShapeAnd';
import traverseShapeNot from './traverseShapeNot';
import traverseNodeConstraint from './traverseNodeConstraint';
import traverseShape from './traverseShape';
import traverseShapeRef from './traverseShapeRef';

export default async function traverseShapeExpr(
  expr: shapeExpr,
  transformers: Transformers,
): Promise<shapeExpr> {
  let value;
  if (typeof expr === 'string') {
    value = expr;
  } else {
    switch (expr.type) {
      case 'ShapeOr':
        value = await traverseShapeOr(expr, transformers);
        break;
      case 'ShapeAnd':
        value = await traverseShapeAnd(expr, transformers);
        break;
      case 'ShapeNot':
        value = await traverseShapeNot(expr, transformers);
        break;
      case 'NodeConstraint':
        value = await traverseNodeConstraint(expr, transformers);
        break;
      case 'Shape':
        value = await traverseShape(expr, transformers);
        break;
      case 'ShapeRef':
        value = await traverseShapeRef(expr, transformers);
        break;
    }
  }

  if (transformers.shapeExpr) {
    return await transformers.shapeExpr(value);
  }
  return value;
}
