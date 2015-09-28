var WinLayer = cc.Layer.extend({
	init:function (record) {
		this._super();
		var size = cc.winSize;

		var layerbg=new cc.LayerColor(cc.color(255,255,255,255),size.width,size.height);   
		this.addChild(layerbg, 0);
		
		var item1 = new cc.LabelTTF("RECORD", "Arial",50);
		item1.attr({
			x: size.width / 2,
			y: size.height* 2/3,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		this.addChild(item1,2);	
		
		
		var xing0;
		var xing1;
		var xing2;
		if(record > 0){
			xing0 = new cc.Sprite("#xiaoxingxing2.png");	
		}else{
			xing0 = new cc.Sprite("#xiaoxingxing.png");			
		}
		if(record > 1){
			xing1 = new cc.Sprite("#xiaoxingxing2.png");			
		}else{
			xing1 = new cc.Sprite("#xiaoxingxing.png");	
		}
		if(record > 2){
			xing2 = new cc.Sprite("#xiaoxingxing2.png");			
		}else{
			xing2 = new cc.Sprite("#xiaoxingxing.png");	
		}
		xing0.attr({
			x: size.width / 2 - 100,
			y: size.height / 2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(xing0,1);
		xing1.attr({
			x: size.width / 2,
			y: size.height / 2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(xing1,1);
		xing2.attr({
			x: size.width / 2 + 100,
			y: size.height / 2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale: 1
		});
		this.addChild(xing2,1);
	
		
//		var item2 = new cc.LabelTTF(""+record, "Arial",80);
//		item2.attr({
//			x: size.width / 2,
//			y: size.height / 2,
//			anchorX: 0.5,
//			anchorY: 0.5,
//			color: cc.color(0,0,0),
//			scale: 1
//		});
//		this.addChild(item2,2);	

		var menulabel1=new cc.MenuItemFont("RETRY", this.onGameRetry,this);
		menulabel1.setFontSize(40);
		menulabel1.setFontName("Arial");
		//menulabel1.setColor(cc.color(113,187,56));
		menulabel1.setColor(cc.color(0,0,0));
		//menulabel1.color=cc.color(255,255,255);
		var menulabel2=new cc.MenuItemFont("MENU", this.onGameMenu,this);
		menulabel2.setFontSize(40);
		menulabel2.setFontName("Arial");
		//menulabel2.setColor(cc.color(33,82,12));
		menulabel2.setColor(cc.color(0,0,0));
		var menulabel3=new cc.MenuItemFont("NEXT", this.onGameNext,this);
		menulabel3.setFontSize(40);
		menulabel3.setFontName("Arial");
		menulabel3.setColor(cc.color(0,0,0));
		var menu = new cc.Menu(menulabel1,menulabel2,menulabel3);
		menu.x = size.width/2;	
		menu.y = size.height*1/4;	
		menu.alignItemsHorizontallyWithPadding(100);
		//menu.alignItemsVerticallyWithPadding(50);
		this.addChild(menu,1);
	},
	onGameRetry:function() {
		Sound.getInstance().play_snd_btn();
		var scene = new cc.Scene();
		scene.addChild(new GameScene(GV.CURRENT_LEVEL));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));		
	},
	onGameMenu:function() {
		Sound.getInstance().play_snd_btn();
		//GV.setCurrentLevel(GV.CURRENT_LEVEL+1);
		var scene = new cc.Scene();
		scene.addChild(new GameStartscene());
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
	},
	onGameNext:function(){
		Sound.getInstance().play_snd_btn();
		GV.setCurrentLevel(GV.CURRENT_LEVEL+1);
		var scene = new cc.Scene();
		scene.addChild(new GameScene(GV.CURRENT_LEVEL));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
	}
});

var WinScene = cc.Scene.extend({
	record:null,
	ctor:function (record) {
		this._super();
		this.record = record;
	},
	onEnter:function () {
		this._super();
		var layer = new WinLayer();
		layer.init(this.record);
		this.addChild(layer);
	}
});