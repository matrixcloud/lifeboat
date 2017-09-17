cc.Class({
  extends: cc.Component,

  statics: {
    host: null,
    socket: null,
    isPinging: false,
    handlers: {},
    onDisconnect: null,

    addHandler(event, cb) {
      if (this.handlers[event]) {
        return console.warn(`event: ${event} handler has been registered.`)
      }

      const handler = (data) => {
        if (event != 'disconnect' && typeof(data) === 'string') {
          data = JSON.parse(data)
        }
        cb(data)
      }

      this.handlers[event] = handler
      if (this.socket) {
        console.log(`register handler on ${event}`)
        socket.on(event, handler)
      }
    },

    connect(cb) {
      let socket = io(this.host)

      socket.on('connect_error', (err) => {
        if(cb) cb(err, null)
      })

      socket.on('connect', (data) => {
        console.log(this.socket)
        this.socket.connected = true
        if(cb) cb(null, data)
      })

      socket.on('disconnect', (data) => {
        this.socket.connected = false
        this.socket.close()
      })

      for(let key in this.handlers) {
        const value = this.handlers[key]
        if (typeof(value) === 'function') {
          console.log(`register handler: ${key}`)
          socket.on(key, value)
        }
      }

      this.socket = socket
      // this.startHeartBeat()
    },

    startHeartBeat() {
      this.socket.on('pong', () => {
        this.lastRecvTime = Date.now()
        this.delayMS = this.lastRecvTime - this.lastSendTime
        console.log(`delay: ${this.delayMS} ms`)
      })
      this.lastRecvTime = Date.now()
      if (!this.isPinging) {
        this.isPinging = true
        cc.game.on(cc.game.EVENT_HIDE, this.ping)
        setInterval(() => {
          if (this.socket) {
            this.ping()
          }
        }, 5000)
        setInterval(() => {
          if (this.socket) {
            if (Date.now() - this.lastRecvTime > 10000) {
              this.close()
            }
          }
        }, 500)
      }
    },

    ping() {
      if (this.socket) {
        this.lastSendTime = Date.now()
        this.send('ping')
      }
    },

    send(event, data) {
      if(this.socket && this.socket.connected) {
        if (data !== null && (typeof(data) === 'object')) {
          data = JSON.stringify(data)
        }
        console.log(event)
        this.socket.emit(event, data)
      }
    },

    close() {
      console.log('__socket close__')
      this.delayMS = null
      if (this.socket && this.socket.connected) {
        this.socket.connected = false
        this.socket.disconnect()
      }
      this.socket = null
      if (this.onDisconnect) {
        this.onDisconnect()
        this.onDisconnect = null
      }
    }
  }
})
