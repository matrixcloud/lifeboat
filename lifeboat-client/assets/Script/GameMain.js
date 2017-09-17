function initModules() {
  cc.just = {}
  cc.just.net = require('Net')
  cc.just.net.host = '127.0.0.1:3000'
  cc.just.net.connect((err, data) => {
  })
}

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
      initModules()
      cc.director.loadScene("hall")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
