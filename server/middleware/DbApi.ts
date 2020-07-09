import { Db, Collection } from "mongodb"
import TermRecord from "types/TermRecord"
import SchemaRecord from "types/SchemaRecord"
import SchemaMetadata from "types/SchemaMetadata"

export default class DbApi {
  // @ts-ignore
  private shapeCollection: Collection
  // @ts-ignore
  private termCollection: Collection

  constructor(db: Db) {
    this.shapeCollection = db.collection("shapes")
    this.termCollection = db.collection("terms")
  }

  async getTerm(id: string): Promise<TermRecord> {
    return (await this.termCollection.findOne({ _id: id })) as TermRecord
  }

  async getSchema(_id: string): Promise<SchemaRecord> {
    throw new Error("Not Implemented");
  }

  async searchSchema(_text: string): Promise<SchemaMetadata[]> {
    throw new Error("Not Implemented");
  }
}