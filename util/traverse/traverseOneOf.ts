import { OneOf, tripleExpr, SemAct, Annotation } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseTripleExpr from './traverseTripleExpr';
import traverseSemAct from './traverseSemAct';
import traverseAnnotation from './traverseAnnotation';

export default async function traverseOneOf(
  oneOf: OneOf,
  transformers: Transformers,
): Promise<OneOf> {
  return await traverseObject<OneOf>(
    oneOf,
    {
      expressions: async (d) =>
        await traverseTripleExpr(d as tripleExpr, transformers),
      semActs: async (d) => await traverseSemAct(d as SemAct, transformers),
      annotations: async (d) =>
        await traverseAnnotation(d as Annotation, transformers),
    },
    transformers.oneOf,
  );
}
