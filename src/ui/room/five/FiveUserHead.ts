class FiveUserHead extends BaseNode{
	public lab_uid:eui.Label;
	public lab_nickname:eui.Label;
	public lab_ready:eui.Label;

	public _chair_id : number

	public constructor() {
		super()

		this.skinName = "resource/skins/room/five/fiveuserhead.exml"
	}

	public init() : void{
		this._chair_id = -1
		this.lab_ready.visible = false
	}

	public update_info( uid:number, nickname:string ) : void{
		if(uid == null || uid == 0){
			this.lab_uid.text = "Empty"
		}else{
			this.lab_uid.text = ""+uid
		}
		
		this.lab_nickname.text = nickname
	}

	public set chair_id(chair:number){
		this._chair_id = chair
	}

	public on_user_ready(ready:boolean){
		this.lab_ready.visible = ready
	}
}