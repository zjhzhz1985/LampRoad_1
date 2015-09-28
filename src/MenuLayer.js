var MenuLayer = cc.Layer.extend({
	_selectLevelLayer:null,
	ctor:function(){
		this._super();
		this.init();
	},
	init:function () {
		var size = cc.winSize;

		var middleSpace = 30;
		
//		var item0 = new cc.MenuItemFont("LEVEL", this.item0Callback,this);
//		item0.setFontSize(40);
//		item0.setColor(cc.color(0,0,0));
//		item0.anchorX = 0;
//		item0.anchorY = 0.5;
//		item0.x = 20;
//		item0.y = size.height - middleSpace;
		
		var item1 = new cc.MenuItemFont("Happy24", this.item1Callback,this);
		item1.setFontName("Arial");
		item1.setFontSize(40);
		item1.setColor(cc.color(0,0,0));
		item1.anchorX = 0;
		item1.anchorY = 0.5;
		item1.x = 20;
		item1.y = size.height - middleSpace;
		//声音开关
		var item_on = new cc.MenuItemImage(
				"#sound_on.png",
				"#sound_on.png");

		var item_off = new cc.MenuItemImage(
				"#sound_off.png",
				"#sound_off.png");
		var item2 = new cc.MenuItemToggle(
				item_on,
				item_off,
				this.item2Callback,this
		);
		item2.scale = 1;
		item2.anchorX = 1;
		item2.anchorY = 0.5;
		item2.x = size.width - 20;
		item2.y = size.height - middleSpace - 6;
		
		if (!Sound.getInstance()._Silence2) {
			item2.setSelectedIndex(0);
		} else {
			item2.setSelectedIndex(1);
		}


		 
		var item4 = new cc.MenuItemImage(
				"#start_btn.png",
				"#start_btn.png",
				this.item4Callback,this
		);
		item4.anchorX = 0.5;
		item4.anchorY = 0.5;
		item4.x = size.width/2;
		item4.y = size.height * 2/5;
		
		
		var item3 = new cc.MenuItemImage(
				"#selectlevel_btn.png",
				"#selectlevel_btn.png",
				this.item3Callback,this
		);
		item3.anchorX = 0.5;
		item3.anchorY = 0.5;
		item3.x = size.width/2;
		item3.y = item4.y - 100;
		item3.scale = 1;
		
		
		var level = GV.MAX_LEVEL +1;
		if(level > GV.THE_MAX_LEVEL)
			level = GV.THE_MAX_LEVEL;
		var level2 = new cc.LabelTTF(level, "Arial", 25.0);
		level2.setFontFillColor(cc.color(0,0,0,255));
		level2.x = 300;
		level2.y = 10;
		level2.anchorX = 0;
		level2.anchorY = 0;
		item4.addChild(level2,111);	
	
//		var item5 = new cc.MenuItemImage(
//				"#share_btn.png",
//				"#share_btn.png",
//				this.item5Callback,this
//		);
//		item5.anchorX = 1;
//		item5.anchorY = 0.5;
//		item5.x = size.width/2 - middleSpace;
//		item5.y = size.height * 1/4;
		
		var item6 = new cc.MenuItemImage(
				"#rate_btn.png",
				"#rate_btn.png",
				this.item6Callback,this
		);
		item6.anchorX = 0.5;
		item6.anchorY = 0.5;
		item6.x = size.width/2;
		item6.y = item3.y - 100;;
		item6.scaleX = 0.8;
		var menu = new cc.Menu(item1,item2,item3,item4,item6);
		menu.x = 0;	
		menu.y = 0;
		this.addChild(menu);
		
		
	},
	//选择关卡 回调
	item3Callback:function(){
		Sound.getInstance().play_snd_btn();
		if(this._selectLevelLayer)
		{
			if(!this._selectLevelLayer.Visible)
			{
				this._selectLevelLayer.y = 0;
				this._selectLevelLayer.setVisible(true);
				//暂停页面按钮功能   
				cc.eventManager.pauseTarget(this, true);
				//开启设置层按钮功能
				cc.eventManager.resumeTarget(this._selectLevelLayer,true);
			}
		}
		else
		{
			//暂停页面已存按钮功能
			cc.eventManager.pauseTarget(this, true);
			this._selectLevelLayer = new SelectLevelLayer();
			this.addChild(this._selectLevelLayer,100);

		}

	},
	//跳转其他游戏 回调
	item1Callback:function(){
		Sound.getInstance().play_snd_btn();
		jsb.reflection.callStaticMethod("AppController", "goToHappy24");
	},
	//声音开关 回调
	item2Callback:function(){
		Sound.getInstance().effectOnOff();
		Sound.getInstance().play_snd_btn();
	},
	//排行榜 回调
	//item3Callback:function(){
		//Sound.getInstance().play_snd_btn();
		//jsb.reflection.callStaticMethod("AppController", "gogamecenter");
		//jsb.reflection.callStaticMethod("AppController", "goToLightLine");
	//},
	//开始游戏 回调
	item4Callback:function(){
		Sound.getInstance().play_snd_btn();
		var level = GV.MAX_LEVEL +1;
		if(level > GV.THE_MAX_LEVEL)
			level = GV.THE_MAX_LEVEL;
//		if(GV.getLevelRecord(GV.CURRENT_LEVEL) == 3)
//			level = GV.MAX_LEVEL +1;
		
		GV.setCurrentLevel(level);
		var scene = new cc.Scene();
		scene.addChild(new GameScene(level));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
	},
//	//分享 回调
//	item5Callback:function(){
//		Sound.getInstance().play_snd_btn();
//		jsb.reflection.callStaticMethod("AppController", "goToLightLine");
//	},
	//评论 回调
	item6Callback:function(){
		Sound.getInstance().play_snd_btn();
		jsb.reflection.callStaticMethod("AppController", "goToLightLine");
	}	
});