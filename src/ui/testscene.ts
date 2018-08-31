class testscene extends BaseScene{
	public btn_1:eui.Button;

	public constructor() {
		super()

		this.skinName = "resource/skins/base.exml"

		this.btn_1.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touch_tap, this )

		g_dispatcher.addEventListener( G_Net_Event_List["EnterRoomRsp"].key, this.enter_room, this )
		g_dispatcher.addEventListener( G_Net_Event_List["HeartBeat"].key, this.heartbeat, this )
	}

	private enter_room(evt:egret.Event) : void{
		console.log("testscene enter_room   ",evt.data)
	}

	private heartbeat(evt:egret.Event) : void{
		console.log("testscene heartbeat   ",evt.data)
	}

	public touch_tap() : void{
		// let req : EnterRoomReq = new EnterRoomReq()
		// req.uid = 123456
		// req.roomid = 10001

		// g_socket.sendData( EnterRoomReq.encode(req) )
		// g_main_node.push_scene(new Test1())
	}
}