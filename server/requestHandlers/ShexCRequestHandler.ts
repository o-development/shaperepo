import IRequestHandler from "./IRequestHandler";
import { Request, Response } from "express";

class ShexCRequestHandler implements IRequestHandler {
  async init(): Promise<void> {

  }

  async handle(_req: Request, res: Response): Promise<void> {
    res.send("ShexC")
  }
}

export default new ShexCRequestHandler();
