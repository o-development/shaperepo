import IRequestHandler from "./IRequestHandler";
import { Request, Response } from "express";

class ShexJRequestHandler implements IRequestHandler {
  async init(): Promise<void> {

  }

  async handle(_req: Request, res: Response): Promise<void> {
    res.send("ShexJ")
  }
}

export default new ShexJRequestHandler();
