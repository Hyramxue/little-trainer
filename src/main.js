import "./config";
import Vue from "vue";
import "@/assets/css/u-reset.css"; //清除层叠样式表
import ElementUI from "element-ui";
// import "@/assets/css/index.css"//清除层叠样式表
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/defualt.scss"; //自己样式
import "@/assets/scss/mystyle.scss"; //自己样式
import plugins from "./plugins"; // plugins
 

import "@/login"; // permission control
/**
 * 方法
 */
import { download } from "@/utils/request";
/**
 * 组件
 */
import Pagination from "@/components/Pagination"; // 分页组件
import ImageUpload from "@/components/ImageUpload"; // 图片上传
import ImageUploads from "@/components/ImageUploads"; // 图片上传
import FileUpload from "@/components/FileUpload"; //文件上传
import filetools from "@/components/filetools"; //文件上传
import statistic from "@/components/statistic";

// 引入echarts
Vue.prototype.appUrl = process.env.VUE_APP_BASE_SERVER; //前缀
Vue.prototype.download = download; //下载方法

// 全局组件挂载
Vue.component("Pagination", Pagination);
Vue.component("ImageUpload", ImageUpload);
Vue.component("ImageUploads", ImageUploads);
Vue.component("FileUpload", FileUpload);
Vue.component("filetools", filetools);
Vue.component("statistic", statistic);

Vue.use(plugins);
Vue.use(ElementUI);
 
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
