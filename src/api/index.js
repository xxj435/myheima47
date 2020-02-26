//导入
import axios from 'axios';
//导入操作token的文件
import {getToken} from '@/utilis/token.js'

//克隆一个axios对象出来
let indexRequest=axios.create({
    //基地址
    baseURL:process.env.VUE_APP_URL,
})

//拦截器
// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=getToken()//给每一个请求加上token
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
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