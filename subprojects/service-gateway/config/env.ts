import dotenv from 'dotenv'
import { cleanEnv } from 'envalid'
import { str } from 'envalid'
import { num } from 'envalid'
// import { host } from 'envalid'

dotenv.config({
    path: 'config/.env'
})

const env = cleanEnv(process.env, {
    SECRET: str(),
    PORT: num(),
    CORS_ORIGIN: str(),
    // DOMAIN: host()
})

export default env