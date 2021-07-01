const express = require('express')
const path = require('path')

module.exports = () => {
    const app = express()

    app.use(express.static(path.join(__dirname, '../../dist')))
    app.get('/api/health', (req, res, next) => {
        res.json({ status: "up" })
    })
    app.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, '../../index.html'))
    })

    return app
}
