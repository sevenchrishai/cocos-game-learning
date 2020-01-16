cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },
    on_touch_move(t) {
        // 位置
        console.log("cc.Node.EventType.TOUCH_START called");
        var w_pos = t.getLocation(); // cc.Vec2 {x, y}
        console.log(w_pos);

        // 距离上一次触摸变化了多少;
        var delta = t.getDelta(); // x, y各变化了多少cc.Vec2(x, y)

    },
    // use this for initialization
    onLoad: function () {
        //this.label.string = this.text;
        //this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_move, this);
    },

    // called every frame
    update: function (dt) {

    },
});
