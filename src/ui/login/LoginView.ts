class LoginView extends BaseScene{
	public group_bg:eui.Group;
	public input_id:eui.TextInput;
	public input_psw:eui.TextInput;
	public btn_login:eui.Button;

	public constructor() {
		super()

		this.skinName = "resource/skins/login_view.exml"

		this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_tap, this)
	}

	private btn_tap():void{
		// g_main_node.replace_scene(new testscene())
		g_main_node.addChild( new ConnectingMask() )
	}
}