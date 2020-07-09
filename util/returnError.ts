import { Response } from "express";
import HttpError from "./HttpError"

export default async function(error: HttpError, res: Response) {
  console.log(error.stack)
  if (error.status) {
    res.status(error.status)
  } else {
    res.status(500)
  }
  res.format({
    "text/plain": () => res.send(error.message),
    "application/json": () => res.json({ error: error.message }),
    "application/json+ld": () => res.json({ error: error.message }),
    "default": () => res.send(error.message)
  })
}