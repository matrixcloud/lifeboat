exports.start = () => {
  const express = require('express')
     , config = require('../config/server.json')
     , app = express()

  app.get('/', (req, res) => {
    res.send('ok')
  })

  //===============================================================
  // player
  //===============================================================
  app.post('/players', (req, res) => {

  })

  //===============================================================
  // room
  //===============================================================
  app.get('/rooms', (req, res) => {

  })

  app.post('/rooms', (req, res) => {

  })

  app.listen(config.port, () => {
    console.log(`web server listening on port ${config.port}`)
  })
}
