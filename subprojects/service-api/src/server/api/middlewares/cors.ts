import { IConfig } from 'config'
import cors from 'cors'

export const Cors = (
  config: IConfig,
): ((
  req: cors.CorsRequest,
  res: {
    statusCode?: number
    setHeader(key: string, value: string): any
    end(): any
  },
  next: (err?: any) => any,
) => void) =>
  cors({
    ...config.server.cors_,
  })
