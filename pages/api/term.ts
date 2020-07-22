import nextConnect from 'next-connect';
import HttpError from '../../util/HttpError';
import returnError from '../../util/returnError';
import { ProjectResponse, ProjectRequest } from '../../middleware/ReqRes';
import getDbApi from '../../middleware/dbMiddleware';

const handler = nextConnect();

handler.get(async (req: ProjectRequest, res: ProjectResponse) => {
  try {
    const dbApi = await getDbApi();
    if (!req.query.id || typeof req.query.id !== 'string') {
      throw new HttpError(
        400,
        `"${req.query.id}" is an invalid property for id`,
      );
    }
    const termRecord = await dbApi.getTerm(req.query.id as string);
    if (!termRecord) {
      throw new HttpError(404, 'Term Not Found');
    }
    res.json(termRecord);
  } catch (err) {
    returnError(err, res);
  }
});

export default (req: ProjectRequest, res: ProjectResponse): Promise<void> =>
  handler.apply(req, res);
