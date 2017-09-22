cc.Class({
    extends: cc.Component,

    properties: {
      id: 0,
      itemName: cc.Label,
      itemButton: cc.Button
    },

    // use this for initialization
    onLoad: function () {
      this.itemButton.node.on('click', (e) => {
        console.log('正在加入：' + this.itemName)
      })
    },

    init(data) {
      this.id = data.id
      this.itemName.string = data.name
    }
});
