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
	public nickname : string
    public static _REQ_NAME = "LoginReq"

    public constructor() {
        this.uid = 0
        this.nickname = ""
    }

    public static decode(str : string): LoginReq{
		return <LoginReq>JSON.parse( str )
	}

	public static encode( ins : LoginReq ) : string{
		return LoginReq._REQ_NAME + "#" + JSON.stringify( ins )
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
 * EnterRoomRsp 进入房间响应
 */
class EnterRoomRsp {
    public code : number //0 成功，1失败

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
 * 网络消息的类，需要在这里注册才能正常处理
 */
let G_Net_Data_Cls : any = {
    ["HeartBeat"] : HeartBeat,
    ["EnterRoomRsp"] : EnterRoomRsp,
}