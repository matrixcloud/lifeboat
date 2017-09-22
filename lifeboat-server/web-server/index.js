exports.start = () => {
  const express = require('express')
     , config = require('../config/server.json')
     , app = express()
     , redis = require('redis')
     , redisClient = redis.createClient()
     , uuidv4 = require('uuid/v4')
     , bodyParser = require('body-parser')

  redisClient.on('error', (err) => {
    console.log('redis error: ' + err)
  })

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
  })
  app.use(bodyParser.urlencoded({ extended: false }))

  app.get('/', (req, res) => {
    res.send('ok')
  })

  //===============================================================
  // player
  //===============================================================
  app.post('/players', (req, res) => {

  })

  app.post('/guestLogin', (req, res) => {
    const playerID = uuidv4()
    players.push(playerID)
    res.status(201).json({playerID: playerID})
    // redisClient.rpush('players', playerID)
    // redisClient.lindex('players', -1, (err, r) => {
    //   if (!err) {
    //     res.status(201).json({playerID: r})
    //   } else {
    //     res.status(500).send()
    //   }
    // })
  })

  //===============================================================
  // room
  //===============================================================
  app.get('/rooms', (req, res) => {
    rooms = [
      {id: 1, name: '大魔王的房间1'},
      {id: 2, name: '大魔王的房间2'},
      {id: 3, name: '大魔王的房间3'},
    ]
    res.json(rooms)
  })

  app.post('/rooms', (req, res) => {
    const roomID = uuidv4()
    const room = {
      id: roomID,
      name: req.body.name
    }
    rooms.push(room)

    res.status(201).json({id: roomID})
  })

  app.listen(config.port, () => {
    console.log(`web server listening on port ${config.port}`)
  })
}
