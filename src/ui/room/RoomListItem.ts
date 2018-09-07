class RoomListItem extends eui.ItemRenderer{
	public lab_roomid:eui.Label;

	public constructor() {
		super()

		this.skinName = "resource/skins/room/roomlistitem.exml"

		this.init()
		this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touch_tap, this )
	}

	private init() : void{

	}

	private touch_tap() : void{
		console.log("touch_tap = ", this.data.roomid)

		let req : EnterRoomReq = new EnterRoomReq()
		req.roomid = this.data.roomid
		req.uid = g_user_info_mgr.get_uid()

		g_socket.sendData( EnterRoomReq.encode(req) )
	}

	public dataChanged() : void{
		this.lab_roomid.text = this.data.roomid.toString()
	}
}