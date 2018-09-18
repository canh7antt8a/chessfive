class ChatRoomView extends BaseScene{
	public input_content:eui.TextInput;
	public btn_send:eui.Button;
	public chat_list:eui.List;
	public btn_back:eui.Button;

	public _room_info : RoomDetail
	public _chat_model:ChatModel

	public constructor(roominfo:RoomDetail) {
		super()

		this._scene_name = "chatroom"
		this.skinName = "resource/skins/room/chat/chatview.exml"

		this._room_info = roominfo
		this._chat_model = new ChatModel( roominfo )

		this.init()

		this.btn_back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_back_call, this )
		this.btn_send.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_send_call, this )
	}

	public on_add_myself() : void{
		super.on_add_myself()
		g_dispatcher.addEventListener( EXIT_ROOM_EVENT.key, this.exit_room, this )		
		g_dispatcher.addEventListener( CHATMSG_EVENT.key, this.chat_msg, this )
	}

	public on_remove_myself() : void{
		super.on_remove_myself()		
		g_dispatcher.removeEventListener( EXIT_ROOM_EVENT.key, this.exit_room, this )	
		g_dispatcher.removeEventListener( CHATMSG_EVENT.key, this.chat_msg, this )
		
	}

	private init() : void{
		this.chat_list.itemRenderer = ChatItem

		this.chat_list.dataProvider = this._chat_model._chat_array
	}

	private exit_room(evt:EXIT_ROOM_EVENT) : void{
		if(evt.data.code == 0){
			g_main_node.pop_scene(new RoomView())
		}
	}

	private btn_back_call() : void{
		let req : ExitRoomReq = new ExitRoomReq()
		req.roomid = this._chat_model.get_room_id()
		req.uid = g_user_info_mgr.get_uid()
		g_socket.sendData(ExitRoomReq.encode(req))
	}

	private btn_send_call() : void{
		let req : ChatMsg = new ChatMsg()
		req.roomid = this._chat_model.get_room_id()
		req.uid = g_user_info_mgr.get_uid()
		req.content = "fuck you"
		g_socket.sendData(ChatMsg.encode(req))
	}

	private chat_msg(evt:CHATMSG_EVENT) : void{
		g_log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		g_log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		g_log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		g_log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		let rsp : ChatMsg = evt.data
		g_log(rsp.content)

		this._chat_model.on_chat_msg( rsp )
	}
}