class LoginView extends BaseScene{
	public group_bg:eui.Group;
	public input_id:eui.TextInput;
	public input_psw:eui.TextInput;
	public btn_login:eui.Button;

	public constructor() {
		super()

		this._scene_name = "login"
		this.skinName = "resource/skins/login_view.exml"

		this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_tap, this)

		this.input_id.text = "12345"
		this.input_psw.text = "lixiaojie"
	}

	public add_event_listen() : void{
		super.add_event_listen()
	}

	public remove_event_listen() : void{
		super.remove_event_listen()
	}

	private btn_tap():void{
		g_socket.reconnect()
	}

	public connect_suc_rsp() : void{
		g_log("LoginView  connect_suc_rsp-------------")
		let login_req : LoginReq = new LoginReq()
        login_req.uid = parseInt(this.input_id.text)
        login_req.nickname = this.input_psw.text

        g_socket.sendData( LoginReq.encode(login_req) )
	}

	/**
	 * 登录响应事件回调
	 */
	public login_rsp_event(evt:LOGIN_RSP_EVENT) : void{
		g_user_info_mgr.set_user_info( evt.data.userInfo )
		g_main_node.replace_scene( new RoomView() )
	}

}