import { Request, Response } from 'express'

export function getLetters(_req: Request, res: Response) {
  res.json([
    { id: '1', to: 'friend@example.com', body: 'Hello from backend' },
  ])
}
