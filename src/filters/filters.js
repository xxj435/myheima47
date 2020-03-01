//全局过滤器
import Vue from 'vue'
//导入时间插件
import moment from 'moment'
//注册全局过滤器
Vue.filter('formatTime',function(value){
    //value是一个日期,我要处理成年-月-日的形式
    //一般要处理日期这种类型的字符串,还会用一个库.moment.ja
    return moment(value).format('YYYY-MM-DD')
})