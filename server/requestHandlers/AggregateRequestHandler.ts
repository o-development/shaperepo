import IRequestHandler from "./IRequestHandler";
import HtmlRequestHandler from "./HtmlRequestHandler";
import ShexJRequestHandler from "./ShexJRequestHandler";
import ShexCRequestHandler from "./ShexCRequestHandler";
import { Request, Response } from "express";

class AggregateRequestHandler implements IRequestHandler {
  async init(): Promise<void> {
    await Promise.all([
      HtmlRequestHandler,
      ShexJRequestHandler,
      ShexCRequestHandler
    ].map(async (handler) => await handler.init()))
  }

  async handle(_req: Request, res: Response): Promise<void> {
    res.format({
      "text/html": HtmlRequestHandler.handle,
      "application/json+ld": ShexJRequestHandler.handle,
      "application/json": ShexJRequestHandler.handle,
      "text/shex": ShexCRequestHandler.handle,
    })
  }
}

export default new AggregateRequestHandler();
