/**
 * FORGE_GROUND_EVENT 切回前台
 */
class FORGE_GROUND_EVENT extends egret.Event {
    public static key : string = "FORGE_GROUND"
    public data : any
    constructor(type:string = FORGE_GROUND_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * BACK_GROUND_EVENT 切到后台
 */
class BACK_GROUND_EVENT extends egret.Event {
    public static key : string = "BACK_GROUND"
    public data : any
    constructor(type:string = BACK_GROUND_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * LOGIN_RSP_EVENT 登录响应事件
 */
class LOGIN_RSP_EVENT extends egret.Event {
    public static key : string = "LOGIN_RSP"
    public data : any
    constructor(type:string = LOGIN_RSP_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * SOCKET_OPEN_EVENT 连接服务器成功事件
 */
class SOCKET_OPEN_EVENT extends egret.Event {
    public static key : string = "SOCKET_OPEN"
    public data : any
    constructor(type:string = SOCKET_OPEN_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * ENTER_ROOM_EVENT 进入房间响应事件
 */
class ENTER_ROOM_EVENT extends egret.Event {
    public static key : string = "ENTER_ROOM"
    public data : any
    constructor(type:string = ENTER_ROOM_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * OTHER_IN_OUT_EVENT 其他玩家进入或退出房间
 */
class OTHER_IN_OUT_EVENT extends egret.Event {
    public static key : string = "OTHER_IN_OUT"
    public data : any
    constructor(type:string = OTHER_IN_OUT_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}



/**
 * HEARTBEAT_EVENT  心跳
 */
class HEARTBEAT_EVENT extends egret.Event {
    public static key : string = "HEARTBEAT"
    public data : any
    constructor(type:string = HEARTBEAT_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * ROOM_LIST_EVENT  房间列表事件
 */
class ROOM_LIST_EVENT extends egret.Event {
    public static key : string = "ROOM_LIST"
    public data : any
    constructor(type:string = ROOM_LIST_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * EXIT_ROOM_EVENT  房间列表事件
 */
class EXIT_ROOM_EVENT extends egret.Event {
    public static key : string = "EXIT_ROOM"
    public data : any
    constructor(type:string = EXIT_ROOM_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * RE_ENTERROOM_EVENT  断线重连房间信息
 */
class RE_ENTERROOM_EVENT extends egret.Event {
    public static key : string = "RE_ENTERROOM"
    public data : any
    constructor(type:string = RE_ENTERROOM_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * CHATMSG_EVENT  断线重连房间信息
 */
class CHATMSG_EVENT extends egret.Event {
    public static key : string = "CHATMSG"
    public data : any
    constructor(type:string = CHATMSG_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * FIVE_DOWN_EVENT  五子棋下子
 */
class FIVE_DOWN_EVENT extends egret.Event {
    public static key : string = "FIVE_DOWN"
    public data : any
    constructor(type:string = FIVE_DOWN_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * FIVE_RESULT_EVENT  五子棋
 */
class FIVE_RESULT_EVENT extends egret.Event {
    public static key : string = "FIVE_RESULT"
    public data : any
    constructor(type:string = FIVE_RESULT_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * FIVE_START_EVENT  五子棋
 */
class FIVE_START_EVENT extends egret.Event {
    public static key : string = "FIVE_START"
    public data : any
    constructor(type:string = FIVE_START_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * FIVE_READY_EVENT  五子棋ready
 */
class FIVE_READY_EVENT extends egret.Event {
    public static key : string = "FIVE_READY"
    public data : any
    constructor(type:string = FIVE_READY_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * 网络消息的监听事件，需要先在这里注册
 */
let G_Net_Event_List : any = {
    ["HeartBeat"] : HEARTBEAT_EVENT,
    ["EnterRoomRsp"] : ENTER_ROOM_EVENT,
    ["RoomListRsp"] : ROOM_LIST_EVENT,
    ["ExitRoomRsp"] : EXIT_ROOM_EVENT,
    ["LoginRsp"] : LOGIN_RSP_EVENT,
    ["ReEnterRoomRsp"] : RE_ENTERROOM_EVENT,
    ["ChatMsg"] : CHATMSG_EVENT,
    ["FiveDownRsp"] : FIVE_DOWN_EVENT,
    ["FiveResult"] : FIVE_RESULT_EVENT,
    ["FiveStart"] : FIVE_START_EVENT,
    ["SomebodyEnterExit"] : OTHER_IN_OUT_EVENT,
    ["FiveReady"] : FIVE_READY_EVENT,
}