var GameStart = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function () {
    	var size = cc.winSize;	
    	cc.spriteFrameCache.addSpriteFrames(res.gameui_plist);
    	//设置背景色
    	var layerbg = new cc.LayerColor(cc.color(255,255,255,255),size.width,size.height);         	
    	this.addChild(layerbg, 0);

    	var titleSprite = new cc.Sprite("#ll.png");
    	titleSprite.attr({
    		x: size.width / 2,
    		y: size.height * 7/10,
    		anchorX: 0.5,
    		anchorY: 0.5,
    		scale: 1
    	});
    	this.addChild(titleSprite);
    	//cc.log(GV.CURRENT_LEVEL);
    	//初始化数据
    	GV.getCurrentLevel();
    	GV.getMaxLevel();
    	
    	
    	var menuLayer = new MenuLayer();
    	this.addChild(menuLayer);

       // return true;
    }

});
var GameStartscene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameStart();
		this.addChild(layer);
	}
});
