cc.Class({
  extends: cc.Component,

  properties: {
    roomNameEditBox: cc.EditBox,
    createButton: cc.Button,
    createdRoom: ''
  },

  // use this for initialization
  onLoad: function () {
    if (!cc.just) {
      cc.director.loadScene('login')
    }

    this.roomNameEditBox.node.on('editing-did-ended', this.handleRoomName, this)
    this.createButton.node.on('click', this.createdRoom, this)
  },

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },

  createRoom(e) {
    cc.just.http.post('http://localhost:3000/rooms', `name=${this.createdRoom}`, (err, obj) => {
      console.log(obj)
    })
  },

  handleRoomName(e) {
    const editBox = e.detail
    this.createdRoom = editBox.string
  }
});
