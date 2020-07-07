import IRequestHandler from "./IRequestHandler";
import { Request, Response } from "express";

class HtmlRequestHandler implements IRequestHandler {
  async init(): Promise<void> {

  }

  async handle(_req: Request, res: Response): Promise<void> {
    res.send("HTML")
  }
}

export default new HtmlRequestHandler();
