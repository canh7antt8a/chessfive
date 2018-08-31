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
var ConnectingMask = (function (_super) {
    __extends(ConnectingMask, _super);
    function ConnectingMask() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/connect_mask.exml";
        _this.group_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touch, _this);
        return _this;
    }
    ConnectingMask.prototype.touch = function (evt) {
        evt.stopPropagation();
    };
    return ConnectingMask;
}(BaseNode));
__reflect(ConnectingMask.prototype, "ConnectingMask");
//# sourceMappingURL=ConnectingMask.js.map