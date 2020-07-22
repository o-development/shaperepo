import {
  Schema,
  prefixes,
  SemAct,
  shapeExpr,
  shapes,
  ShapeOr,
  ShapeAnd,
  ShapeNot,
  ShapeRef,
  NodeConstraint,
  Shape,
  valueSetValue,
  tripleExpr,
  Annotation,
  EachOf,
  OneOf,
  TripleConstraint,
  ObjectLiteral,
  IriStem,
  IriStemRange,
  LiteralStem,
  LiteralStemRange,
  Language,
  LanguageStem,
  LanguageStemRange,
} from '../../types/shexTypes';

export type transformer<D> = (data: D) => Promise<D>;

export interface Transformers {
  schema?: transformer<Schema>;
  prefixes?: transformer<prefixes>;
  semAct?: transformer<SemAct>;
  shapeExpr?: transformer<shapeExpr>;
  shapes?: transformer<shapes>;
  shapeOr?: transformer<ShapeOr>;
  shapeAnd?: transformer<ShapeAnd>;
  shapeNot?: transformer<ShapeNot>;
  shapeRef?: transformer<ShapeRef>;
  nodeConstraint?: transformer<NodeConstraint>;
  shape?: transformer<Shape>;
  valueSetValue?: transformer<valueSetValue>;
  tripleExpr?: transformer<tripleExpr>;
  annotation?: transformer<Annotation>;
  eachOf?: transformer<EachOf>;
  oneOf?: transformer<OneOf>;
  tripleConstraint?: transformer<TripleConstraint>;
  objectLiteral?: transformer<ObjectLiteral>;
  iriStem?: transformer<IriStem>;
  iriStemRange?: transformer<IriStemRange>;
  literalStem?: transformer<LiteralStem>;
  literalStemRange?: transformer<LiteralStemRange>;
  language?: transformer<Language>;
  languageStem?: transformer<LanguageStem>;
  languageStemRange?: transformer<LanguageStemRange>;
}
