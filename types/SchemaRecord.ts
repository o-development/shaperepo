import { Schema } from "./shexTypes";
import SchemaMetadata from "./SchemaMetadata";

export default interface SchemaRecord extends Schema {
  _id: string,
  metadata: SchemaMetadata
}