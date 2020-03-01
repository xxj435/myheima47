//导入axios
import axios from 'axios'
//导入操作token的js
import {getToken} from '@/utilis/token.js'
//创建一个新的请求拦截
const request=axios.create({
    baseURL:process.env.VUE_APP_URL,
    //自动携带cookie
    withCredentials:true
})

//请求拦截,在以后发请求中就不用一个一个的设置toke了
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  //暴露出去
  export default request