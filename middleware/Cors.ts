import CorsLibrary from 'cors';
import { IncomingMessage, ServerResponse } from 'http';
import runMiddleware from './RunMiddleware';

const cors = CorsLibrary({
  methods: ['GET', 'HEAD'],
});

export default async function Cors(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  await runMiddleware(req, res, cors);
}
