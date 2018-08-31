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
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/login_view.exml";
        _this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btn_tap, _this);
        return _this;
    }
    LoginView.prototype.btn_tap = function () {
        // g_main_node.replace_scene(new testscene())
        g_main_node.addChild(new ConnectingMask());
    };
    return LoginView;
}(BaseScene));
__reflect(LoginView.prototype, "LoginView");
//# sourceMappingURL=LoginView.js.map