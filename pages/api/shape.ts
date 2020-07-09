import nextConnect from 'next-connect';
import { Response } from 'express';
import { AugmentedRequest } from 'server/middleware/dbMiddleware';
import returnError from 'util/returnError';
import HttpError from 'util/HttpError';

const handler = nextConnect();

handler.get(async (req: AugmentedRequest, res: Response) => {
  try {
    if (!req.query.id || typeof req.query.id !== "string") {
      throw new HttpError(400, `"${req.query.id}" is an invalid value for id`)
    }
    const schemaRecord = await req.dbApi.getSchema(req.query.id as string)
    if (!schemaRecord) {
      throw new HttpError(404, "Schema Not Found")
    }
    res.json(schemaRecord)
  } catch (err) {
    return returnError(err, res)
  }
})

export default (req: AugmentedRequest, res: Response) => handler.apply(req, res)