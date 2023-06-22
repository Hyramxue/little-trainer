import Vue from 'vue'
import "@/assets/css/u-reset.css"//清除层叠样式表
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'
import '@/assets/scss/defualt.scss';//自己样式
import '@/assets/scss/mystyle.scss';//自己样式


 
import '@/login' // permission control

import Pagination from "@/components/Pagination";// 分页组件
import ImageUpload from "@/components/ImageUpload";// 图片上传

Vue.prototype.appUrl = process.env.VUE_APP_BASE_SERVER  ;

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('ImageUpload', ImageUpload)

 

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
