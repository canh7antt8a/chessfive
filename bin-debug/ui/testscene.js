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
var testscene = (function (_super) {
    __extends(testscene, _super);
    function testscene() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/base.exml";
        _this.btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touch_tap, _this);
        g_dispatcher.addEventListener(G_Net_Event_List["EnterRoomRsp"].key, _this.enter_room, _this);
        g_dispatcher.addEventListener(G_Net_Event_List["HeartBeat"].key, _this.heartbeat, _this);
        return _this;
    }
    testscene.prototype.enter_room = function (evt) {
        console.log("testscene enter_room   ", evt.data);
    };
    testscene.prototype.heartbeat = function (evt) {
        console.log("testscene heartbeat   ", evt.data);
    };
    testscene.prototype.touch_tap = function () {
        // let req : EnterRoomReq = new EnterRoomReq()
        // req.uid = 123456
        // req.roomid = 10001
        // g_socket.sendData( EnterRoomReq.encode(req) )
        // g_main_node.push_scene(new Test1())
    };
    return testscene;
}(BaseScene));
__reflect(testscene.prototype, "testscene");
//# sourceMappingURL=testscene.js.map