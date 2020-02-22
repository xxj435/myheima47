import Vue from 'vue'
//导入index.vue
import login from '../views/login/index.vue'
//导入路由
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//实例化
const router =new VueRouter({
    routes:[
        {
            path:'/',
            component:login
        }
    ]
})
//暴露出去
export default router