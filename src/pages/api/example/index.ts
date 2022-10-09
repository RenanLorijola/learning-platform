import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: 'example' })
}
