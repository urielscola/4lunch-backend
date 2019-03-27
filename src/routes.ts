import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => res.json({ foi: true }))

export default routes
