class FiveUserHead extends BaseNode{
	public lab_uid:eui.Label;
	public lab_nickname:eui.Label;

	public _chair_id : number

	public constructor() {
		super()

		this.skinName = "resource/skins/room/five/fiveuserhead.exml"

		this.init()
	}

	private init() : void{
		this._chair_id = -1
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
}