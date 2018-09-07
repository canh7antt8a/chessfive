class ChatRoomView extends BaseScene{
	public input_content:eui.TextInput;
	public btn_send:eui.Button;
	public chat_list:eui.List;
	public btn_back:eui.Button;


	public chat_data_array : eui.ArrayCollection

	public _room_info : RoomDetail

	public constructor(roominfo:RoomDetail) {
		super()

		this._scene_name = "chatroom"
		this.skinName = "resource/skins/room/chat/chatview.exml"

		this._room_info = roominfo

		this.init()

		this.btn_back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_back_call, this )
	}

	public on_add() : void{
		super.on_add()
		g_dispatcher.addEventListener( EXIT_ROOM_EVENT.key, this.exit_room, this )		
	}

	public on_remove() : void{
		super.on_remove()		
		g_dispatcher.removeEventListener( EXIT_ROOM_EVENT.key, this.exit_room, this )	
	}

	private init() : void{
		this.chat_list.itemRenderer = ChatItem

		this.chat_data_array = new eui.ArrayCollection()
		this.chat_list.dataProvider = this.chat_data_array
	}

	private exit_room(evt:EXIT_ROOM_EVENT) : void{
		if(evt.data.code == 0){
			g_main_node.pop_scene()
		}
	}

	private btn_back_call() : void{
		let req : ExitRoomReq = new ExitRoomReq()
		req.roomid = this._room_info.roomid
		req.uid = g_user_info_mgr.get_uid()
		g_socket.sendData(ExitRoomReq.encode(req))
	}
}