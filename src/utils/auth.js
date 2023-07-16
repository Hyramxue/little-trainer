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
 
