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
 * ENTER_ROOM_EVENT
 */
class ENTER_ROOM_EVENT extends egret.Event {
    public static key : string = "ENTER_ROOM"
    public data : any
    constructor(type:string = ENTER_ROOM_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}

/**
 * HEARTBEAT_EVENT
 */
class HEARTBEAT_EVENT extends egret.Event {
    public static key : string = "HEARTBEAT"
    public data : any
    constructor(type:string = HEARTBEAT_EVENT.key, bubbles:boolean = false, cancelable:boolean = false) {
        super( type, bubbles, cancelable )
    }
}


/**
 * 网络消息的监听事件，需要先在这里注册
 */
let G_Net_Event_List : any = {
    ["HeartBeat"] : HEARTBEAT_EVENT,
    ["EnterRoomRsp"] : ENTER_ROOM_EVENT,
}