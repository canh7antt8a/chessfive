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
var NetStatus;
(function (NetStatus) {
    NetStatus[NetStatus["NOT_INIT"] = 0] = "NOT_INIT";
    NetStatus[NetStatus["CLOSED"] = 1] = "CLOSED";
    NetStatus[NetStatus["OPENED"] = 2] = "OPENED";
})(NetStatus || (NetStatus = {}));
var NetWork = (function (_super) {
    __extends(NetWork, _super);
    function NetWork() {
        var _this = _super.call(this) || this;
        _this._connect_status = NetStatus.NOT_INIT;
        _this._beats = 0;
        _this._methods = {};
        _this.initWebSocket();
        _this.init_call_funcs();
        g_dispatcher.addEventListener(FORGE_GROUND_EVENT.key, _this.forge_ground_callfunc, _this);
        g_dispatcher.addEventListener(BACK_GROUND_EVENT.key, _this.back_ground_callfunc, _this);
        return _this;
    }
    NetWork.prototype.initWebSocket = function () {
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieveData, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        this.socket.connect(NetWork.host, NetWork.port);
    };
    NetWork.prototype.init_call_funcs = function () {
        this._methods["HeartBeat"] = this.heart_beat_rsp;
    };
    /**
     * 重连
     */
    NetWork.prototype.reconnect = function () {
        this.socket.connect(NetWork.host, NetWork.port);
    };
    /**
     * 切回前台回调
     */
    NetWork.prototype.forge_ground_callfunc = function (evt) {
        console.log("forge_ground_callfunc");
        //判断是否需要重连
        if (this._connect_status == NetStatus.CLOSED) {
            this.reconnect();
        }
    };
    /**
     * 切后台回调
     */
    NetWork.prototype.back_ground_callfunc = function (evt) {
        console.log("back_ground_callfunc");
    };
    NetWork.prototype.onRecieveData = function (e) {
        console.log("onRecieveData");
        this.recieveData(this.socket.readUTF());
    };
    NetWork.prototype.start_heartbeat = function () {
        this._heartbeat_timer = new egret.Timer(2000, 0);
        this._heartbeat_timer.addEventListener(egret.TimerEvent.TIMER, this.heartbeat_req, this);
        this._heartbeat_timer.start();
    };
    NetWork.prototype.heartbeat_req = function (event) {
        var heartbeat = new HeartBeat();
        heartbeat.beats = this._beats;
        var json_str = HeartBeat.encode(heartbeat);
        this.sendData(json_str);
        // if (this._beats == 3){
        // 	let req : EnterRoomReq = new EnterRoomReq()
        // 	req.uid = 123456
        // 	req.roomid = 10001
        // 	this.sendData( EnterRoomReq.encode(req) )
        // }
    };
    NetWork.prototype.onSocketOpen = function () {
        console.log("onSocketOpen");
        this._connect_status = NetStatus.OPENED;
        this.start_heartbeat();
        var login_req = new LoginReq();
        login_req.uid = 123456;
        login_req.nickname = "lixiaojie";
        this.sendData(LoginReq.encode(login_req));
    };
    NetWork.prototype.onSocketClose = function () {
        this._connect_status = NetStatus.CLOSED;
        console.log("onSocketClose");
        this._heartbeat_timer.stop();
        this._beats = 0;
    };
    NetWork.prototype.onSocketError = function () {
        this._connect_status = NetStatus.CLOSED;
        console.log("onSocketError");
    };
    NetWork.prototype.sendData = function (msg) {
        if (this._connect_status != NetStatus.OPENED) {
            console.log("can not send data, net not open");
            return;
        }
        this.socket.writeUTF(msg);
    };
    /**
     * 数据处理
     */
    NetWork.prototype.recieveData = function (str) {
        console.log("recieve data : ", str);
        var idx = str.indexOf("#");
        if (idx == -1) {
            console.log("can not found #");
            return;
        }
        var prefix = str.slice(0, idx);
        console.log("prefix = ", prefix);
        var data = str.slice(idx + 1);
        console.log("data = ", data);
        var cls = G_Net_Data_Cls[prefix];
        if (cls) {
            var rsp = cls.decode(data);
            console.log(rsp);
            var call_func = this._methods[prefix];
            if (call_func) {
                call_func(rsp);
            }
            var evt_cls = G_Net_Event_List[prefix];
            if (evt_cls) {
                var evt = new evt_cls();
                evt.data = rsp;
                g_dispatcher.dispatchEvent(evt);
            }
            else {
                console.log("can not found event in G_Net_Event_List : ", prefix);
            }
        }
        else {
            console.log("not found cls in G_Net_Data_Cls : ", prefix);
        }
        // switch (prefix) {
        // 	case "HeartBeat":
        // 		console.log("HeartBeat rsp")
        // 		let heartbeat = HeartBeat.decode( data )
        // 		console.log(heartbeat)
        // 		this._beats = heartbeat.beats
        // 		break;
        // 	case "EnterRoomRsp":
        // 		console.log("EnterRoomRsp rsp")
        // 		let rsp = EnterRoomRsp.decode( data )
        // 		console.log(rsp)
        // 		break;
        // 	default:
        // 		break;
        // }
    };
    NetWork.prototype.heart_beat_rsp = function (data) {
        console.log("heart_beat_rsp");
        this._beats = data.beats;
    };
    NetWork.host = "localhost";
    NetWork.port = 8080;
    return NetWork;
}(eui.Component));
__reflect(NetWork.prototype, "NetWork");
//# sourceMappingURL=network.js.map