class ChatModel {
	public _chat_record : ChatMsg[]

	public _room_info : RoomDetail
	public _chat_array : eui.ArrayCollection

	public constructor(roomdetail:RoomDetail) {
		this._chat_record = []
		this._room_info = roomdetail
		this._chat_array = new eui.ArrayCollection()
	}

	public on_chat_msg( msg : ChatMsg ) : void{
		this._chat_record.push( msg )
		
		let one : any = {
			content: msg.uid + " 说：" + msg.content
		}
		this._chat_array.addItem(one)
	}

	public clear() : void{
		this._chat_record = []
		this._room_info = null
		this._chat_array.removeAll()
	}

	public get_room_id() : number{
		return this._room_info.roomid
	}

	public get_room_players() : PlayerInfo[] {
		return this._room_info.players
	}
}