var GameLayer = cc.Layer.extend({
	AroundPoints:null,//顶点
	AroundPointsLength:null,//有多少点
	Lines:null,//线
	LinesLength:null,//有多少段线	//会减少 做计数用
	pLinesData:null,
	LampPointID:null,//lamp所在顶点id
	LampFireSprite:null,
	Life:null,//生命
	lifeShowLayer:null,//生命显示层
	TouchAble:null,//控制飞行是否可以点击
//	score1:0,
//	score2:1,
//	score3:0,
//	score1Item:null,
//	score2Item:null,
//	score3Item:null,
	ctor:function(level){
		this._super();
		this.init(level);
	},
	initData:function() {
		this.AroundPoints = [];
		this.Lines = [];
		this.Life = 3;
		this.pLinesData = [];
		this.TouchAble = true;
	},
	init:function (level) {
		this._super();
		var size = cc.winSize;
		
		
		//设置背景色GV.THE_MAX_LEVEL
		var layerbg = new cc.LayerColor(cc.color(0,0,0,255),size.width,size.height);         	
		this.addChild(layerbg, -1);
		this.initData();
		
		
		//设置重新开始和回菜单按钮
		var item0 = new cc.MenuItemImage(
				"#menu_btn.png",
				"#menu_btn.png",
				this.item0Callback,this
		);
		item0.anchorX = 0;
		item0.anchorY = 1;
		item0.x = 40;
		item0.y = size.height - 40;
		//item0.scale = 0.4;
		var item1 = new cc.MenuItemImage(
				"#restart_btn.png",
				"#restart_btn.png",
				this.item1Callback,this
		);
		item1.anchorX = 1;
		item1.anchorY = 1;
		item1.x = size.width - 40;
		item1.y = size.height - 40;
		item1.scale = 0.9;
		var menu = new cc.Menu(item0,item1);
		menu.x = 0;	
		menu.y = 0;
		this.addChild(menu);
		
		
		
		this.lifeShowLayer = new LifeShowLayer();
		this.addChild(this.lifeShowLayer);
		
		this.lifeShowLayer.setLevel(level);
		//cc.log(level);
		//第一关 AroundPoint点数组
		var AroundPointPositions = [];
		this.AroundPointsLength = GV.AroundPointPositions[level - 1].length;
		for(var i = 0;i < this.AroundPointsLength;i++)
		{
			AroundPointPositions[i] = GV.AroundPointPositions[level - 1][i];
			
		}
		
		//第一关 line数组
		//this.pLinesData = GV.LinesData[level-1];
		for(var i = 0;i < GV.LinesData[level - 1].length;i++)
		{
			this.pLinesData[i] = GV.LinesData[level - 1][i];

		}

		this.LinesLength = this.pLinesData.length;
		//cc.log(this.LinesLength);
		
		
		for(var i = 0;i < AroundPointPositions.length;i++){	
			this.AroundPoints[i] =	new AroundPoint(); 
			this.addChild(this.AroundPoints[i],2);
			this.AroundPoints[i].setPosition(cc.pAdd(cc.p(size.width / 2,size.height / 2), AroundPointPositions[i]));
		}
		
		
		for(var i = 0;i < this.pLinesData.length;i++){	
			this.Lines[i] =	new RoadLine(this.AroundPoints[this.pLinesData[i].x].getPosition(),this.AroundPoints[this.pLinesData[i].y].getPosition()); 
			this.addChild(this.Lines[i],1);	
		}

		this.LampFireSprite = new LampPoint();
		//this.LampFireSprite.setNormalizedPosition(0,0.5);
		//this.AroundPoints[0].addChild(this.LampFireSprite);
		this.addChild(this.LampFireSprite,3);
		
		this.LampFireSprite.runCircle(this.AroundPoints[0].x,this.AroundPoints[0].y,0);
		
		
		//设置顶点所在id
		this.LampPointID = 0;
		//显示顶点上的lamp
		//this.AroundPoints[this.LampPointID].showLampPoint(0,0.5);
		
		
		  
		
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.onTouchBegan.bind(this)
		}, this); 
	
	},
	onTouchBegan:function(touch, event){
		if(!this.TouchAble)
			return false;
		var location = touch.getLocation();
		var size = cc.winSize;
		
		if(location.y > size.height - 150 || location.y < 100)
			return false;
		
		//cc.log("脱离");
		//隐藏 脱离点LampFireSprite
		//this.AroundPoints[this.LampPointID].hideLampPoint();
		
		Sound.getInstance().play_snd_boom();
		
		this.LampFireSprite.flyAlong();
		this.scheduleUpdate();
		
		this.TouchAble = false;
		return false;
	},
	//碰撞检测
	update:function (dt) {
		var size = cc.winSize;
		//对LampFireSprite进行位置检测，看看是否超出屏幕
		if(this.LampFireSprite.x <= 0||this.LampFireSprite.x >= size.width)
			{
			this.lampFireEnd();
			return;
			}
		if(this.LampFireSprite.y <= 0||this.LampFireSprite.y >= size.height)
			{
			this.lampFireEnd();
			return;
			}
		//检测是否幢到其他圆
		for(var i = 0;i < this.AroundPointsLength;i++){	
			if(i == this.LampPointID)
				continue;
			var pde = cc.pDistance(this.AroundPoints[i].getPosition(),this.LampFireSprite.getPosition());
			if(pde <= GV.RADIUS){
				//碰撞
				Sound.getInstance().play_snd_collide();
				
				//直线飞行结束
				this.LampFireSprite.flyStop();
				//开启点击
				this.TouchAble = true;
				//计算碰撞点相对圆心所在弧度
				//var roundRadius = cc.pAngleSigned(this.LampFireSprite.getPosition(),cc.p(this.AroundPoints[i].x,this.AroundPoints[i].y - GV.RADIUS));

				//计算方块中心点与 点（圆心x,圆心y-半径）的距离
				var mtd=cc.pDistance(this.LampFireSprite.getPosition(),cc.p(this.AroundPoints[i].x,this.AroundPoints[i].y - GV.RADIUS))/2;
				//得出两点之间的弧度
				var mta=2*Math.asin(mtd/GV.RADIUS);
				if(this.LampFireSprite.x > this.AroundPoints[i].x)
					mta = -mta;		
				//重新开始圆运动
				this.LampFireSprite.runCircle(this.AroundPoints[i].x,this.AroundPoints[i].y,mta);
				
				//改变线的状态
				for(var j = 0;j < this.pLinesData.length;j++){
//					cc.log(this.pLinesData[j].x);	
//					cc.log(this.pLinesData[j].y);
//					cc.log(this.LampPointID);	
//					cc.log(i);
//					cc.log("-----------------------------");
					if((this.pLinesData[j].x == this.LampPointID&&this.pLinesData[j].y == i)||(this.pLinesData[j].x == i&&this.pLinesData[j].y == this.LampPointID)){
						//cc.log("*******************");	
						if(!this.Lines[j].State){
							this.Lines[j].lineLight();
							this.LinesLength--;
							if(this.LinesLength == 0){	
								//gamepass 跳转下一关
								//cc.log("gamepass");
								this.unscheduleUpdate();
								this.gamePass(this.Life);
								return;
							}		
						}
						break;
					}
							
				}

				this.LampPointID = i;
				//计算分数
//				this.score1++;
//				this.score1Item.setString(this.score1);
//				if(this.Lines[0]._colorId !=-1 && this.Lines[0]._colorId == this.Lines[1]._colorId && this.Lines[0]._colorId == this.Lines[2]._colorId){
//					this.score2++;
//					this.score2Item.setString(this.score2);
//					for(var j = 0;j < 3;j++){	
//						this.Lines[j].lineDark();	
//					}
//				}
//				this.score3 = this.score1 * this.score2;
//				this.score3Item.setString(this.score3);
				
				this.unscheduleUpdate();
				return;
			}
		}	
	},
	//火焰飞错位置，熄灭，若还有剩余生命则减少生命，回复之前状态，若无生命则游戏回复初始状态。
	lampFireEnd:function () {
		this.unscheduleUpdate();
		this.LampFireSprite.flyStop();
		//火焰熄灭动画
		
		//生命减少
		this.Life--;
		
		
		if(this.Life == 0)
		{
			//gameover回复初始状态
			Sound.getInstance().play_snd_die();
			
			var scene = new cc.Scene();
			scene.addChild(new GameScene(GV.CURRENT_LEVEL));
			cc.director.runScene(new cc.TransitionFade(1.2,scene));	
		}else{
			//回复之前状态
			Sound.getInstance().play_snd_die();
			
			this.LampFireSprite.runCircle(this.AroundPoints[this.LampPointID].x,this.AroundPoints[this.LampPointID].y,0);
			//cc.log(this.Life);
			this.lifeShowLayer.hideLife(this.Life);	
			
			//开启点击
			this.TouchAble = true;
		}
		
	},
	gamePass:function (record) {
		//Sound.getInstance().play_snd_gamepass();	
		//重置最大关卡数
		GV.setMaxLevel(GV.CURRENT_LEVEL);
		
		//记录最佳成绩
		GV.setLevelRecord(GV.CURRENT_LEVEL,this.Life);
		
		var scene = new cc.Scene();
		scene.addChild(new WinScene(record));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));		
	},
	//跳转MENU
	item0Callback:function(){
		Sound.getInstance().play_snd_btn();
		var scene = new cc.Scene();
		scene.addChild(new GameStartscene());
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
	},
	//restart
	item1Callback:function(){
		Sound.getInstance().play_snd_btn();
		var scene = new cc.Scene();
		scene.addChild(new GameScene(GV.CURRENT_LEVEL));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
	}
});

var GameScene = cc.Scene.extend({
	level:0,
	ctor:function (level) {
		this._super();
		this.level = level;
	},
	onEnter:function () {
		this._super();
		var layer = new GameLayer(this.level);
		this.addChild(layer);
	}
});
