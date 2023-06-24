import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout';

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
                children: [{
                    path: 'day',
                    name: 'day',
      
                    component: () => import('@/views/js/date/dayjs'),
                    meta: {
                        title: '时间处理'
                    },
                },
                //定位
                {
                    path: 'location',
                    name: 'location',
 
                    component: () => import('@/views/js/location/location'),
                    meta: {
                        title: '定位'
                    },

                },
                //food
                {
                    path: 'food',
                    name: 'food',
   
                    component: () => import('@/views/js/food/index'),
                    meta: {
                        title: '食物'
                    },

                },
                //food
                {
                    path: 'charging',
                    name: 'charging',
    
                    component: () => import('@/views/js/charging/index'),
                    meta: {
                        title: '电'
                    },

                },
                //Three.js 
                {
                    path: 'threeJs',
                    name: 'threeJs',
            
                    component: () => import('@/views/js/threeJs/index'),
                    meta: {
                        title: 'Three.js '
                    },

                },
                //ml5
                {
                    path: 'ml5',
                    name: 'ml5',
             
                    component: () => import('@/views/js/ml5/index'),
                    meta: {
                        title: 'ml5'
                    },

                },
                //echarts
                {
                    path: 'echarts',
                    name: 'echarts',
              
                    component: () => import('@/views/js/ml5/index'),
                    meta: {
                        title: 'echarts'
                    },

                },
                //echarts
                {
                    path: 'drawing',
                    name: 'drawing',
                
                    component: () => import('@/views/js/drawing/index'),
                    meta: {
                        title: '画板'
                    },

                },
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


        ]
    },
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import('../views/login.vue'),

    },



]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

export default router
