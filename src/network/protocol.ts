/**
 * HeartBeat
 */
class HeartBeat {
    public beats : number
    public static _REQ_NAME = "HeartBeat"
    constructor() {
        this.beats = 0
    }

    public static decode(str : string): HeartBeat{
		return <HeartBeat>JSON.parse( str )
	}

	public static encode( ins : HeartBeat ) : string{
		return HeartBeat._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * LoginReq
 */
class LoginReq {
    public uid : number
    public static _REQ_NAME = "LoginReq"

    public constructor() {
        this.uid = 0
    }

    public static decode(str : string): LoginReq{
		return <LoginReq>JSON.parse( str )
	}

	public static encode( ins : LoginReq ) : string{
		return LoginReq._REQ_NAME + "#" + JSON.stringify( ins )
	}
}


/**
 * PlayerInfo
 */
class PlayerInfo {
    public uid : number
    public nickname : string
    constructor() {}
}

/**
 * LoginRsp 登录响应
 */
class LoginRsp {
    public code : number
	public userInfo : PlayerInfo
    public static _REQ_NAME = "LoginRsp"

    public constructor() {
        
    }

    public static decode(str : string): LoginRsp{
		return <LoginRsp>JSON.parse( str )
	}

	public static encode( ins : LoginRsp ) : string{
		return LoginRsp._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * EnterRoomReq 进入房间
 */
class EnterRoomReq {
    public uid : number
    public roomid : number

    public static _REQ_NAME = "EnterRoomReq"

    constructor() {
        this.uid = 0
        this.roomid = 0
    }

    public static decode(str : string): EnterRoomReq{
		return <EnterRoomReq>JSON.parse( str )
	}

	public static encode( ins : EnterRoomReq ) : string{
		return EnterRoomReq._REQ_NAME + "#" + JSON.stringify( ins )
	}
}


/**
 * RoomInfo
 */
class RoomInfo {
    public roomid : number
    public maxpeople : number
    public roomtype : number
    public crtPlayerNum : number
    constructor() {    }
}

/**
 * RoomPlayer
 */
class RoomPlayer extends PlayerInfo {
    public chairid : number
    public ready : boolean
    constructor() {
        super()
    }
}


/**
 * RoomDetail  房间详情
 */
class RoomDetail extends RoomInfo{
    public players : RoomPlayer[]
    public myChairID : number
    constructor() {
        super()
    }
}

/**
 * EnterRoomRsp 进入房间响应
 */
class EnterRoomRsp {
    public code : number //0 成功，1失败
    public roominfo : RoomDetail

    public static _REQ_NAME = "EnterRoomRsp"
    constructor() {
        
    }

    public static decode(str : string): EnterRoomRsp{
		return <EnterRoomRsp>JSON.parse( str )
	}

	public static encode( ins : EnterRoomRsp ) : string{
		return EnterRoomRsp._REQ_NAME + "#" + JSON.stringify( ins )
	}
}





/**
 * RoomListReq
 */
class RoomListReq {
    public static _REQ_NAME = "RoomListReq"
    constructor() {
        
    }

    public static decode(str : string): RoomListReq{
		return <RoomListReq>JSON.parse( str )
	}

	public static encode( ins : RoomListReq ) : string{
		return RoomListReq._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * RoomListRsp  房间列表响应
 */
class RoomListRsp {
    public roomlist : RoomInfo[]
    public static _REQ_NAME = "RoomListRsp"
    constructor() {
        
    }

    public static decode(str : string): RoomListRsp{
		return <RoomListRsp>JSON.parse( str )
	}

	public static encode( ins : RoomListRsp ) : string{
		return RoomListRsp._REQ_NAME + "#" + JSON.stringify( ins )
	}
}


/**
 * ExitRoomReq  退出房间请求
 */
class ExitRoomReq {
    public uid : number
    public roomid : number

    public static _REQ_NAME = "ExitRoomReq"

    constructor() {
        this.uid = 0
        this.roomid = 0
    }

    public static decode(str : string): ExitRoomReq{
		return <ExitRoomReq>JSON.parse( str )
	}

	public static encode( ins : ExitRoomReq ) : string{
		return ExitRoomReq._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * ExitRoomRsp  退出房间响应
 */
class ExitRoomRsp {
    public code : number

    public static _REQ_NAME = "ExitRoomRsp"

    constructor() {}

    public static decode(str : string): ExitRoomRsp{
		return <ExitRoomRsp>JSON.parse( str )
	}

	public static encode( ins : ExitRoomRsp ) : string{
		return ExitRoomRsp._REQ_NAME + "#" + JSON.stringify( ins )
	}
}


/**
 * ReEnterRoomRsp 断线重连数据
 */
class ReEnterRoomRsp {
    public roomdetail : RoomDetail
    public inroom : boolean
    public fivechessinfo : FiveInfo
    public static _REQ_NAME = "ReEnterRoomRsp"
    constructor() {  }

    public static decode(str : string): ReEnterRoomRsp{
		return <ReEnterRoomRsp>JSON.parse( str )
	}

	public static encode( ins : ReEnterRoomRsp ) : string{
		return ReEnterRoomRsp._REQ_NAME + "#" + JSON.stringify( ins )
	}
}



/**
 * ChatMsg  
 */
class ChatMsg {
    public uid : number
    public roomid : number
    public content : string
    public static _REQ_NAME = "ChatMsg"
    
    constructor() {
    }

    public static decode(str : string): ChatMsg{
		return <ChatMsg>JSON.parse( str )
	}

	public static encode( ins : ChatMsg ) : string{
		return ChatMsg._REQ_NAME + "#" + JSON.stringify( ins )
	}
}


/**
 * FiveDownReq
 */
class FiveDownReq {
    public uid : number
    public roomid : number
    public chairid : number
    public color : number
    public row : number
    public col : number
    public static _REQ_NAME = "FiveDownReq"
    constructor() {}

    public static decode(str : string): FiveDownReq{
		return <FiveDownReq>JSON.parse( str )
	}

	public static encode( ins : FiveDownReq ) : string{
		return FiveDownReq._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * FiveDownRsp
 */
class FiveDownRsp {
    public uid : number
    public roomid : number
    public chairid : number
    public color : number   //1黑 2白
    public row : number
    public col : number
    public code : number
    public nextchair : number
    public static _REQ_NAME = "FiveDownRsp"
    constructor() {}

    public static decode(str : string): FiveDownRsp{
		return <FiveDownRsp>JSON.parse( str )
	}

	public static encode( ins : FiveDownRsp ) : string{
		return FiveDownRsp._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * FiveResult
 */
class FiveResult {
    public winchair : number
    public static _REQ_NAME = "FiveResult"
    constructor() {}
    public static decode(str : string): FiveResult{
		return <FiveResult>JSON.parse( str )
	}

	public static encode( ins : FiveResult ) : string{
		return FiveResult._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * FiveStart
 */
class FiveStart {
    public actionChair : number
    public myColor : number
    public static _REQ_NAME = "FiveStart"
    constructor() {}

    public static decode(str : string): FiveStart{
		return <FiveStart>JSON.parse( str )
	}

	public static encode( ins : FiveStart ) : string{
		return FiveStart._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * FiveReady 五子棋准备
 */
class FiveReady {
    public uid : number
    public roomid : number
    public chairid : number
    public ready : boolean
    constructor() {}
    public static _REQ_NAME = "FiveReady"

    public static decode(str : string): FiveReady{
		return <FiveReady>JSON.parse( str )
	}

	public static encode( ins : FiveReady ) : string{
		return FiveReady._REQ_NAME + "#" + JSON.stringify( ins )
	}
}

/**
 * SomebodyEnterExit 其他玩家进入或退出房间
 */
class SomebodyEnterExit {
    public uid : number
    public roomid : number
    public code : number    //1进入，2退出
    public players : RoomPlayer[]
    public static _REQ_NAME = "SomebodyEnterExit"
    constructor() {
        
    }

    public static decode(str : string): SomebodyEnterExit{
		return <SomebodyEnterExit>JSON.parse( str )
	}

	public static encode( ins : SomebodyEnterExit ) : string{
		return SomebodyEnterExit._REQ_NAME + "#" + JSON.stringify( ins )
	}
}


/**
 * FiveInfo 五子棋的牌局信息
 */
class FiveInfo {
    public chesses : Array<Array<number>>
    public actionchair : number
    public started:boolean
    public mycolor:number
}


/**
 * 网络消息的类，需要在这里注册才能正常处理
 */
let G_Net_Data_Cls : any = {
    ["HeartBeat"] : HeartBeat,
    ["EnterRoomRsp"] : EnterRoomRsp,
    ["RoomListRsp"] : RoomListRsp,
    ["LoginRsp"] : LoginRsp,
    ["ExitRoomRsp"] : ExitRoomRsp,
    ["ReEnterRoomRsp"] : ReEnterRoomRsp,
    ["ChatMsg"] : ChatMsg,
    ["FiveDownRsp"] : FiveDownRsp, 
    ["FiveResult"] : FiveResult,
    ["FiveStart"] : FiveStart,
    ["SomebodyEnterExit"] : SomebodyEnterExit,
    ["FiveReady"] : FiveReady,
}


//客户端加协议的步骤
//1、在此类中加协议
//2、在上面的G_Net_Data_Cls 中加入对应的类
//3、在event.ts 中加入对应的事件
