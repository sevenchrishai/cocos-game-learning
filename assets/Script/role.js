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
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,
        bmp_font: {
            type: cc.Label,
            default: null
        }
    },

    setJumpAction() {
        /**
         * 在 Cocos Creator 中，动作 简单来说就是 节点的位移、缩放和旋转。
         * moveBy() 方法的作用是在规定的时间内移动指定的一段距离
         * Vec2（表示 2D 向量和坐标）类型对象
         * easing 是 ActionInterval 类下的一个方法，这个方法可以让时间间隔动作呈现为一种缓动运动
         */
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));

    },
    /**
     * onLoad 方法会在场景加载后立刻执行，所以我们会把初始化相关的操作和逻辑都放在这里面
     * 
     */
    onLoad() {
        this.bmp_font.string = "hello,my baby";
        var jumpAction = this.setJumpAction();
        this.node.runAction(jumpAction);
        //console.log(this.node.x, this.node.y);
        //Company is the longest confession of love
    },

    start() {

    },

    update(dt) {
        
    },

    onDestroy() {
        
    },
});
