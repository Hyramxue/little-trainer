import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout';
import js from './js';
import vueDepot from './vueDepot';

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: "",
        component: Layout,

        children: [

            {
                path: '/home',
                name: 'home',
                // component:'HomeView' ,
                component: () => import('@/views/HomeView'),
                meta: {
                    title: '首页'
                },

            },
            //js
            {
                path: 'jsdemo',
                name: 'jsdemo',

                component: () => import("@/views/js/index"),
                meta: {
                    title: 'js小案例'
                },
                children: [
                    ...js
                ]
            },
            //vue
            {
                path: 'vueDepot',
                name: 'vueDepot',

                component: () => import("@/views/childrenRouter"),
                meta: {
                    title: 'vue组件库'
                },
                children: [
                    ...vueDepot
                ]
            },

            //css
            {
                path: 'cssdemo',
                name: 'cssdemo',

                component: () => import("@/views/css/index"),
                meta: {
                    title: 'css小案例'
                },
                children: [
                    {
                        path: 'spring',
                        name: 'spring',
                        component: () => import("@/views/css/spring/spring"),
                        meta: { title: '魔力弹簧', icon: '' }
                    },
                    {
                        path: 'charging',
                        name: 'charging',
                        component: () => import("@/views/css/charging/charging"),
                        meta: { title: '充电', icon: '' }
                    },
                    {
                        path: 'notesHTML',
                        name: 'notesHTML',
                        component: () => import("@/views/css/notes/notesHTML/notesHTML"),
                        meta: { title: '代办HTML', icon: '' }
                    },
                    {
                        path: 'notesElement',
                        name: 'notesElement',
                        component: () => import("@/views/css/notes/notesElement/notes"),
                        meta: { title: '代办Element', icon: '' }
                    },
                ]

            },

            //other
            {
                path: 'other',
                name: 'other',

                component: () => import("@/views/other/index"),
                meta: {
                    title: '其他瞎搞'
                },
                children: [
                    {
                        path: 'mynotice',
                        name: 'mynotice',
                        component: () => import("@/views/other/mynotice/mynotice"),
                        meta: { title: '我的消息', icon: '' }
                    },
                    {
                        path: 'file',
                        name: 'file',
                        component: () => import("@/views/other/file/file"),
                        meta: { title: '文件预览', icon: '' }
                    },
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import('../views/login2.vue'),

    },





]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

export default router
