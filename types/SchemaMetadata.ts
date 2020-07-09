import Reference from "./Reference";

export default interface SchemaMetadata {
  id: string,
  label: string,
  incomingReferences: Reference[],
  outgoingPredicateReferences: Reference[],
  outgoingObjectReferences: Reference[]
}