import Vue from 'vue'
//导入index.vue
import login from '../views/login/index.vue'
//导入首页
import index from '../views/index/index.vue'
//导入导航守卫
import Nprogress from 'nprogress'
//导入守卫样式
import 'nprogress/nprogress.css'
//导入首页子路由
import chart from '../views/index/chart/chart.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import qiye from '../views/index/qiye/qiye.vue'
import xueke from '../views/index/xueke/xueke.vue'
//导入路由
import VueRouter from 'vue-router'
//注册路由
Vue.use(VueRouter)
//实例化
     const routes=[
        {
            path:'/',
            component:login
        },
        {
            path:'/index',
            component:index,
            children:[
                {
                    path:'chart',
                    component:chart
                },
                {
                    path:'user',
                    component:user
                },
                {
                    path:'question',
                    component:question
                },
                {
                    path:'qiye',
                    component:qiye
                },
                {
                    path:'xueke',
                    component:xueke
                }
            ]
        }
    ]
    const router =new VueRouter({
        routes
    })

    //前置导航守卫
    router.beforeEach((to, from, next) => {
        Nprogress.start();
        next();
      })

      //后置导航守卫
      router.afterEach(() => {
       Nprogress.done();
      })

//暴露出去
export default router