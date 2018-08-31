class BaseScene extends eui.Component{

	public constructor() {
		super()

		this.once( egret.Event.ADDED_TO_STAGE, this.on_add_stage, this )
	}

	public on_add_stage() : void{
		let scaleX = this.stage.stageWidth/SCREEN_WIDTH
		let scaleY = this.stage.stageHeight/SCREEN_HEIGHT

		if(scaleX < scaleY){
			this.scaleX = scaleX
			this.scaleY = scaleX
			this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH
		}else{
			this.scaleX = scaleY
			this.scaleY = scaleY
			this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT
		}
	}
}