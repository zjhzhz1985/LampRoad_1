var AroundPoint = cc.Sprite.extend({
	//id:null,
	_LampFireSprite:null,
	ctor:function () {
		this._super("#circle.png");
		//this.scale = 0.5;
		//做无限自转运动
		var repeat1 = new cc.RepeatForever(cc.rotateBy(GV.ROUND_SPEED, -360));
		this.runAction(repeat1);	
	},
	showLampPoint:function (x,y) {
		if(this._LampFireSprite)
			{
				this._LampFireSprite.setVisble(true);	
			}else{
				this._LampFireSprite = new LampPoint();	
				this.addChild(this._LampFireSprite);
			}
		this._LampFireSprite.setNormalizedPosition(x,y);
//		this._LampFireSprite.x = x;
//		this._LampFireSprite.y = y;	
	},
	hideLampPoint:function () {
		if(this._LampFireSprite)
			this._LampFireSprite.setVisible(false);	
	},
	flyLampPoint:function () {
		
		
	}	
});
