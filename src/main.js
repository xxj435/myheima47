import Vue from 'vue'
import App from './App.vue'
//导入全局样式
import './styles/base.css'
//导入elm
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入store
import store from './store/index.js'
//导入全局过滤器
import '@/filters/filters.js'
//导入全局组件
import xuekeselect from './components/xuekeselect.vue'
import qiyeselect from './components/qiyeselect.vue'
Vue.component('xuekeselect',xuekeselect)
Vue.component('qiyeselect',qiyeselect)

Vue.use(ElementUI);
import router from './router/index'
Vue.config.productionTip = false

new Vue({
  router,
  //vuex挂载
  store,
  render: h => h(App),
}).$mount('#app')
