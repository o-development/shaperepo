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
      "text/html": (req: Request, res: Response) => HtmlRequestHandler.handle(req, res),
      "application/json+ld": (req: Request, res: Response) => ShexJRequestHandler.handle(req, res),
      "application/json": (req: Request, res: Response) => ShexJRequestHandler.handle(req, res),
      "text/shex": (req: Request, res: Response) => ShexCRequestHandler.handle(req, res),
      "default": (req: Request, res: Response) => HtmlRequestHandler.handle(req, res),
    })
  }
}

export default new AggregateRequestHandler();
