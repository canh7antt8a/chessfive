//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    public _scenes : BaseScene[]
    public _crt_scene : BaseScene

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            console.log("lifecycle onPause")

            if(g_dispatcher){
                let event : BACK_GROUND_EVENT = new BACK_GROUND_EVENT()
                g_dispatcher.dispatchEvent(event)
            }
                
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            console.log("lifecycle onResume")

            if(g_dispatcher){
                let event : FORGE_GROUND_EVENT = new FORGE_GROUND_EVENT()
                g_dispatcher.dispatchEvent( event )
            }
            

            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()

        

        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        g_dispatcher = new Dispatcher()
        g_main_node = this
        this._scenes = new Array<BaseScene>()

        // let test = new testscene()
        // test.horizontalCenter = 0
        // test.verticalCenter = 0
        // this.addChild(test)


        // let ws : NetWork = new NetWork()
        // this.addChild(ws)
        // g_socket = ws

        this.replace_scene(new LoginView())
    }

    /**
     * 切换场景，传入继承BaseScene的类
     */
    public replace_scene( _newscene : BaseScene ) : void{
        if(this._crt_scene == null)
        {
            this.addChild( _newscene )
            this._crt_scene = _newscene
            this._scenes.push(_newscene)
            return
        }

        for (let scene of this._scenes){
            this.removeChild(scene)
        }

        this._scenes = []

        this._scenes.push( _newscene )
        this.addChild(_newscene)
        this._crt_scene = _newscene
    }

    /**
     * 压入场景，之前的场景不移除
     */
    public push_scene( _newscene : BaseScene ) : void{
        if(this._crt_scene == null)
        {
            this.replace_scene(_newscene)
            return
        }

        this._crt_scene.visible = false
        this.addChild(_newscene)
        this._scenes.push(_newscene)
        this._crt_scene = _newscene
    }

    /**
     * 弹出场景移除，加载之前的场景
     */
    public pop_scene( ) : void{
        if(this._crt_scene == null)
            return

        if(this._scenes.length == 1)
        {
            console.log("the last one scene, can not pop")
            return
        }

        let popscene = this._scenes.pop()
        this.removeChild(popscene)

        let showscene = this._scenes[this._scenes.length-1]
        showscene.visible = true
        this._crt_scene = showscene
    }
}
