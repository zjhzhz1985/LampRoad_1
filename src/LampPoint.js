//数字按钮
var LampPoint = cc.Sprite.extend({
	//id:null,
	_m_radian:null,//每帧转动单位弧度
	_radian:0,//所在弧度 初始为0 在圆心正下方
	_yuanxunx:0,
	_yuanxuny:0,
	ctor:function () {
		this._super("#lampFire.png");
		//this.scale = 0.5;
		//做无限自转运动
//		var repeat1 = new cc.RepeatForever(cc.rotateBy(GV.ROUND_SPEED, 360));
//		this.runAction(repeat1);
	    
	},
	//绕圆心做圆周运动
	runCircle:function (x,y,aradian) {
		//每帧转动单位弧度
		this._m_radian = 2 * Math.PI / (GV.ROUND_SPEED * 60);
		//设定圆心
		this._yuanxinx = x;
		this._yuanxiny = y;
		this._radian = aradian;
		this.scheduleUpdate();
	},
	update:function (dt) {
		//计算相对圆心坐标偏移
		var px = -GV.RADIUS*Math.sin(this._radian);
		var py = -GV.RADIUS*Math.cos(this._radian);
		this.x = px + this._yuanxinx;
		this.y = py + this._yuanxiny;
		//对所在弧度减小单位弧度（逆时针）
		this._radian -= this._m_radian;
		 
	},
	//沿直线飞行
	flyAlong:function () {
	    this.unscheduleUpdate();
		
	    var jiaodu = 2 * Math.PI / 360 * 90;
	    
	    //以this.x y为圆心，_yuanxin绕着逆转90度
	    var x0 = (this._yuanxinx - this.x) * Math.cos(jiaodu) - (this._yuanxiny-this.y) * Math.sin(jiaodu) + this.x;
	    var y0 = (this._yuanxinx - this.x) * Math.sin(jiaodu) + (this._yuanxiny-this.y) * Math.cos(jiaodu) + this.y ;
	    //计算xy速度
	    var _px = this.x - x0;
	    var _py = this.y - y0;
	    
	    var action1 = new cc.RepeatForever(cc.moveBy(2, cc.p(10 * _px,10 * _py)));	
	    this.runAction(action1);	
	},
	flyStop:function () {
		this.stopAllActions();
	}
});
