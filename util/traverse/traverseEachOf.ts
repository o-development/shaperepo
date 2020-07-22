import { EachOf, tripleExpr, SemAct, Annotation } from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traverseTripleExpr from './traverseTripleExpr';
import traverseSemAct from './traverseSemAct';
import traverseAnnotation from './traverseAnnotation';

export default async function traverseEachOf(eachOf: EachOf, transformers: Transformers): Promise<EachOf> {
  return await traverseObject<EachOf>(
    eachOf,
    {
      expressions: async (d) => await traverseTripleExpr(d as tripleExpr, transformers),
      semActs: async (d) => await traverseSemAct(d as SemAct, transformers),
      annotations: async (d) => await traverseAnnotation(d as Annotation, transformers),
    },
    transformers.eachOf,
  );
}
