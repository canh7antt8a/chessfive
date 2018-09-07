class UserInfoManager {
	public _user_info : PlayerInfo

	public constructor() {
		this._user_info = new PlayerInfo()
		this._user_info.uid = 0
		this._user_info.nickname = ""
	}

	public set_user_info( info:PlayerInfo ){
		this._user_info.uid = info.uid
		this._user_info.nickname = info.nickname
	}

	public get_uid() : number{
		return this._user_info.uid
	}

	public get_nickname() : string{
		return this._user_info.nickname
	}

}