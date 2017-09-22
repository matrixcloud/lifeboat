cc.Class({
    extends: cc.Component,

    properties: {
      itemPrefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
      if (!cc.just) return cc.director.loadScene('login')

      cc.just.data.rooms.forEach(e => {
        console.log(e.name)
        let item = cc.instantiate(this.itemPrefab)
        this.node.addChild(item)
        item.getComponent('RoomItem').init({
          id: e.id,
          name: e.name
        })
      })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
