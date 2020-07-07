import { Request, Response } from "express";

export default interface IRequestHandler {
  init(): Promise<void>;
  handle(req: Request, res: Response): Promise<void>;
}
