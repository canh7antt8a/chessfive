/**
 * 场景的基类，游戏内的场景都需要继承此类
 */
class BaseScene extends eui.Component{

	public _scene_name : string = "base"

	/**
	 * 监听列表
	 */
	public _listen_map : any = {}

	public constructor() {
		super()

		this.horizontalCenter = 0
		this.verticalCenter = 0
		this.once( egret.Event.ADDED_TO_STAGE, this.on_add_stage, this )
		this.once( egret.Event.ADDED, this.on_add, this )
		this.once( egret.Event.REMOVED, this.on_remove, this )
	}

	public on_add_stage(evt:egret.Event) : void{
		let scaleX = this.stage.stageWidth/SCREEN_WIDTH
		let scaleY = this.stage.stageHeight/SCREEN_HEIGHT

		if(scaleX < scaleY){
			this.scaleX = scaleX
			this.scaleY = scaleX
			this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH
		}else{
			this.scaleX = scaleY
			this.scaleY = scaleY
			this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT
		}
	}

	/**
	 * 这个是添加自己或者添加子对象都会调用
	 */
	private on_add(evt:egret.Event) : void{
		if(evt.target == this){
			this.on_add_myself()
		}else{
			//添加子对象
		}
	}

	/**
	 * 进入场景触发事件，子类可重写
	 */
	public on_add_myself() : void{
		this.add_event_listen()
	}

	/**
	 * 删除自己或者删除子对象都会调用这个
	 */
	private on_remove(evt:egret.Event) : void{
		if(evt.target == this){
			this.on_remove_myself()
		}else{
			//删除子对象
		}
	}

	/**
	 * 退出场景触发事件，子类可重写
	 */
	public on_remove_myself() : void{
		this.remove_event_listen()
	}

	public remove_event_listen() : void{
		for(let key in this._listen_map){
			g_dispatcher.removeEventListener( key, this._listen_map[key], this )
		}
	}

	public add_event_listen() : void{
		this._listen_map[LOGIN_RSP_EVENT.key] = this.login_rsp_event
		this._listen_map[SOCKET_OPEN_EVENT.key] = this.connect_suc_rsp
		this._listen_map[RE_ENTERROOM_EVENT.key] = this.re_enterroom_rsp
		for(let key in this._listen_map){
			g_dispatcher.addEventListener( key, this._listen_map[key], this )
		}
	}

	public set_visible(visible:boolean){
		this.visible = visible
		if(visible){
			this.add_event_listen()
		}else{
			this.remove_event_listen()
		}
	}

	/**
	 * 登录响应事件， 子类需要处理的重写此函数
	 */
	public login_rsp_event(evt:LOGIN_RSP_EVENT) : void{}

	/**
	 * 连接服务器成功回应
	 */
	public connect_suc_rsp() : void{
		g_log("LoginView  connect_suc_rsp-------------")

		let uid = g_user_info_mgr.get_uid()
		// let nickname = g_user_info_mgr.get_nickname()

		if(uid == 0) return

		let login_req : LoginReq = new LoginReq()
        login_req.uid = uid

        g_socket.sendData( LoginReq.encode(login_req) )
	}

	/**
	 * 断线重连房间数据
	 */
	public re_enterroom_rsp(evt:RE_ENTERROOM_EVENT) : void{
		g_log("re_enterroom_rsp+++++++++++++++")
		let data : ReEnterRoomRsp = evt.data
		g_log(data)
		if(data.inroom){
			if(data.roomdetail.roomtype == RoomType.Chat){
				g_main_node.replace_scene( new ChatRoomView(data.roomdetail) )
			}else if(data.roomdetail.roomtype == RoomType.FiveChess){
				let five : FiveChessView = new FiveChessView(data.roomdetail)
				five.reconnect_init(data.fivechessinfo)
				g_main_node.replace_scene( five )
			}
		}else{
			if(this._scene_name == "chatroom"){
				g_main_node.replace_scene( new LoginView() )
			}
		}
	}
}