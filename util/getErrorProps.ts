import BaseProps from "./BaseProps";
import HttpError from "./HttpError";

export default function (err: Error): BaseProps {
  if (!(err as HttpError).status) {
    return { err: new HttpError(500, `Encountered a problem loading the term: ${err.message}`) }
  }
  return { err: err as HttpError }
}