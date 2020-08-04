import HttpError from './HttpError';
import { ProjectResponse } from '../middleware/ReqRes';
import { ServerResponse } from 'http';

export default async function returnError(
  error: HttpError,
  res: ProjectResponse | ServerResponse,
): Promise<void> {
  if (error.status) {
    res.statusCode = error.status;
  } else {
    res.statusCode = 500;
  }
  res.write(JSON.stringify({ message: error.message }));
  res.end();
  // res.format({
  //   "text/plain": () => res.send(error.message),
  //   "application/json": () => res.json({ error: error.message }),
  //   "application/json+ld": () => res.json({ error: error.message }),
  //   "default": () => res.send(error.message)
  // })
}
