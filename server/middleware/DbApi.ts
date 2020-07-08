import { Db, Collection } from "mongodb"

export default class DbApi {
  private shapeCollection: Collection
  private termCollection: Collection

  constructor(db: Db) {
    this.shapeCollection = db.collection("shapes")
    this.termCollection = db.collection("terms")
  }
}