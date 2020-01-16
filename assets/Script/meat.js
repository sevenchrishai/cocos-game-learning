// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    /*
    t: --> cc.Touch
    触摸的位置: 屏幕坐标，左小角(0, 0); getLocation();
    */
    on_touch_move(t) {
        // 位置
        console.log("cc.Node.EventType.TOUCH_MOVE called");
        console.log(t.getLocation());
        var w_pos = t.getLocation(); // cc.Vec2 {x, y}
        console.log(w_pos, w_pos.x, w_pos.y);

        // 距离上一次触摸变化了多少;
        var delta = t.getDelta(); // x, y各变化了多少cc.Vec2(x, y)

        this.node.x += delta.x;
        this.node.y += delta.y;
    },
    onLoad() {
        //初始化触摸事件监听
        this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
            console.log("cc.Node.EventType.TOUCH_START called");
            // this 函数里面的this,
            // 停止事件传递
            t.stopPropagationImmediate();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (t) {
            console.log("cc.Node.EventType.TOUCH_END called");
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
            console.log("cc.Node.EventType.TOUCH_CANCEL called");
        }, this);

        //自定义事件
        //接收者
        // this.node.on("ccc_event",function(e){
        //     console.log("cc_event", e.detail)
        // },this);
        // //派送者（只派送给自己）
        // this.node.emit("ccc_event",{name: "seven"});
        // //派送全局
        // var ev = new cc.Event.EventCustom("ccc_event", true);//第二个参数指冒泡
        // ev.detail = {name: "seven"};
        // this.node.dispatchEvent(ev);
    },

    start() {

    },

    // update (dt) {},
});