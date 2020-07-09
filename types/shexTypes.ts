export interface Schema {
  "@context"?: "http://www.w3.org/ns/shex.jsonld"
  type: "Schema"
  prefixes?: prefixes
  startActs?: SemAct[]
  start?: shapeExpr
  shapes?: shapes
  imports?: string[]
  base?: string
}

export type prefixes = Record<string, string>
export type shapeExpr = shapeExprObject | string
export type shapeExprObject =
  | ShapeOr
  | ShapeAnd
  | ShapeNot
  | NodeConstraint
  | Shape
  | ShapeRef

export interface ShapeOr { type: "ShapeOr"; shapeExprs: shapeExpr[] }
export interface ShapeAnd { type: "ShapeAnd"; shapeExprs: shapeExpr[] }
export interface ShapeNot { type: "ShapeNot"; shapeExpr: shapeExpr }
export interface ShapeRef {type: "ShapeRef", reference: string }

export interface NodeConstraint {
  type: "NodeConstraint"
  nodeKind?: "iri" | "bnode" | "nonliteral" | "literal"
  values?: valueSetValue[]
  datatype?: string
  length?: number
  minlength?: number
  maxlength?: number
  pattern?: string
  flags?: string
  mininclusive?: number
  minexclusive?: number
  maxinclusive?: number
  maxexclusive?: number
  totaldigits?: number
  fractiondigits?: number
}

export type valueSetValue =
  | objectValue
  | IriStem
  | IriStemRange
  | LiteralStem
  | LiteralStemRange
  | Language
  | LanguageStem
  | LanguageStemRange

export type objectValue = string | ObjectLiteral
export interface ObjectLiteral { value: string; language?: string; type?: string }

export interface IriStem { type: "IriStem"; stem: string }
export interface IriStemRange {
  type: "IriStemRange"
  stem: string | Wildcard
  exclusions: (string | IriStem)[]
}

export interface LiteralStem { type: "LiteralStem"; stem: string }
export interface LiteralStemRange {
  type: "LiteralStemRange"
  stem: string | Wildcard
  exclusions: (string | LiteralStem)[]
}

export interface Language { type: "Language"; languageTag: string }
export interface LanguageStem { type: "LanguageStem"; stem: string }
export interface LanguageStemRange {
  type: "LanguageStemRange"
  stem: string | Wildcard
  exclusions: (string | LanguageStem)[]
}

export interface Wildcard { type: "Wildcard" }

export type shapes = Record<string, shapeExprObject>
export interface Shape {
  type: "Shape"
  closed?: boolean
  extra?: string[]
  expression?: tripleExpr
  semActs?: SemAct[]
  annotations?: Annotation[]
}

export type tripleExpr = tripleExprObject | string
export type tripleExprObject = EachOf | OneOf | TripleConstraint

export interface EachOf {
  type: "EachOf"
  id?: string
  expressions: tripleExpr[]
  min?: number
  max?: number
  semActs?: SemAct[]
  annotations?: Annotation[]
}

export interface OneOf {
  type: "OneOf"
  id?: string
  expressions: tripleExpr[]
  min?: number
  max?: number
  semActs?: SemAct[]
  annotations?: Annotation[]
}

export interface TripleConstraint {
  type: "TripleConstraint"
  id?: string
  inverse?: boolean
  predicate: string
  valueExpr?: shapeExpr
  min?: number
  max?: number
  semActs?: SemAct[]
  annotations?: Annotation[]
}

export interface SemAct { type: "SemAct"; name: string; code?: string }
export interface Annotation<O = objectValue> {
  type: "Annotation"
  predicate: string
  object: O
}
