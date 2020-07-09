import nextConnect from 'next-connect';
import { Response } from 'express';
import { AugmentedRequest } from 'server/middleware/dbMiddleware';
import HttpError from 'util/HttpError';
import returnError from 'util/returnError';

const handler = nextConnect();

handler.get(async (req: AugmentedRequest, res: Response) => {
  try {
    if (!req.query.q || typeof req.query.q !== "string") {
      throw new HttpError(400, `${req.query.q} is not a valid value for "q"`)
    }
    res.json(await req.dbApi.searchSchema(req.query.q as string))
  } catch (err) {
    return returnError(err, res)
  }
})

export default (req: AugmentedRequest, res: Response) => handler.apply(req, res)