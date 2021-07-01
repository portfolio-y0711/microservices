import express, { Application } from 'express'
import path from 'path'
import { Cors } from '../../middleware'

export const StaticWebServer = (() => {
  let app: Application
  const injectApp = (_app: Application) => {
    app = _app
    return {
      injectApp,
      init
    }
  }
  const init = () => {
    app.use(Cors)
    app.get('/api/health', (_: express.Request, res: express.Response) => {
      res.json({ status: 'up' })
    })
    app.use(express.static(path.join(__dirname, '../../../build')))
    return {
      injectApp,
      init
    }
  }
  return {
    injectApp,
    init
  }
})()