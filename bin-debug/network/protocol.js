var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * HeartBeat
 */
var HeartBeat = (function () {
    function HeartBeat() {
        this.beats = 0;
    }
    HeartBeat.decode = function (str) {
        return JSON.parse(str);
    };
    HeartBeat.encode = function (ins) {
        return HeartBeat._REQ_NAME + "#" + JSON.stringify(ins);
    };
    HeartBeat._REQ_NAME = "HeartBeat";
    return HeartBeat;
}());
__reflect(HeartBeat.prototype, "HeartBeat");
/**
 * LoginReq
 */
var LoginReq = (function () {
    function LoginReq() {
        this.uid = 0;
        this.nickname = "";
    }
    LoginReq.decode = function (str) {
        return JSON.parse(str);
    };
    LoginReq.encode = function (ins) {
        return LoginReq._REQ_NAME + "#" + JSON.stringify(ins);
    };
    LoginReq._REQ_NAME = "LoginReq";
    return LoginReq;
}());
__reflect(LoginReq.prototype, "LoginReq");
/**
 * EnterRoomReq 进入房间
 */
var EnterRoomReq = (function () {
    function EnterRoomReq() {
        this.uid = 0;
        this.roomid = 0;
    }
    EnterRoomReq.decode = function (str) {
        return JSON.parse(str);
    };
    EnterRoomReq.encode = function (ins) {
        return EnterRoomReq._REQ_NAME + "#" + JSON.stringify(ins);
    };
    EnterRoomReq._REQ_NAME = "EnterRoomReq";
    return EnterRoomReq;
}());
__reflect(EnterRoomReq.prototype, "EnterRoomReq");
/**
 * EnterRoomRsp 进入房间响应
 */
var EnterRoomRsp = (function () {
    function EnterRoomRsp() {
    }
    EnterRoomRsp.decode = function (str) {
        return JSON.parse(str);
    };
    EnterRoomRsp.encode = function (ins) {
        return EnterRoomRsp._REQ_NAME + "#" + JSON.stringify(ins);
    };
    EnterRoomRsp._REQ_NAME = "EnterRoomRsp";
    return EnterRoomRsp;
}());
__reflect(EnterRoomRsp.prototype, "EnterRoomRsp");
/**
 * 网络消息的类，需要在这里注册才能正常处理
 */
var G_Net_Data_Cls = (_a = {},
    _a["HeartBeat"] = HeartBeat,
    _a["EnterRoomRsp"] = EnterRoomRsp,
    _a);
var _a;
//# sourceMappingURL=protocol.js.map