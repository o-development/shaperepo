import HttpError from "./HttpError";

export default interface BaseProps {
  err?: {
    status: number,
    message: string
  }
}