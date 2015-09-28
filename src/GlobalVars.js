var GV = GV || {};
//转速  4秒 360度
GV.ROUND_SPEED = 4;
//圆半径
GV.RADIUS = 57.5;
//当前关卡
GV.CURRENT_LEVEL = 1;
GV.getCurrentLevel = function() {
	if (LocalStorage.getInstance().getItem("CURRENT_LEVEL")) {
		GV.CURRENT_LEVEL = parseInt(LocalStorage.getInstance().getItem("CURRENT_LEVEL"));
	}
}
GV.setCurrentLevel = function(level){
	if(level > GV.THE_MAX_LEVEL)
		level = GV.THE_MAX_LEVEL;
	
		GV.CURRENT_LEVEL = level;
		LocalStorage.getInstance().setItem("CURRENT_LEVEL", level);
}

//通关的最大关卡
GV.MAX_LEVEL = 0;

GV.getMaxLevel = function() {
	if (LocalStorage.getInstance().getItem("MAX_LEVEL")) {
		GV.MAX_LEVEL = parseInt(LocalStorage.getInstance().getItem("MAX_LEVEL"));
	}
}

GV.setMaxLevel = function(level) {
	if (GV.MAX_LEVEL < level) {
		GV.MAX_LEVEL = level;
		LocalStorage.getInstance().setItem("MAX_LEVEL", level);
	}
}
//设置记录每关评分
GV.getLevelRecord = function(id) {
	if (LocalStorage.getInstance().getItem("LEVEL_RECORD_" + id)) {
		return parseInt(LocalStorage.getInstance().getItem("LEVEL_RECORD_" + id));
	}else{
		return 0;
		}
}

GV.setLevelRecord = function(id,record) {
	var precord = GV.getLevelRecord(id);
	if (!precord||record > precord) {
		GV.setTotalStars(GV.TotalStars + record - precord);
		LocalStorage.getInstance().setItem("LEVEL_RECORD_" + id, record);
	}
}

//GV.TotalStars = 0;
GV.getTotalStars = function() {
	if (LocalStorage.getInstance().getItem("TOTAL_STARS")) {
		return parseInt(LocalStorage.getInstance().getItem("TOTAL_STARS"));
	}else{
		return 0;
	}
}
GV.TotalStars = GV.getTotalStars();

GV.setTotalStars = function(record) {
	if (record > GV.TotalStars) {
		GV.TotalStars = record;
		LocalStorage.getInstance().setItem("TOTAL_STARS", record);
		//jsb.reflection.callStaticMethod("AppController", "reportScore",record);
	}
}

//关卡数据
GV.AroundPointPositions = [
[cc.p(-200,0),cc.p(200,0)],   
[cc.p(-210,-210),cc.p(210,-210),cc.p(210,210)], 
[cc.p(0,-250),cc.p(0,250),cc.p(-250,0),cc.p(250,0)],                           
[cc.p(-250,-250),cc.p(250,0),cc.p(0,0),cc.p(-250,250)],	
[cc.p(0,-250),cc.p(250,50),cc.p(150,250),cc.p(0,125),cc.p(-150,250),cc.p(-250,50)], 
[cc.p(-250,0),cc.p(0,-250),cc.p(250,0),cc.p(0,250),cc.p(0,125),cc.p(0,-125)],
[cc.p(-250,0),cc.p(-125,-250),cc.p(125,250),cc.p(-125,250),cc.p(125,-250),cc.p(250,0)],
[cc.p(-250,-250),cc.p(250,-250),cc.p(125,250),cc.p(0,0),cc.p(-125,250)],  
[cc.p(0,250),cc.p(-250,0),cc.p(250,0),cc.p(-125,-250),cc.p(125,-250)], 
[cc.p(-250,-250),cc.p(250,-250),cc.p(125,0),cc.p(250,250),cc.p(-250,250)],
[cc.p(0,-250),cc.p(120,0),cc.p(250,0),cc.p(0,120),cc.p(0,250),cc.p(-120,0),cc.p(-250,0),cc.p(0,-120)],
[cc.p(-125,0),cc.p(-250,250),cc.p(-250,-250),cc.p(125,0),cc.p(250,250),cc.p(250,-250)],
[cc.p(-160,-250),cc.p(160,-250),cc.p(-250,-160),cc.p(-125,250),cc.p(250,-160),cc.p(125,250)], 
[cc.p(-100,-250),cc.p(150,0),cc.p(-250,250),cc.p(100,-250),cc.p(250,250),cc.p(-150,0)],
[cc.p(-250,0),cc.p(125,-250),cc.p(0,250),cc.p(-125,-250),cc.p(250,0)]
];

GV.LinesData = [
[cc.p(0,1)],      
[cc.p(0,1),cc.p(1,2),cc.p(2,0)],    
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,1)],  
[cc.p(0,1),cc.p(1,2),cc.p(2,0),cc.p(0,3),cc.p(3,2)], 
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,4),cc.p(4,5),cc.p(5,0)], 
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,0),cc.p(0,4),cc.p(4,5),cc.p(5,2)],
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,4),cc.p(4,5),cc.p(5,0)], 
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,4),cc.p(4,0)], 
[cc.p(0,1),cc.p(1,2),cc.p(2,0),cc.p(0,3),cc.p(3,4),cc.p(4,0)], 
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,4),cc.p(4,0),cc.p(0,2),cc.p(2,4)],
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,4),cc.p(4,5),cc.p(5,6),cc.p(6,7),cc.p(7,0)],
[cc.p(0,1),cc.p(1,2),cc.p(2,0),cc.p(0,3),cc.p(3,4),cc.p(4,5),cc.p(5,3)],
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,0),cc.p(0,4),cc.p(4,5),cc.p(5,1)],
[cc.p(0,1),cc.p(1,2),cc.p(2,4),cc.p(4,5),cc.p(5,3),cc.p(3,0)],
[cc.p(0,1),cc.p(1,2),cc.p(2,3),cc.p(3,4),cc.p(4,0)]
                ];

GV.THE_MAX_LEVEL = GV.AroundPointPositions.length;
