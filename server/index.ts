import express, { RequestHandler } from "express";
import AggregateRequestHandler from "./requestHandlers/AggregateRequestHandler";
import dbMiddleware from "./middleware/dbMiddleware";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

async function run() {
  const app = express();

  await AggregateRequestHandler.init()

  app.use(dbMiddleware as RequestHandler)
  app.use(AggregateRequestHandler.handle);

  app.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
}

run()
