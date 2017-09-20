var handler = {
  '__connect__':  new OnConnect(),
  '__disconnect__': new OnDisConnect(),
  'create_room': new OnCreateRoom(),
}

function OnConnect() {
  this.handle = (data) => {
    console.log('connect room handler ok')
  }
}

function OnDisConnect() {
  this.handle = (data) => {
    console.log('client disconnected from room handler')
  }
}

function OnCreateRoom(data) {
  this.handle = (data) => {
    console.log(data)
  }
}

module.exports = handler
