//导入首页子路由
import chart from '../views/index/chart/chart.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import qiye from '../views/index/qiye/qiye.vue'
import xueke from '../views/index/xueke/xueke.vue'
export default [
    {
        path:'chart',
        component:chart,
        meta:{title:'数据概况',roles:['超级管理员','管理员']},
        icon:'el-icon-pie-chart'
    },
    {
        path:'user',
        component:user,
        meta:{title:'用户列表',roles:['超级管理员','管理员']},
        icon:'el-icon-user'
    },
    {
        path:'question',
        component:question,
        meta:{title:'题库列表',roles:['超级管理员','管理员','老师','学生']},
        icon:'el-icon-edit-outline'
    },
    {
        path:'qiye',
        component:qiye,
        meta:{title:'企业列表',roles:['超级管理员','管理员','老师']},
        icon:'el-icon-office-building'
    },
    {
        path:'xueke',
        component:xueke,
        meta:{title:'学科列表',roles:['超级管理员','管理员','老师','学生']},
        icon:'el-icon-notebook-2'
    }
]