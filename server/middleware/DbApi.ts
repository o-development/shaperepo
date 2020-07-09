import { Db, Collection } from "mongodb";
import TermRecord from "types/TermRecord";
import SchemaRecord from "types/SchemaRecord";
import SchemaMetadata from "types/SchemaMetadata";

export default class DbApi {
  // @ts-ignore
  private shapeCollection: Collection<SchemaRecord>;
  // @ts-ignore
  private termCollection: Collection<TermRecord>;

  constructor(db: Db) {
    this.shapeCollection = db.collection("shapes");
    this.termCollection = db.collection("terms");
  }

  async getTerm(id: string): Promise<TermRecord | null> {
    return await this.termCollection.findOne({ _id: id });
  }

  async getSchema(id: string): Promise<SchemaRecord | null> {
    return (await this.shapeCollection.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "terms",
          localField: "metadata.outgoingPredicateReferences",
          foreignField: "_id",
          as: "metadata.outgoingPredicateReferences",
        },
      },
      {
        $lookup: {
          from: "terms",
          localField: "metadata.outgoingObjectReferences",
          foreignField: "_id",
          as: "metadata.outgoingObjectReferences",
        },
      },
    ]).toArray())[0];
  }

  async searchSchema(text: string): Promise<SchemaMetadata[]> {
    const results = await this.shapeCollection.find({ $text: { $search: text } }).toArray()
    return results.map((result) => result.metadata)
  }
}
