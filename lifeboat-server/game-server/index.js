var io = require('socket.io')(3000)
, handlers = require('./src/handlers')

io.on('connection', (socket) => {
socket.on('disconnect', () => {
  console.log('client disconnected')
})
handlers.forEach(handler => {
  for(let key in handler) {
    socket.on(key, data => handler[key].handle(data, socket))
  }
})
})

console.log('game server listening on port: 3000')
