import { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import DbApi from "./DbApi";

const mongoConnection = process.env.MONGO_CONNECTION
const mongoDb = process.env.MONGO_DB
if (!mongoConnection || !mongoDb) {
  throw new Error("Environment varialbe \"MONGO_CONNECTION\" and \"MONGO_DB\" must be provided.")
}
const client = new MongoClient(mongoConnection)

export interface AugmentedRequest extends Request {
  dbApi: DbApi
}

export default async function(req: AugmentedRequest, _res: Response, next: NextFunction) {
  if (!client.isConnected()) await client.connect();
  req.dbApi = new DbApi(client.db(mongoDb))
  return next()
}