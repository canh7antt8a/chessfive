
/**
 * 全局的一些变量和函数
 */

/**
 * 网络socket
 */
let g_socket : NetWork

/**
 * 事件分发
 */
let g_dispatcher : Dispatcher

/**
 * 根节点
 */
let g_main_node : Main


/**
 * 玩家信息管理
 */
let g_user_info_mgr : UserInfoManager


/**
 * 输出
 */
function g_log(message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams)
}