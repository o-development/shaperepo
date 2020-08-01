import { IncomingMessage, ServerResponse } from 'http';

export default function runMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  fn: (
    req: IncomingMessage,
    res: ServerResponse,
    cb: (result: unknown) => unknown,
  ) => void,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
