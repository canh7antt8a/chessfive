class ChatItem extends eui.ItemRenderer{
	public lab_content:eui.Label;

	public constructor() {
		super()
	}

	public dataChanged() : void{
		this.lab_content.text = this.data.content
	}
}