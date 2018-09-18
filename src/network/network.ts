enum NetStatus {
	NOT_INIT,
	CLOSED,
	OPENED,
}


class NetWork extends eui.Component{
	public socket : egret.WebSocket

	private static host : string = "localhost"
	private static port : number = 8080

	private _connect_status : NetStatus

	private _beats : number
	private _heartbeat_timer : egret.Timer

	private _methods : any

	public constructor() {
		super()

		this._connect_status = NetStatus.NOT_INIT
		this._beats = 0
		this._methods = {}

		this.initWebSocket()
		this.init_call_funcs()

		g_dispatcher.addEventListener( FORGE_GROUND_EVENT.key, this.forge_ground_callfunc, this )
		g_dispatcher.addEventListener( BACK_GROUND_EVENT.key, this.back_ground_callfunc, this )
	}

	private initWebSocket() : void{
		this.socket = new egret.WebSocket()
		this.socket.type = egret.WebSocket.TYPE_STRING

		this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieveData, this)
		this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this)
		this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this)
		this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this)

	}

	private init_call_funcs():void{
		this._methods["HeartBeat"] = this.heart_beat_rsp
		// this._methods["RoomListRsp"] = this.room_list_rsp
	}

	/**
	 * 重连
	 */
	public reconnect() {
		this.socket.connect( NetWork.host, NetWork.port )
	}

	/**
	 * 切回前台回调
	 */
	private forge_ground_callfunc(evt:FORGE_GROUND_EVENT) : void{
		console.log("forge_ground_callfunc")

		//判断是否需要重连
		if(this._connect_status == NetStatus.CLOSED){
			this.reconnect()
		}
	}

	/**
	 * 切后台回调
	 */
	private back_ground_callfunc(evt:BACK_GROUND_EVENT) : void{
		console.log("back_ground_callfunc")
	}


	private onRecieveData(e:egret.ProgressEvent) : void{
		this.recieveData( this.socket.readUTF() )
	}

	private start_heartbeat() : void{
		this._heartbeat_timer = new egret.Timer(2000, 0)
		this._heartbeat_timer.addEventListener( egret.TimerEvent.TIMER, this.heartbeat_req, this )
		this._heartbeat_timer.start()
	}

	private heartbeat_req(event: egret.Event) : void{
		let heartbeat : HeartBeat = new HeartBeat()
		heartbeat.beats = this._beats

		let json_str = HeartBeat.encode( heartbeat )
		this.sendData( json_str )
	}

	private onSocketOpen() : void{
		console.log("onSocketOpen")
		this._connect_status = NetStatus.OPENED

		this.start_heartbeat()

		g_dispatcher.dispatchEvent( new SOCKET_OPEN_EVENT() )
	}        


	private onSocketClose() : void{
		this._connect_status = NetStatus.CLOSED
		console.log("onSocketClose")

		if(this._heartbeat_timer)
			this._heartbeat_timer.stop()
			
		this._beats = 0
	}

	private onSocketError() : void{
		this._connect_status = NetStatus.CLOSED
		console.log("onSocketError")
	}

	public sendData( msg:string ) : void{
		if(this._connect_status != NetStatus.OPENED){
			console.log("can not send data, net not open")
			return
		}
		this.socket.writeUTF( msg )
	}

	/**
	 * 数据处理
	 */
	public recieveData( str:string ) : void{
		let idx = str.indexOf("#")
		if(idx == -1){
			console.log("[[Found Error]] can not found #")
			return
		}

		let prefix : string = str.slice( 0, idx )
		if(prefix != "HeartBeat"){
			console.log("[[TAG]] prefix = ", prefix)
		}

		let data : string = str.slice(idx+1)
		let cls = G_Net_Data_Cls[prefix]

		if(cls){
			g_log("####  11")
			let rsp = cls.decode(data)
			g_log(rsp)
			//在此类里面处理
			let call_func = this._methods[prefix]
			if(call_func){
				call_func(rsp)
			}

			//分发出去处理
			let evt_cls = G_Net_Event_List[prefix]
			if(evt_cls){
				g_log("###  22")
				let evt = new evt_cls()
				evt.data = rsp
				g_dispatcher.dispatchEvent(evt)

			}else{
				console.log("[[Found Warning]] can not found event in G_Net_Event_List : ", prefix)
			}
		}else{
			console.log("[[Found Warning]] can not found cls in G_Net_Data_Cls : ", prefix)
		}
	}

	private heart_beat_rsp(data:HeartBeat) : void{
		this._beats = data.beats
	}
}