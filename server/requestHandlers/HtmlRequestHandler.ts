import IRequestHandler from "./IRequestHandler";
import { Request, Response } from "express";
import { parse, UrlWithParsedQuery } from 'url'
import next from 'next'
import Server from "next/dist/next-server/server/next-server";
import { IncomingMessage, ServerResponse } from "http";

const dev = process.env.NODE_ENV !== "production";

class HtmlRequestHandler implements IRequestHandler {
  private app: Server
  private handler: (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlWithParsedQuery | undefined) => Promise<void>

  constructor() {
    this.app = next({ dev })
    this.handler = this.app.getRequestHandler()
  }

  async init(): Promise<void> {
    await this.app.prepare()
  }

  async handle(req: Request, res: Response): Promise<void> {
    const parsedUrl = parse(req.url!, true)
    await this.handler(req, res, parsedUrl)
  }
}

export default new HtmlRequestHandler();
