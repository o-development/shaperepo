import DbApi from "server/middleware/DbApi";

declare global {
  namespace Express {
    interface Request {
      dbApi: DbApi
    }
  }
}