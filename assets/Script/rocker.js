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
        rocker: {
            type: cc.Node,
            default: null,
        },

        Max_r: 50,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start() {
        this.rocker.on(cc.Node.EventType.TOUCH_START, function (e) {
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag();//获取向量长度
            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.rocker.setPosition(pos);
        }, this);

        this.rocker.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);
            var len = pos.mag();
            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.rocker.setPosition(pos);
        }, this);

        this.rocker.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.rocker.setPosition(cc.v2(0, 0));

        }, this);

        this.rocker.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.rocker.setPosition(cc.v2(0, 0));

        }, this);

    },

    // update (dt) {},
});
