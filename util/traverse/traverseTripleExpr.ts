import { tripleExpr } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseEachOf from './traverseEachOf';
import traverseOneOf from './traverseOneOf';
import traverseTripleConstraint from './traverseTipleConstraint';

export default async function traverseTripleExpr(
  expr: tripleExpr,
  transformers: Transformers,
): Promise<tripleExpr> {
  let value;
  if (typeof expr === 'string') {
    value = expr;
  } else {
    switch (expr.type) {
      case 'EachOf':
        value = await traverseEachOf(expr, transformers);
        break;
      case 'OneOf':
        value = await traverseOneOf(expr, transformers);
        break;
      case 'TripleConstraint':
        value = await traverseTripleConstraint(expr, transformers);
        break;
    }
  }

  if (transformers.tripleExpr) {
    return await transformers.tripleExpr(value);
  }
  return value;
}
