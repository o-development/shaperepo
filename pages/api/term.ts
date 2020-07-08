import nextConnect from 'next-connect';
import { Response } from 'express';
import { AugmentedRequest } from 'server/middleware/dbMiddleware';

const handler = nextConnect();

handler.get(async (req: AugmentedRequest, res: Response) => {
  console.log(req.query)
  res.send({ term: "Cool Stuff" })
})

export default (req: AugmentedRequest, res: Response) => handler.apply(req, res)