import dotEnv from 'dotenv'

import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import cors from 'cors'
import socketIo from 'socket.io'

import routes from './routes'
dotEnv.config()

class Server {
  public express: express.Application;

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())

    const serverIo = http.Server(this.express)
    const io = socketIo(serverIo)

    this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      req.io = io
      return next()
    })
  }

  private database (): void {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new Server().express
