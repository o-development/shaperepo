import { MongoClient } from 'mongodb';
import DbApi from './DbApi';

const mongoConnection = process.env.MONGO_CONNECTION;
const mongoDb = process.env.MONGO_DB;
if (!mongoConnection || !mongoDb) {
  throw new Error(
    'Environment varialbe "MONGO_CONNECTION" and "MONGO_DB" must be provided.',
  );
}
const client = new MongoClient(mongoConnection, {
  useUnifiedTopology: true,
});

export default async function getDbApi(): Promise<DbApi> {
  if (!client.isConnected()) await client.connect();
  return new DbApi(client.db(mongoDb));
}
