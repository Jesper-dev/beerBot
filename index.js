const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const list = require('./firebase')

app.get('/api/list', (req, res) => {
    res.send({
        list
    })
})

app.get('/api/:name', (req, res) => {
    const beer = list.find(x => x.name === req.params.name)
    res.send(beer)
})

app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`)
})