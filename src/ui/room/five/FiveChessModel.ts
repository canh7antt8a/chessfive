class FiveChessModel {

	private _view : FiveChessView

	public _chess_data : number[][]
	public _room_info : RoomDetail

	public _game_started : boolean

	public _my_chairid : number

	public _action_chair : number

	public _crt_row : number
	public _crt_col : number

	public _my_color : number

	public _players : RoomPlayer[]

	public _crt_choose : FiveChess

	public constructor(roominfo:RoomDetail) {
		this._room_info = roominfo
		this._game_started = false
		g_log("@@@@@@@@@@@@@@@@@@  myChairID = ", roominfo.myChairID)
		this._my_chairid = roominfo.myChairID
		this._action_chair = -1
		this._crt_row = -1
		this._crt_col = -1
		this._my_color = 0
		this.init()
	}

	public init() : void{
		this._chess_data = []
		this._players = []
		for(let i = 0; i < FiveChessView.ROW; i++){
			let col : number[] = []
			for(let j = 0; j < FiveChessView.COL; j++){
				col[j] = 0
			}
			this._chess_data[i] = col
		}

		for(let pp of this._room_info.players){
			let temp = new RoomPlayer()
			temp.uid = pp.uid
			temp.nickname = pp.nickname
			temp.chairid = pp.chairid
			temp.ready = pp.ready
			this._players[pp.chairid] = temp
		}
	}

	/**
	 * 清理桌面
	 */
	public clean() : void{
		for(let i = 0; i < FiveChessView.ROW; i++){
			let col : number[] = []
			for(let j = 0; j < FiveChessView.COL; j++){
				col[j] = 0
			}
			this._chess_data[i] = col
		}
		this._action_chair = -1
		this._crt_col = -1
		this._crt_row = -1
		this._my_color = 0
	}

	public set view(v:FiveChessView){
		this._view = v
	}

	public get started() : boolean{
		return this._game_started
	}

	public set started(value:boolean){
		this._game_started = value
	}

	public get action_chair() : number{
		return this._action_chair
	}

	public set action_chair(chair:number){
		this._action_chair = chair
	}

	public get my_chairid() : number{
		return this._my_chairid
	}

	public set my_chairid(chair:number){
		this._my_chairid = chair
	}

	public get can_action() : boolean{
		g_log("fuck you  ", this._my_chairid, this._action_chair)
		return this._my_chairid == this._action_chair
	}

	public get_room_id() : number{
		return this._room_info.roomid
	}


	public set crt_row(row:number){
		this._crt_row = row
	}

	public set crt_col(col:number){
		this._crt_col = col
	}

	public set my_color(color:number){
		this._my_color = color
	}

	public get my_color():number{
		return this._my_color
	}

	public set_chesses(chesses : Array<Array<number>>, chess_btn:Array<Array<FiveChess>>) : void{
		for(let i = 0; i < FiveChessView.ROW; i++){
			for(let j = 0; j < FiveChessView.COL; j++){
				this._chess_data[i][j] = chesses[i][j]
				chess_btn[i][j].update_color( chesses[i][j] )
			}
		}
	}


	public update_choose(row:number, col:number) : void{
		if(this._crt_choose){
			this._crt_choose.update_color(0)
			this._crt_choose = null
		}
		this._crt_row = row
		this._crt_col = col
		this._crt_choose = this._view.get_choose_chess(row, col)
		this._crt_choose.on_choose(this._my_color)
	}

	public on_confirm_down() :void{
		g_log(this._crt_col, this._crt_row, this._my_color)
		if(this._crt_col == -1 || this._crt_row == -1 || this._my_color == 0){
			return
		}
		let req : FiveDownReq = new FiveDownReq()
		req.chairid = this._my_chairid
		req.col = this._crt_col
		req.row = this._crt_row
		req.uid = g_user_info_mgr.get_uid()
		req.roomid = this._room_info.roomid
		req.color = this._my_color

		let msg = FiveDownReq.encode( req )
		g_log( "[[five down]] ", msg )
		g_socket.sendData( msg )
	}



	public on_chess_down(msg:FiveDownRsp):void{
		this._crt_col = -1
		this._crt_row = -1
		this._chess_data[msg.row][msg.col] = msg.color
		this._action_chair = msg.nextchair

		g_log("$$$$$  can i action = ", this.can_action)
	}


	public on_somebody_in(player:RoomPlayer):void{
		let temp : RoomPlayer = new RoomPlayer()
		temp.uid = player.uid
		temp.nickname = player.nickname
		temp.chairid = player.chairid
		this._players[temp.chairid] = temp
	}

	public on_somebody_out(chairid : number) : void{
		this._players[chairid] = null
	}
}