class FiveResultView extends BaseNode{
	public rect_bg:eui.Rect;
	public btn_next:eui.Button;
	public btn_back:eui.Button;
	public lab_winlost:eui.Label;

	public _model : FiveChessModel

	public constructor(winlost :boolean, model : FiveChessModel) {
		super()

		this.skinName = "resource/skins/room/five/fiveresult.exml"

		this._model = model
		this.init(winlost)
	}

	private init(winlost:boolean) : void{
		this.rect_bg.addEventListener( egret.TouchEvent.TOUCH_TAP, this.on_touch_bg, this )
		this.btn_next.addEventListener( egret.TouchEvent.TOUCH_TAP, this.on_btn_next_call, this )
		this.btn_back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.on_btn_back_call, this )

		if(winlost){
			this.lab_winlost.text = "赢了"
		}else{
			this.lab_winlost.text = "输了"			
		}
	}

	private on_touch_bg(evt:egret.TouchEvent) : void{
		evt.stopPropagation()
	}

	private on_btn_next_call() : void{
		let req : FiveReady = new FiveReady()
		req.ready = true
		req.chairid = this._model.my_chairid
		req.roomid = this._model.get_room_id()
		req.uid = g_user_info_mgr.get_uid()
		g_socket.sendData(FiveReady.encode(req))
	}

	private on_btn_back_call() : void{
		let req : ExitRoomReq = new ExitRoomReq()
		req.roomid = this._model.get_room_id()
		req.uid = g_user_info_mgr.get_uid()
		g_socket.sendData(ExitRoomReq.encode(req))
	}
}