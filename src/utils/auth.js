import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const csrfKey = 'x-csrf-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}


export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCsrf() {
  return Cookies.get(csrfKey)
}

export function setCsrf(csrf) {
  return Cookies.set(csrfKey, csrf)
}


export function removeCsrf() {
  return Cookies.remove(csrfKey)
}
export function getrouter() {
  return  [
    // {
    //     path: '/home',
    //     name: 'home',
    //     component:  () =>  import('HomeView') ,
    //     meta: {
    //         title: '首页'
    //     },

    // },

    // {
    //     path: '/day',
    //     name: 'day',
    //     component: () => import('date/dayjs'),
    //     meta: {
    //         title: '时间处理'
    //     },
    // },
    // //定位
    // {
    //     path: '/location',
    //     name: 'location',
    //     component: () => import('location/location'),
    //     meta: {
    //         title: '定位'
    //     },
    
    // },
    // //food
    // {
    //     path: '/food',
    //     name: 'food',
    //     component: () => import('food/index'),
    //     meta: {
    //         title: '食物'
    //     },
    
    // },

]
}
