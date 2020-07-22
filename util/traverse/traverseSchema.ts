import {
  Schema,
  prefixes,
  SemAct,
  shapeExpr,
  shapes,
} from '../../types/shexTypes';
import { Transformers } from './transformer';
import traverseObject from '../../util/traverseObject';
import traversePrefixes from './traversePrefixes';
import traverseSemAct from './traverseSemAct';
import traverseShapeExpr from './traverseShapeExpr';
import traverseShapes from './traverseShapes';

export default async function traverseSchema(
  schema: Schema,
  transformers: Transformers,
): Promise<Schema> {
  return await traverseObject<Schema>(
    schema,
    {
      prefixes: async (d) =>
        await traversePrefixes(d as prefixes, transformers),
      startActs: async (d) => await traverseSemAct(d as SemAct, transformers),
      start: async (d) => await traverseShapeExpr(d as shapeExpr, transformers),
      shapes: async (d) => await traverseShapes(d as shapes, transformers),
    },
    transformers.schema,
  );
}
