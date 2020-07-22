import HttpError from './HttpError';
import { ProjectResponse } from '../middleware/ReqRes';

export default async function (
  error: HttpError,
  res: ProjectResponse,
): Promise<void> {
  console.error(error.stack);
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({ error: error.message });
  // res.format({
  //   "text/plain": () => res.send(error.message),
  //   "application/json": () => res.json({ error: error.message }),
  //   "application/json+ld": () => res.json({ error: error.message }),
  //   "default": () => res.send(error.message)
  // })
}
