
/**
 * 场景的基类，游戏内的场景都需要继承此类
 */
class BaseScene extends eui.Component{

	public _scene_name : string = "base"

	private _bg : eui.Group
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
		this.once( eui.UIEvent.COMPLETE, this.on_ui_complete, this )
	}

	/**
	 * 加载皮肤文件完成的回调函数
	 */
	public on_ui_complete(): void{
		this.init()
	}

	public init() : void{}

	public on_add_stage(evt:egret.Event) : void{
		this.stage.addEventListener( egret.Event.RESIZE, this.resize, this )
		this.resize()
	}

	/**
	 * 这个是添加自己或者添加子对象都会调用
	 */
	private on_add(evt:egret.Event) : void{

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


	/**
	 * 获取缩放比例
	 */
	private get_ui_scale() : number{
		var scale = 0

		var max_ui_ratio = UI_RATIO

		var w = window.innerWidth
		var h = window.innerHeight
		var ratio = w/h

		if(ratio > max_ui_ratio){
			w = h*max_ui_ratio
		}
		
		scale = w/SCREEN_WIDTH

		return scale
	}

	private get_ui_rect() : egret.Rectangle{
		let r = new egret.Rectangle()
		let scale = this.get_ui_scale()
		let w = window.innerWidth/scale
		let h = window.innerHeight/scale
		r.x = 0
		r.y = 0
		r.width = w
		r.height = h

		return r
	}

	private resize():void{
		console.log(window.innerWidth, window.innerHeight)

		// console.log( this.get_ui_scale() )
		// console.log(this.get_ui_rect())

		let offsetx = window.innerWidth/2
		let offsety = window.innerHeight/2
		let scale = this.get_ui_scale()
		this.width = window.innerWidth/scale
		this.height = window.innerHeight/scale
		this.anchorOffsetX = this.width/2
		this.anchorOffsetY = this.height/2
		this.scaleX = scale
		this.scaleY = scale

		if(this._bg){
			this._bg.scaleX = this.width/this._bg.width
			this._bg.scaleY = this.height/this._bg.height
		}
	}

	/**
	 * 背景适应，由子类根据需要调用
	 */
	public adapt_bg(bg:eui.Group) : void{
		this._bg = bg
		bg.scaleX = this.width/bg.width
		bg.scaleY = this.height/bg.height
	}
}