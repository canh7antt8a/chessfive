class FiveChess extends eui.Image{
	public _color : number
	public _row : number
	public _col : number
	public _model : FiveChessModel

	public constructor(color:number, row:number, col:number) {
		super()

		this._color = color
		this._row = row
		this._col = col
		this.init()
	}

	private init() : void{
		this.update_color( this._color )
		this.scaleX = 0.9
		this.scaleY = 0.9

		this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.on_chess_btn_call, this )
	}

	public update_color( color : number ){
		this._color = color
		if(color == 0){
			if(this._model && this._model.my_color == 1)	
				this.texture = RES.getRes("black_png")
			else
				this.texture = RES.getRes("white_png")			
			
			this.alpha = 0

		}else if(color == 1){

			this.alpha = 1
			this.texture = RES.getRes("black_png")
		}else if(color == 2){

			this.alpha = 1
			this.texture = RES.getRes("white_png")			
		}
	}

	private on_chess_btn_call() : void{
		if(this._color != 0 || !this._model.started || !this._model.can_action) return

		g_log( this._row, this._col )

		this._model.update_choose( this._row, this._col )
	}


	public on_choose(color:number):void{
		if(color == 1)	
			this.texture = RES.getRes("black_png")
		else
			this.texture = RES.getRes("white_png")

		this.alpha = 0.5
	}

	public set_model(model:FiveChessModel){
		this._model = model
	}
}