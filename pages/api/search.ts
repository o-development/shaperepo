import nextConnect from 'next-connect';
import { Response } from 'express';
import { AugmentedRequest } from 'server/middleware/dbMiddleware';

const handler = nextConnect();

handler.get(async (req: AugmentedRequest, res: Response) => {
  if (!req.query.q || typeof req.query.q !== "string") {
    // TODO: Handle Error
  }
  res.json(await req.dbApi.searchSchema(req.query.q as string))
})

export default (req: AugmentedRequest, res: Response) => handler.apply(req, res)