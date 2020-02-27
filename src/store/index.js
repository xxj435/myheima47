//放vuex代码
import Vue from 'vue'
//导入vuex
import Vuex from 'vuex'
//注册vuex
Vue.use(Vuex)
//实例化vuex
const store=new Vuex.Store({
  //放数据
  state:{
//用户名:
username:'',
//头像,
avatar:''
  },
  //放方法
  mutations:{
    //保存用户名方法
    changeusername(state,val){
        state.username=val
    },
    changeavatar(state,val){
        state.avatar=val
    }
  }
})
//暴露出去
export default store