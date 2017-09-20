var handler = {
  '__connect__': new OnConnect(),
  '__connect__': new OnDisConnect(),
  'ping': new OnPing()
}

function OnConnect() {
  this.handle = (data) => {
    console.log('a client connect: ' + 'heartbeatHanlder')
  }
}

function OnDisConnect() {
  this.handle = (data) => {
    console.log('a client disconnect: ' + 'heartbeatHanlder')
  }
}

function OnPing() {
  this.handle = (data, socket) => {
    socket.emit('pong')
  }
}

module.exports = handler
