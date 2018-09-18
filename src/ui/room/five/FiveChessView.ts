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
	public btn_ready:eui.Button;

	public _result_view : FiveResultView

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
		this._chess_model.view = this
		this.btn_down.visible = false
		this.btn_ready.visible = false
		this.update_btn_ready()

		this.lab_roomid.text = ""+roominfo.roomid

		this.head_mine.init()
		this.head_other.init()
		this.update_user_head()

		let timer : egret.Timer = new egret.Timer( 1000, 0 )
		timer.addEventListener( egret.TimerEvent.TIMER, this.test, this )
		timer.start()
	}
	private test() : void{
		g_log("has >>> ", g_dispatcher.hasEventListener(FIVE_START_EVENT.key))
	}

	public reconnect_init(fiveinfo:FiveInfo) : void{
		this._chess_model.my_color = fiveinfo.mycolor
		this._chess_model.action_chair = fiveinfo.actionchair
		this._chess_model.started = fiveinfo.started

		if(fiveinfo.started){
			this._chess_model.set_chesses( fiveinfo.chesses, this._chess_btn )
			this.btn_ready.visible = false
			g_log("@@@  mychair = ", this._chess_model.my_chairid, "   action = ", fiveinfo.actionchair)
			this.btn_down.visible = this._chess_model.can_action
		}else{
			this.update_btn_ready()
		}
	}

	public add_event_listen() : void{
		this.btn_down.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_down_call, this )
		this.btn_back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_back_call, this )
		this.btn_ready.addEventListener( egret.TouchEvent.TOUCH_TAP, this.btn_ready_call, this )

		this._listen_map[FIVE_DOWN_EVENT.key] = this.on_chess_down
		this._listen_map[FIVE_START_EVENT.key] = this.on_start
		this._listen_map[FIVE_RESULT_EVENT.key] = this.on_result
		this._listen_map[EXIT_ROOM_EVENT.key] = this.exit_room
		this._listen_map[OTHER_IN_OUT_EVENT.key] = this.on_somebody_in_out
		this._listen_map[FIVE_READY_EVENT.key] = this.on_user_ready
		
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

	public btn_ready_call() : void{
		g_log("ready call")
		let req : FiveReady = new FiveReady()
		req.ready = true
		req.chairid = this._chess_model.my_chairid
		req.roomid = this._chess_model.get_room_id()
		req.uid = g_user_info_mgr.get_uid()
		g_socket.sendData(FiveReady.encode(req))
	}

	public on_chess_down(evt:FIVE_DOWN_EVENT):void{
		let data : FiveDownRsp = evt.data

		if(data.code == 1){
			return
		}
		
		this._chess_model.on_chess_down( data )
		this._chess_btn[data.row][data.col].update_color( data.color )

		this._chess_model._crt_choose = null
		g_log("@@@@@@   ", this._chess_model.can_action)
		this.btn_down.visible = this._chess_model.can_action
	}

	public on_start(evt:FIVE_START_EVENT):void{
		g_log("###  on_start")

		let data : FiveStart = evt.data
		if(data == null){
			g_log("data is null")
			return
		}
		g_log(data)
		this._chess_model.started = true

		this._chess_model.action_chair = data.actionChair
		this._chess_model.my_color = data.myColor
		
		this.btn_down.visible = this._chess_model.can_action

		this.head_mine.on_user_ready(false)
		this.head_other.on_user_ready(false)

		for(let pp of this._chess_model._players){
			pp.ready = false
		}

		g_dispatcher.dispatchEvent( new FIVE_START_EVENT() )
	}

	public on_result(evt:FIVE_RESULT_EVENT):void{
		let data : FiveResult = evt.data

		this._chess_model.started = false

		if(this._result_view){
			this.removeChild( this._result_view )
			this._result_view = null
		}

		this._result_view = new FiveResultView( data.winchair == this._chess_model.my_chairid, this._chess_model )
		this.addChild(this._result_view)
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

	public update_btn_ready() : void{
		for(let pp of this._chess_model._players){
			if(pp.uid == g_user_info_mgr.get_uid()){
				this.btn_ready.visible = !pp.ready
				break
			}
		}
	}

	/**
	 * 玩家更新
	 */
	public update_user_head() : void{
		let players = this._chess_model._players
		g_log(this._chess_model._players)
		for(let pp of players){
			if(pp){
				g_log("++++++++++  ready = ", pp.ready)
				if(pp.chairid == this._chess_model.my_chairid){
					this.head_mine.update_info( pp.uid, pp.nickname )
					this.head_mine.chair_id = pp.chairid
					this.head_mine.on_user_ready(pp.ready)
				}else{
					this.head_other.update_info( pp.uid, pp.nickname )
					this.head_other.chair_id = pp.chairid
					this.head_other.on_user_ready(pp.ready)
				}
			}
		}

		if(players.length == 1){
			this.head_other.update_info( 0, "Empty" )
			this.head_other.chair_id = -1
		}
	}

	/**
	 * 玩家准备
	 */
	private on_user_ready(evt:FIVE_READY_EVENT):void{
		let data : FiveReady = evt.data
		
		if(data.uid == g_user_info_mgr.get_uid()){
			this.btn_ready.visible = !data.ready
			this.head_mine.on_user_ready(data.ready)
			
			this.clean_table()
		}else{
			this.head_other.on_user_ready(data.ready)
		}
	}

	public clean_table() : void{
		if(this._result_view){
			this.removeChild(this._result_view)
			this._result_view = null
			// this._result_view.visible = false
		}
		this._chess_model.clean()
		for(let i = 0; i < FiveChessView.ROW; i++){
			for(let j = 0; j < FiveChessView.COL; j++){
				this._chess_btn[i][j].update_color(0)
			}
		}

		this.btn_down.visible = this._chess_model.can_action
	}




	public get_choose_chess(row:number, col:number):FiveChess{
		return this._chess_btn[row][col]
	}
}