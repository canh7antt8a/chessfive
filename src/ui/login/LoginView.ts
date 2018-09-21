class LoginView extends BaseScene{
	public input_id:eui.TextInput;
	public input_psw:eui.TextInput;
	public btn_login:eui.Button;
	public group_bg:eui.Group;

	public constructor() {
		super()

		this._scene_name = "login"
		this.skinName = "resource/skins/login_view.exml"
	}

	/**
	 * 初始化，在BaseScene的加载皮肤文件成功回调on_ui_complete方法中被调用
	 */
	public init() : void{
		super.init();

		this.input_id.text = "10001"
		this.input_psw.text = "lixiaojie"
		this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_tap, this)
		this.adapt_bg( this.group_bg )
	}

	// public add_event_listen() : void{
	// 	super.add_event_listen()
	// }

	// public remove_event_listen() : void{
	// 	super.remove_event_listen()
	// }

	private btn_tap():void{
		g_socket.reconnect()
	}

	public connect_suc_rsp() : void{
		g_log("LoginView  connect_suc_rsp-------------")
		let login_req : LoginReq = new LoginReq()
        login_req.uid = parseInt(this.input_id.text)

        g_socket.sendData( LoginReq.encode(login_req) )
	}

	/**
	 * 登录响应事件回调
	 */
	public login_rsp_event(evt:LOGIN_RSP_EVENT) : void{
		let data : LoginRsp = evt.data;
		if(data.code == 1){
			return
		}
		g_user_info_mgr.set_user_info( evt.data.userInfo )
		g_main_node.replace_scene( new RoomView() )
	}

}