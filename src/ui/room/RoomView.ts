class RoomView extends BaseScene{
	public room_list:eui.List;
	public room_data_array:eui.ArrayCollection
	public group_bg:eui.Group;

	public constructor() {
		super()

		this._scene_name = "roomview"
		this.skinName = "resource/skins/room/roomlist.exml"
	}

	/**
	 * 初始化，在BaseScene的加载皮肤文件成功回调on_ui_complete方法中被调用
	 */
	public init() : void{
		super.init();
		this.room_list.itemRenderer = RoomListItem
		this.room_data_array = new eui.ArrayCollection()
		this.room_list.dataProvider = this.room_data_array

		this.adapt_bg( this.group_bg )
	}

	public add_event_listen() : void{
		super.add_event_listen()
		g_dispatcher.addEventListener( ROOM_LIST_EVENT.key, this.room_list_rsp, this )
		g_dispatcher.addEventListener( ENTER_ROOM_EVENT.key, this.enter_room_rsp, this )
	}

	public remove_event_listen() : void{
		super.remove_event_listen()
		g_dispatcher.removeEventListener( ROOM_LIST_EVENT.key, this.room_list_rsp, this )
		g_dispatcher.removeEventListener( ENTER_ROOM_EVENT.key, this.enter_room_rsp, this )
	}

	private init_test_data():void{
		this.room_data_array = new eui.ArrayCollection()
		for(let i = 0; i < 20; i++){
			let data:any = {roomid:10000+i}
			data.index = i
			this.room_data_array.addItem(data)
		}
		this.room_list.dataProvider = this.room_data_array
	}

	/**
	 * 进入界面请求房间列表数据
	 */
	public on_add_myself() : void{
		super.on_add_myself()
		let req : RoomListReq = new RoomListReq()
		g_socket.sendData( RoomListReq.encode( req ) )
	}

	/**
	 * 房间列表事件响应
	 */
	public room_list_rsp(evt:ROOM_LIST_EVENT):void{
		this.room_data_array.removeAll()

		let data : RoomListRsp = evt.data
		let length = data.roomlist.length

		if(length == 0) return

		for(let room of data.roomlist){
			let item:any = {roomid:room.roomid}
			this.room_data_array.addItem(item)
		}
	}

	/**
	 * 进入房间事件响应
	 */
	public enter_room_rsp(evt:ENTER_ROOM_EVENT):void{
		let data : EnterRoomRsp = evt.data
		switch (data.roominfo.roomtype) {
		case RoomType.Chat:
		{
			g_log("data is chat room+++++++++++++++++++++")
			g_main_node.push_scene( new ChatRoomView(data.roominfo) )
			break;
		}
		case RoomType.FiveChess:
		{
			g_log("data is chat room+++++++++++++++++++++")
			g_main_node.push_scene( new FiveChessView(data.roominfo) )
			break;
		}
		default:
			break;
		}
	}
}