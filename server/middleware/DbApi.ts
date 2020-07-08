import { Db, Collection } from "mongodb"

export default class DbApi {
  // @ts-ignore
  private shapeCollection: Collection
  // @ts-ignore
  private termCollection: Collection

  constructor(db: Db) {
    this.shapeCollection = db.collection("shapes")
    this.termCollection = db.collection("terms")
  }
}