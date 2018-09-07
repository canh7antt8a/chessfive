class BaseScene extends eui.Component{

	public _scene_name : string = "base"

	public constructor() {
		super()

		this.horizontalCenter = 0
		this.verticalCenter = 0
		this.once( egret.Event.ADDED_TO_STAGE, this.on_add_stage, this )
		this.once( egret.Event.ADDED, this.on_add, this )
		this.once( egret.Event.REMOVED, this.on_remove, this )
	}

	public on_add_stage() : void{
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
	 * 进入场景触发事件，子类可重写
	 */
	public on_add() : void{
		this.add_event_listen()
	}

	/**
	 * 退出场景触发事件，子类可重写
	 */
	public on_remove() : void{
		this.remove_event_listen()
	}

	public remove_event_listen() : void{
		g_dispatcher.removeEventListener( LOGIN_RSP_EVENT.key, this.login_rsp_event, this )
		g_dispatcher.removeEventListener( SOCKET_OPEN_EVENT.key, this.connect_suc_rsp, this )
		g_dispatcher.removeEventListener( RE_ENTERROOM_EVENT.key, this.re_enterroom_rsp, this )
	}

	public add_event_listen() : void{
		g_dispatcher.addEventListener( LOGIN_RSP_EVENT.key, this.login_rsp_event, this )
		g_dispatcher.addEventListener( SOCKET_OPEN_EVENT.key, this.connect_suc_rsp, this )
		g_dispatcher.addEventListener( RE_ENTERROOM_EVENT.key, this.re_enterroom_rsp, this )
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
		let nickname = g_user_info_mgr.get_nickname()

		if(uid == 0 || nickname == "") return

		let login_req : LoginReq = new LoginReq()
        login_req.uid = uid
        login_req.nickname = nickname

        g_socket.sendData( LoginReq.encode(login_req) )
	}

	/**
	 * 断线重连房间数据
	 */
	public re_enterroom_rsp(evt:RE_ENTERROOM_EVENT) : void{
		g_log("re_enterroom_rsp+++++++++++++++")
		let data : ReEnterRoomRsp = evt.data
		if(data.inroom){
			
		}else{
			if(this._scene_name == "chatroom"){
				g_main_node.replace_scene( new LoginView() )
			}
		}
	}
}