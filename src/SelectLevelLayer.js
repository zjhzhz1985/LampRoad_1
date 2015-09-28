var CustomTableViewCell = cc.TableViewCell.extend({
	draw:function (ctx) {
		this._super(ctx);
	}
});
var SelectLevelLayer = cc.Layer.extend({
	
	ctor:function () {
		this._super();	
		var size = cc.winSize;
		//半透明遮罩背景
		var bgLayer = new cc.LayerColor(cc.color(0,0,0,200), size.width, size.height);
		this.addChild(bgLayer);

		//设置背景色
		var layerbg = new cc.LayerColor(cc.color(255,255,255,240),size.width * 2/3,size.height / 2);   
		layerbg.attr({
			x: size.width / 6,
			y: size.height / 4		
		});
		this.addChild(layerbg, 0);
		
		//标题
		var titleLabel = new cc.LabelTTF("Select Level", "Arial",28);
		titleLabel.attr({
			x:layerbg.width / 2,
			y:layerbg.height - 45,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0),
			scale: 1
		});
		layerbg.addChild(titleLabel,1);
		
		//说明
		var instructionLabel = new cc.LabelTTF("  You can choose any level you have passed,to challenge,to get better results.", "Arial",25,cc.size(size.width * 2/3 - 40 , 120));
		instructionLabel.attr({
			x:layerbg.width / 2,
			y:titleLabel.y - 15 - 15,
			anchorX: 0.5,
			anchorY: 1,
			color: cc.color(10,10,10),
			scale: 1
		});
		layerbg.addChild(instructionLabel,1);
		 
		var tableView = new cc.TableView(this, cc.size(size.width * 2/3, instructionLabel.y - 120));
		tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		tableView.x = 0;
		tableView.y = 0;
		tableView.setDelegate(this);
		tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		layerbg.addChild(tableView);
		tableView.reloadData();
	
		// 添加点击监听
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.onTouchBegan.bind(this)
		}, this); 
		
	},
	onTouchBegan:function(touch, event){
		
		var location = touch.getLocation();
		var size = cc.winSize;
		
		if(location.x < size.width / 6||location.x > size.width * 5/6)
			this.closeLayer();
		if(location.y < size.height / 6||location.y > size.height * 5/6)
			this.closeLayer();
		
		return false;
	},	
	scrollViewDidScroll:function (view) {
	},
	scrollViewDidZoom:function (view) {
	},
	tableCellTouched:function (table, cell) {
		if(GV.getLevelRecord(cell.getIdx() +1) == 0&&cell.getIdx() != GV.MAX_LEVEL)
		return;
		//cc.log("cell touched at index: " + cell.getIdx());
		GV.setCurrentLevel(cell.getIdx() +1);
		var scene = new cc.Scene();
		scene.addChild(new GameScene(GV.CURRENT_LEVEL));
		cc.director.runScene(new cc.TransitionFade(1.2,scene));	
	},
//	tableCellTouched2:function () {
//		cc.log("cell touched at index: ");
//	},
	tableCellSizeForIndex:function (table, idx) {
		var size = cc.winSize;
		return cc.size(size.width / 2, 60);
	},
	tableCellAtIndex:function (table, idx) {
		var size = cc.winSize;
		var strValue = (idx+1).toFixed(0);
		var cell = table.dequeueCell();
		var label;
		var levelRecord = GV.getLevelRecord(strValue);
	
		if (!cell) {
			cell = new CustomTableViewCell();

//			var sprite = new cc.Sprite("res/icon.png");
//			sprite.anchorX = 0;
//			sprite.anchorY = 0;
//			sprite.x = 0;
//			sprite.y = 0;
//			cell.addChild(sprite);
			label = new cc.LabelTTF("Level " + strValue, "Arial", 30.0);
			label.attr({
				x:100,
				y:0,
				anchorX: 0,
				anchorY: 0,
				//color: cc.color(0,0,0),
				scale: 1
			});
			label.tag = 123;
			cell.addChild(label);	
			
		} else {
			label = cell.getChildByTag(123);
			label.setString("Level " + strValue);
		}
		var xing0;
		var xing1;
		var xing2;
		if(levelRecord > 0){
			label.setFontFillColor(cc.color(0,0,0,255));	
			xing0 = new cc.Sprite("#xiaoxingxing2.png");	
		}else{
			if(strValue == GV.MAX_LEVEL + 1)
				label.setFontFillColor(cc.color(0,0,0,255));	
			else
				label.setFontFillColor(cc.color(167,167,167,255));	
			
			xing0 = new cc.Sprite("#xiaoxingxing.png");			
		}
		
		if(levelRecord > 1){
			xing1 = new cc.Sprite("#xiaoxingxing2.png");			
		}else{
			xing1 = new cc.Sprite("#xiaoxingxing.png");	
		}
		
		if(levelRecord > 2){
			xing2 = new cc.Sprite("#xiaoxingxing2.png");			
		}else{
			xing2 = new cc.Sprite("#xiaoxingxing.png");	
		}

		xing0.attr({
			x: label.x + 90 + size.width / 16,
			y: 0,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		cell.addChild(xing0,1);
		xing1.attr({
					x: label.x + 90 + size.width / 16 + 35,
					y: 0,
					anchorX: 0,
					anchorY: 0,
					scale: 1
				});
		cell.addChild(xing1,1);
		xing2.attr({
			x: label.x + 90 + size.width / 16 + 35 + 35,
			y: 0,
			anchorX: 0,
			anchorY: 0,
			scale: 1
		});
		cell.addChild(xing2,1);
		
//		
//		if(levelRecord > 0){	
//			label.setFontFillColor(cc.color(0,0,0,255));
//			
//			var xing0 = new cc.Sprite("res/xiaoxingxing.png");
//			xing0.attr({
//				x: label.x + 90 + size.width / 16,
//				y: 0,
//				anchorX: 0,
//				anchorY: 0,
//				scale: 1
//			});
//			cell.addChild(xing0,1);
//		  
//			if(levelRecord > 1){
//				var xing1 = new cc.Sprite("res/xiaoxingxing.png");
//				xing1.attr({
//					x: label.x + 90 + size.width / 16 + 35,
//					y: 0,
//					anchorX: 0,
//					anchorY: 0,
//					scale: 1
//				});
//				cell.addChild(xing1,1);		
//			}
//			if(levelRecord > 2){
//				var xing2 = new cc.Sprite("res/xiaoxingxing.png");
//				xing2.attr({
//					x: label.x + 90 + size.width / 16 + 35 + 35,
//					y: 0,
//					anchorX: 0,
//					anchorY: 0,
//					scale: 1
//				});
//				cell.addChild(xing2,1);		
//			}
			
//			var recordLabel = new cc.LabelTTF(levelRecord, "黑体", 30.0);
//			recordLabel.x = 60;
//			recordLabel.y = 0;
//			recordLabel.anchorX = 0;
//			recordLabel.anchorY = 0;
//			recordLabel.tag = 124;
//			cell.addChild(recordLabel);	
			//添加成绩显示
			
//			
//			
//			
//		}else{
//			label.setFontFillColor(cc.color(167,167,167,255));	
//		}
		return cell;
	},

	numberOfCellsInTableView:function (table) {
		return 15;
	},
	closeLayer:function () {
		//Sound.getInstance().playBtn();
		this.setVisible(false);
		this.y = -2000;
		cc.eventManager.resumeTarget(this.getParent(),true);
	},
	
});
