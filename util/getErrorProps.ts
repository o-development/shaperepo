import BaseProps from './BaseProps';
import HttpError from './HttpError';
import { ServerResponse } from 'http';

export default function (err: Error, res?: ServerResponse): BaseProps {
  let props;
  if (!(err as HttpError).status) {
    props = {
      err: {
        status: 500,
        message: `Encountered a problem: ${err.message}`,
      },
    };
  } else {
    props = {
      err: {
        status: (err as HttpError).status,
        message: (err as HttpError).message,
      },
    };
  }

  if (res) {
    res.statusCode = props.err.status;
  }
  return props;
}
