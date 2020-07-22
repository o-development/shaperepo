import {
  TripleConstraint,
  shapeExpr,
  SemAct,
  Annotation,
} from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseSemAct from './traverseSemAct';
import traverseAnnotation from './traverseAnnotation';
import traverseShapeExpr from './traverseShapeExpr';

export default async function traverseTripleConstraint(
  tc: TripleConstraint,
  transformers: Transformers,
): Promise<TripleConstraint> {
  return await traverseObject<TripleConstraint>(
    tc,
    {
      valueExpr: async (d) =>
        await traverseShapeExpr(d as shapeExpr, transformers),
      semActs: async (d) => await traverseSemAct(d as SemAct, transformers),
      annotations: async (d) =>
        await traverseAnnotation(d as Annotation, transformers),
    },
    transformers.tripleConstraint,
  );
}
