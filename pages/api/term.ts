import nextConnect from 'next-connect';
import { Response } from 'express';
import { AugmentedRequest } from 'server/middleware/dbMiddleware';
import HttpError from 'util/HttpError';
import returnError from 'util/returnError';

const handler = nextConnect();

handler.get(async (req: AugmentedRequest, res: Response) => {
  try {
    if (!req.query.id || typeof req.query.id !== "string") {
      throw new HttpError(400, `"${req.query.id}" is an invalid property for id`)
    }
    const termRecord = await req.dbApi.getTerm(req.query.id as string)
    if (!termRecord) {
      throw new HttpError(404, "Term Not Found")
    }
    res.json(termRecord)
  } catch (err) {
    returnError(err, res)
  }
})

export default (req: AugmentedRequest, res: Response) => handler.apply(req, res)