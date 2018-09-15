class FiveChessView extends BaseScene{

	public static ROW : number = 9
	public static COL : number = 9
	
	public _chess_btn : Array<Array<FiveChess>>
	public _chess_model : FiveChessModel

	public group_base:eui.Group;
	public btn_down:eui.Button;
	public btn_back:eui.Button;
	public head_other:FiveUserHead;
	public head_mine:FiveUserHead;
	public lab_roomid:eui.Label;

	public constructor(roominfo:RoomDetail) {
		super()

		this._scene_name = "login"

		this.skinName = "resource/skins/room/five/fivechess.exml"

		this.init(roominfo)
		this.init_chess_button()
	}

	private init(roominfo:RoomDetail) : void{
		this._chess_btn = new Array<Array<FiveChess>>()
		this._chess_model = new FiveChessModel(roominfo)
		this.btn_down.visible = false

		this.lab_roomid.text = ""+roominfo.roomid
		// this.head_mine.update_info( g_user_info_mgr.get_uid(), g_user_info_mgr.get_nickname() )
		// this.head_mine.chair_id = roominfo.myChairID

		// if(roominfo.players.length == 2){
		// 	for(let pp of roominfo.players){
		// 		if(pp.chairid != roominfo.myChairID){
		// 			this.head_other.update_info( pp.uid, pp.nickname )
		// 			this.head_other.chair_id = pp.chairid
		// 		}
		// 	}
		// }

		this.update_user_head()
	}

	public add_event_listen() : void{
		this.btn_down.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_down_call, this )
		this.btn_back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_back_call, this )

		this._listen_map[FIVE_DOWN_EVENT.key] = this.on_chess_down
		this._listen_map[FIVE_START_EVENT.key] = this.on_start
		this._listen_map[FIVE_RESULT_EVENT.key] = this.on_result
		this._listen_map[EXIT_ROOM_EVENT.key] = this.exit_room
		this._listen_map[OTHER_IN_OUT_EVENT.key] = this.on_somebody_in_out
		
		super.add_event_listen()
	}

	private init_chess_button() : void{
		let w = 80
		let h = 80
		let x = (768-640)/2-w/2
		let y = (1366-640)/2-h/2
		for(let i = 0; i < FiveChessView.ROW; i++){
			let col : Array<FiveChess> = new Array<FiveChess>()
			for(let j = 0; j < FiveChessView.COL; j++){
				let chess : FiveChess = new FiveChess(0, i, j)
				chess.x = x
				chess.y = y
				chess.set_model(this._chess_model)
				this.group_base.addChild(chess)
				col.push(chess)
				x = x + w
			}
			this._chess_btn.push( col )
			x = (768-640)/2-w/2
			y = y + h
		}
	}


	public btn_down_call() : void{
		if(!this._chess_model.can_action){
			return
		}

		this._chess_model.on_confirm_down()
	}

	public btn_back_call() : void{
		let req : ExitRoomReq = new ExitRoomReq()
		req.roomid = this._chess_model.get_room_id()
		req.uid = g_user_info_mgr.get_uid()
		g_socket.sendData(ExitRoomReq.encode(req))
	}

	public on_chess_down(evt:FIVE_DOWN_EVENT):void{
		let data : FiveDownRsp = evt.data

		if(data.code == 1){
			return
		}
		
		this._chess_model.on_chess_down( data )
		this._chess_btn[data.row][data.col].update_color( data.color )

		g_log("@@@@@@   ", this._chess_model.can_action)
		this.btn_down.visible = this._chess_model.can_action
	}

	public on_start(evt:FIVE_START_EVENT):void{
		let data : FiveStart = evt.data

		this._chess_model.started = true

		this._chess_model.action_chair = data.actionChair
		this._chess_model.my_color = data.myColor
		
		this.btn_down.visible = this._chess_model.can_action
	}

	public on_result(evt:FIVE_RESULT_EVENT):void{
		let data : FiveResult = evt.data

		this._chess_model.started = false
	}

	private exit_room(evt:EXIT_ROOM_EVENT) : void{
		if(evt.data.code == 0){
			g_main_node.pop_scene(new RoomView())
		}
	}

	/**
	 * 其他玩家进入或退出
	 */
	private on_somebody_in_out(evt:OTHER_IN_OUT_EVENT) : void{
		let data : SomebodyEnterExit = evt.data
		let player : RoomPlayer 
		

		if(data.code == 1){
			//in
			for(let pp of data.players){
				if(pp.uid == data.uid){
					player = pp
					break
				}
			}
			if(player == null){
				return
			}

			this.head_other.update_info( player.uid, player.nickname )
			this.head_other.chair_id = player.chairid

			this._chess_model.on_somebody_in( player )
			
		}else if(data.code == 2){
			//out
			for(let pp of this._chess_model._players){
				if(pp.uid == data.uid){
					player = pp
					break
				}
			}
			if(player == null){
				return
			}

			this.head_other.update_info( 0, "Empty" )
			this.head_other.chair_id = -1
			this._chess_model.on_somebody_out( player.chairid )
		}

		g_log( "player length = ", this._chess_model._players.length )
		g_log( this._chess_model._players )
		this.update_user_head()
	}

	/**
	 * 玩家更新
	 */
	public update_user_head() : void{
		let players = this._chess_model._players

		for(let pp of players){
			if(pp){
				if(pp.chairid == this._chess_model.my_chairid){
					this.head_mine.update_info( pp.uid, pp.nickname )
					this.head_mine.chair_id = pp.chairid
				}else{
					this.head_other.update_info( pp.uid, pp.nickname )
					this.head_other.chair_id = pp.chairid
				}
			}
		}

		if(players.length == 1){
			this.head_other.update_info( 0, "Empty" )
			this.head_other.chair_id = -1
		}
	}
}