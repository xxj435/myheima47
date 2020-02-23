//导入aioxs
import axios from 'axios'

//准备封装请求的方法
//获取手机验证码
export function sendSMS(data){
      return axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data,
        withCredentials:true
    })
}


//注册接口
export function register(data){
   return axios({
        url:process.env.VUE_APP_URL+'/register',
        method:'post',
        data,
        withCredentials:true
    })
}