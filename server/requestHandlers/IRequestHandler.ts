import { Request, Response, NextFunction } from "express";

export default interface IRequestHandler {
  init(): Promise<void>;
  handle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
