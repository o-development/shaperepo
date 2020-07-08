import { AugmentedRequest } from "server/middleware/dbMiddleware";
import { NextPageContext } from "next";

export interface AugmentedNextPageContext extends NextPageContext {
  req?: AugmentedRequest
}

export function getBaseUrl(req?: AugmentedRequest) {
  return req ? `${req.protocol}://${req.get("Host")}` : ""
}