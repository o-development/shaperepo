import nextConnect from 'next-connect';
import returnError from '../../util/returnError';
import HttpError from '../../util/HttpError';
import { ProjectResponse, ProjectRequest } from '../../middleware/ReqRes';
import getDbApi from '../../middleware/dbMiddleware';

const handler = nextConnect();

handler.get(async (req: ProjectRequest, res: ProjectResponse) => {
  try {
    const dbApi = await getDbApi();
    if (!req.query.id || typeof req.query.id !== 'string') {
      throw new HttpError(400, `"${req.query.id}" is an invalid value for id`);
    }
    const schemaRecord = await dbApi.getSchema(req.query.id as string);
    if (!schemaRecord) {
      throw new HttpError(404, 'Schema Not Found');
    }
    res.json(schemaRecord);
  } catch (err) {
    return returnError(err, res);
  }
});

export default (req: ProjectRequest, res: ProjectResponse): Promise<void> =>
  handler.apply(req, res);
