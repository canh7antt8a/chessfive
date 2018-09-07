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
 * 网络消息的监听事件，需要先在这里注册
 */
let G_Net_Event_List : any = {
    ["HeartBeat"] : HEARTBEAT_EVENT,
    ["EnterRoomRsp"] : ENTER_ROOM_EVENT,
    ["RoomListRsp"] : ROOM_LIST_EVENT,
    ["ExitRoomRsp"] : EXIT_ROOM_EVENT,
    ["LoginRsp"] : LOGIN_RSP_EVENT,
    ["ReEnterRoom"] : RE_ENTERROOM_EVENT,
}