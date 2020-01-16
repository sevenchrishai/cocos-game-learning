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
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        //
        audio:{
            default: null,
            type: cc.AudioSource
        }
    },

    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * 1 + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/3;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // console.log(randX)
        // console.log(randY)
        // 返回星星坐标
        return cc.v2(randX, randY);
    },
    //计算两个坐标点之间的距离
    vector_distance(x1,y1,x2,y2){
        var len = (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
        return Math.sqrt(len);
    },
    //计算坐标点距离原点的距离
    verctor_lon(x,y){
        var lon = x*x+y*y;
        return Math.sqrt(lon);
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y;
        // 生成一个新的星星
        this.spawnNewStar();
        var playerXY = this.player.x;
        // console.log(playerXY);
        this.ground.on(cc.Node.EventType.TOUCH_START, function(t){
            console.log("cc.Node.EventType.TOUCH_START called");
            // var w_pos = t.getLocation(); // cc.Vec2 {x, y}
            // console.log("wpos=",w_pos);
            var w_pos = this.ground.convertTouchToNodeSpaceAR(t);
            console.log("wpos=",w_pos);
            var pre_pos = this.ground.convertToNodeSpaceAR(t.getPreviousLocation());
            console.log("pre_pos=",pre_pos);
            var lon = this.vector_distance(w_pos.x,w_pos.y,pre_pos.x,pre_pos.y);
            console.log("lon=",lon);
            var mto = cc.moveTo(1,w_pos);
            this.player.runAction(mto);
        }, this);
        this.ground.on(cc.Node.EventType.TOUCH_END, function(){
            console.log("cc.Node.EventType.TOUCH_END called");
        }, this);
        this.ground.on(cc.Node.EventType.TOUCH_CANCEL, function(){
            console.log("cc.Node.EventType.TOUCH_CANCEL called");
        }, this);

        //音乐
        this.audio = this.node.getChildByName("bg_music").getComponent(cc.AudioSource);

    },

    start () {
        // this.scheduleOnce(function(){
        //     this.audio.pause();
        // },1)
        // this.scheduleOnce(function(){
        //     this.audio.play();
        // },2)

    },

    // update (dt) {},
});
