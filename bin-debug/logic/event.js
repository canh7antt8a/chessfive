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
/**
 * FORGE_GROUND_EVENT 切回前台
 */
var FORGE_GROUND_EVENT = (function (_super) {
    __extends(FORGE_GROUND_EVENT, _super);
    function FORGE_GROUND_EVENT(type, bubbles, cancelable) {
        if (type === void 0) { type = FORGE_GROUND_EVENT.key; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    FORGE_GROUND_EVENT.key = "FORGE_GROUND";
    return FORGE_GROUND_EVENT;
}(egret.Event));
__reflect(FORGE_GROUND_EVENT.prototype, "FORGE_GROUND_EVENT");
/**
 * BACK_GROUND_EVENT 切到后台
 */
var BACK_GROUND_EVENT = (function (_super) {
    __extends(BACK_GROUND_EVENT, _super);
    function BACK_GROUND_EVENT(type, bubbles, cancelable) {
        if (type === void 0) { type = BACK_GROUND_EVENT.key; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    BACK_GROUND_EVENT.key = "BACK_GROUND";
    return BACK_GROUND_EVENT;
}(egret.Event));
__reflect(BACK_GROUND_EVENT.prototype, "BACK_GROUND_EVENT");
/**
 * ENTER_ROOM_EVENT
 */
var ENTER_ROOM_EVENT = (function (_super) {
    __extends(ENTER_ROOM_EVENT, _super);
    function ENTER_ROOM_EVENT(type, bubbles, cancelable) {
        if (type === void 0) { type = ENTER_ROOM_EVENT.key; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    ENTER_ROOM_EVENT.key = "ENTER_ROOM";
    return ENTER_ROOM_EVENT;
}(egret.Event));
__reflect(ENTER_ROOM_EVENT.prototype, "ENTER_ROOM_EVENT");
/**
 * HEARTBEAT_EVENT
 */
var HEARTBEAT_EVENT = (function (_super) {
    __extends(HEARTBEAT_EVENT, _super);
    function HEARTBEAT_EVENT(type, bubbles, cancelable) {
        if (type === void 0) { type = HEARTBEAT_EVENT.key; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    HEARTBEAT_EVENT.key = "HEARTBEAT";
    return HEARTBEAT_EVENT;
}(egret.Event));
__reflect(HEARTBEAT_EVENT.prototype, "HEARTBEAT_EVENT");
/**
 * 网络消息的监听事件，需要先在这里注册
 */
var G_Net_Event_List = (_a = {},
    _a["HeartBeat"] = HEARTBEAT_EVENT,
    _a["EnterRoomRsp"] = ENTER_ROOM_EVENT,
    _a);
var _a;
//# sourceMappingURL=event.js.map