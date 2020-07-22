import HttpError from '../../util/HttpError';
import returnError from '../../util/returnError';
import { ProjectResponse, ProjectRequest } from '../../middleware/ReqRes';
import getDbApi from '../../middleware/dbMiddleware';

export default async function (
  req: ProjectRequest,
  res: ProjectResponse,
): Promise<void> {
  console.log(res);
  try {
    const dbApi = await getDbApi();
    if (!req.query.q || typeof req.query.q !== 'string') {
      throw new HttpError(400, `${req.query.q} is not a valid value for "q"`);
    }
    if (req.query.q === '_all') {
      res.json(await dbApi.allSchemas());
    }
    res.json(await dbApi.searchSchema(req.query.q as string));
  } catch (err) {
    return returnError(err, res);
  }
}
