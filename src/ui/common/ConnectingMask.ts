class ConnectingMask extends BaseNode{
	public group_bg:eui.Group;

	public constructor() {
		super()

		this.skinName = "resource/skins/connect_mask.exml"

		this.group_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)

		this.horizontalCenter = 0
		this.verticalCenter = 0
	}

	public touch(evt:egret.TouchEvent):void{
		evt.stopPropagation()
	}
}