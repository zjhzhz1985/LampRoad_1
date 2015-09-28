var LifeShowLayer = cc.Layer.extend({
	_item0:null,
	_lifes:null,
	ctor:function () {
		this._super();	
		var size = cc.winSize;
		this._lifes = [];
		this._item0 = new cc.LabelTTF("level:", "Arial",40);
		this._item0.attr({
			x: size.width * 1/5,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			color: cc.color(255,255,255),
			scale: 1
		});
		this.addChild(this._item0,2);	

		var item1 = new cc.LabelTTF("life:", "Arial",40);
		item1.attr({
		x: size.width * 3/5,
		y: size.height - 150,
		anchorX: 0,
		anchorY: 0.5,
		color: cc.color(255,255,255),
		scale: 1
		});
		this.addChild(item1,2);	

		
		var plife0 = new cc.Sprite("#lampFire.png");
		plife0.attr({
			x: item1.x +item1.getBoundingBox().width + 10,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			scale: 1,
			opacity: 100
		});
		this.addChild(plife0,1);	

		var plife1 = new cc.Sprite("#lampFire.png");
		plife1.attr({
			x: plife0.x +plife0.getBoundingBox().width + 10,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			scale: 1,
			opacity: 100
		});
		this.addChild(plife1,1);	

		var plife2 = new cc.Sprite("#lampFire.png");
		plife2.attr({
			x: plife1.x +plife1.getBoundingBox().width + 10,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			scale: 1,
			opacity: 100
		});
		this.addChild(plife2,1);	
		

		var life0 = new cc.Sprite("#lampFire.png");
		life0.attr({
			x: item1.x +item1.getBoundingBox().width + 10,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(life0,2);	

		var life1 = new cc.Sprite("#lampFire.png");
		life1.attr({
			x: life0.x +life0.getBoundingBox().width + 10,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(life1,2);	
		
		var life2 = new cc.Sprite("#lampFire.png");
		life2.attr({
			x: life1.x +life1.getBoundingBox().width + 10,
			y: size.height - 150,
			anchorX: 0,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(life2,2);	
		this._lifes.push(life0);
		this._lifes.push(life1);
		this._lifes.push(life2);
	},
	hideLife:function(pnum){
		this._lifes[pnum].setVisible(false);
//		switch (num)
//		{
//		case 0 :
//			this._lifes[0].setVisble(false);
//			this._lifes[1].setVisble(false);
//			this._lifes[2].setVisble(false);
//			break;
//		case 1 :
//			//this._lifes[0].setVisble(false);
//			this._lifes[1].setVisble(false);
//			this._lifes[2].setVisble(false);
//			break;
//		case 2 :
//			//this._lifes[0].setVisble(false);
//			//this._lifes[1].setVisble(false);
//			this._lifes[2].setVisble(false);
//			break;
//		
//		}
	},
	setLevel:function(num){
		this._item0.setString("level: " + num);
	}
});
