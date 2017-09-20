cc.Class({
  extends: cc.Component,

  properties: {
  },

  guestLogin() {
    cc.just.http.post('http://localhost:3000/guestLogin', 'name=atom&pwd=123', (err, obj) => {
      if (err) {
        console.log(err)
      } else {
        console.log(obj)
        cc.director.loadScene("hall")
      }
    })
  }
});
