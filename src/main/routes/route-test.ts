import { Router } from 'express'

export default (route: Router): void => {
  route.get('/teste', (req, res) => {
    res.json({ ok: true })
  })
}
