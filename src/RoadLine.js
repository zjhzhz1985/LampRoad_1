//两点之间连线
var RoadLine = cc.Node.extend({
	State:false,
	PointA:null,
	PointB:null,
	_draw:null,
	_colorId:0,
	ctor:function (a,b) {
		this._super();	
		this.PointA = a;
		this.PointB = b;
		this._draw = new cc.DrawNode();
		this.addChild(this._draw);	
		this.lineDark();
	},
	lineDark:function () {
		//this._draw.clear();
		//this._colorId = -1;
		this._draw.drawSegment(this.PointA, this.PointB, 2, cc.color(255, 255, 255, 40));	
	},
	lineLight:function () {
		this._draw.clear();
		this._draw.drawSegment(this.PointA, this.PointB, 2, cc.color(255, 255, 255, 250));
		this.State = true;
		//if(this._colorId == 2)
			//this._colorId = -1;
	}
});
