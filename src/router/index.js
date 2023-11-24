import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layoutTwo";
import js from "./js";
import vueDepot from "./vueDepot";
import css from "./css";
import other from "./other";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        // component:'HomeView' ,
        component: () => import("@/views/HomeView"),
        meta: {
          title: "首页",
        },
      },
      //js
      {
        ...js,
      },
      { ...vueDepot },
      //css
      { ...css },

      //other
      { ...other },
    ],
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("../views/login2.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
