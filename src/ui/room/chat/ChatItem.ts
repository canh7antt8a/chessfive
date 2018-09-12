class ChatItem extends eui.ItemRenderer{
	public lab_content:eui.Label;

	public constructor() {
		super()

		this.skinName = "resource/skins/room/chat/chatitem.exml"
	}

	public dataChanged() : void{
		this.lab_content.text = this.data.content
	}
}