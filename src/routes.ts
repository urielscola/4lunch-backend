import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => {
  console.log('req.io: ', req.io)
  return res.json({ foi: true })
})

export default routes
