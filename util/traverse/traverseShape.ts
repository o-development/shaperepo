import { Shape, tripleExpr, SemAct, Annotation } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseSemAct from './traverseSemAct';
import traverseTripleExpr from './traverseTripleExpr';
import traverseAnnotation from './traverseAnnotation';

export default async function traverseShape(
  shape: Shape,
  transformers: Transformers,
): Promise<Shape> {
  return await traverseObject<Shape>(
    shape,
    {
      expression: async (d) =>
        await traverseTripleExpr(d as tripleExpr, transformers),
      semActs: async (d) => await traverseSemAct(d as SemAct, transformers),
      annotations: async (d) =>
        await traverseAnnotation(d as Annotation, transformers),
    },
    transformers.shape,
  );
}
