
import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200)
  res.json({ name: 'John Doe' })
}
