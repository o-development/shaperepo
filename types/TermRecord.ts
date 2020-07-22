import Reference from './Reference';

export default interface TermRecord {
  _id: string;
  label: string;
  incomingPredicateReferences: Reference[];
  incomingObjectReferences: Reference[];
}
