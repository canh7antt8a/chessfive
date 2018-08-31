var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.on_add_stage, _this);
        return _this;
    }
    BaseScene.prototype.on_add_stage = function () {
        var scaleX = this.stage.stageWidth / SCREEN_WIDTH;
        var scaleY = this.stage.stageHeight / SCREEN_HEIGHT;
        if (scaleX < scaleY) {
            this.scaleX = scaleX;
            this.scaleY = scaleX;
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        else {
            this.scaleX = scaleY;
            this.scaleY = scaleY;
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
    };
    return BaseScene;
}(eui.Component));
__reflect(BaseScene.prototype, "BaseScene");
//# sourceMappingURL=BaseScene.js.map