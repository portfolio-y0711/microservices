import fs from 'fs'
import path from 'path'
import { getLogger } from './logger'

const { name: _name, version } = (JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')))

module.exports = {
    development: {
        name: _name, 
        version,
        serviceTimeout: 30,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        log: () => getLogger(_name, version, 'debug')
    },
    production: {
        name: _name, 
        version,
        serviceTimeout: 30,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        log: () => getLogger(_name, version, 'info')
    },
    test: {
        name: _name, 
        version,
        serviceTimeout: 30,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        log: () => getLogger(_name, version, 'fatal')
    }
}