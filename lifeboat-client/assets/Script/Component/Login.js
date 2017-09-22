cc.Class({
  extends: cc.Component,

  properties: {
  },

  guestLogin() {
    cc.just.http.post('http://localhost:3000/guestLogin', 'name=atom&pwd=123', (err, obj) => {
      if (err) {
        console.log(err)
      } else {
        cc.just.http.get('http://localhost:3000/rooms', (err, r) => {
          if (!err) {
            console.log(r)
            cc.just.data.rooms = r
            cc.director.loadScene("hall")
          } else {
            console.error(err)
          }
        })
      }
    })
  }
})
