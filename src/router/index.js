import Vue from 'vue'
//导入index.vue
import login from '../views/login/index.vue'
//导入首页
import index from '../views/index/index.vue'
import { Message } from 'element-ui';
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
//导入token操作
import {removeToken} from '@/utilis/token.js'
// 导入
import {info} from '@/api/index.js'
//导入vuex
import store from '../store/index.js'
// 注册路由
Vue.use(VueRouter)
//实例化
     const routes=[
        {
            path:'/login',
            component:login,
            meta:{title:'登录',roles:['超级管理员','管理员','老师','学生']}
        },
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/index',
            component:index,
            meta:{title:'首页',roles:['超级管理员','管理员','老师','学生']},
            children:[
                {
                    path:'chart',
                    component:chart,
                    meta:{title:'数据概况',roles:['超级管理员','管理员']}
                },
                {
                    path:'user',
                    component:user,
                    meta:{title:'用户列表',roles:['超级管理员','管理员']}
                },
                {
                    path:'question',
                    component:question,
                    meta:{title:'题库列表',roles:['超级管理员','管理员','老师','学生']}
                },
                {
                    path:'qiye',
                    component:qiye,
                    meta:{title:'企业列表',roles:['超级管理员','管理员','老师']}
                },
                {
                    path:'xueke',
                    component:xueke,
                    meta:{title:'学科列表',roles:['超级管理员','管理员','老师','学生']}
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
        if(to.path=='/login'){
            
            next()
        }else{
            info().then(res=>{
                if(res.data.code==200){
                    // console.log(res)
                    //把服务器返回的数据取出来存在vuex中
                    //用户名字
                    store.commit('changeusername',res.data.data.username)
                    //用户头像
                    store.commit('changeavatar',process.env.VUE_APP_URL+'/'+res.data.data.avatar)
                    //用户权限
                    store.commit('changerole',res.data.data.role)
                    //判读该用户是否被禁用
                    if(res.data.data.status==1){
                    //如果没禁用就显示登录成功
                        if(from.path=='/index'){
                            // console.log(from)
                            Message.success('登录成功')
                        }
                        //放行
                        //判断用户的权限
                        //看看用户的权限是否包含该权限
                        if(to.meta.roles.includes(res.data.data.role)){
                            //包含就放行
                            next()
                        }else{
                            //如果不包含就提示
                            Message.error('你无权访问,请与管理员联系')
                            //结束进度条
                            Nprogress.done();
                        }
                    next()
                    }else{
                        Message.warning('账号被禁用,请与管理员联系')
                        Nprogress.done()
                        next('/login')
                    }
                }else{
                    //弹出提升
                    Message.error('请登录')
                    //删除token
                    removeToken();
                    //打回登录页
                    // this.$router.push('/')
                    Nprogress.done();
                    next('/login')
                }
            })
        }
      })

      //后置导航守卫
      router.afterEach(() => {
       Nprogress.done();
      })

//暴露出去
export default router