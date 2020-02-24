//导入
import axios from 'axios';
//导入操作token的文件
import {getToken} from '@/utilis/token.js'

//克隆一个axios对象出来
let indexRequest=axios.create({
    //基地址
    baseURL:process.env.VUE_APP_URL,
    headers:{
        token:getToken()//从本地存储中读取token
    },
})
//获取登录用户信息
export function info(){
    return indexRequest({
        url:'/info',
        method:'get'
    })
}

//退出
export function logout(){
    return indexRequest({
        url:'/logout',
        method:'get'
    })
}