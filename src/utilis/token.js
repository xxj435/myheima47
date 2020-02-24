//定义一个常量
const TOKENKEY='token'
//获取token
export function getToken(){
   return window.localStorage.getItem(TOKENKEY)
}

//保存token
//它有一个参数,接收token的值
export function setToken(token){
    return window.localStorage.setItem(TOKENKEY,token)
}

//删除token
export function removeToken(){
    window.localStorage.removeItem(TOKENKEY);
}