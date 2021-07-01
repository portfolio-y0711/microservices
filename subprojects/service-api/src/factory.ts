import express from 'express'
import { IConfig } from '../config/index'
import { Logger } from '@feed/server/api/middlewares'
import { ErrorLogger } from '@feed/server/api/middlewares/logger'

export const createLoggers = (
  config: IConfig,
): [express.RequestHandler, any] => {
  return [Logger(config), ErrorLogger]
}
