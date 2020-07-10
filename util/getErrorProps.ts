import BaseProps from "./BaseProps";
import HttpError from "./HttpError";

export default function (err: Error): BaseProps {
  if (!(err as HttpError).status) {
    return { 
      err: {
        status: 500,
        message: `Encountered a problem: ${err.message}`
      }
    }
  }
  return {
    err: {
      status: (err as HttpError).status,
      message: (err as HttpError).message
    }
  }
}