import Cookies from 'js-cookie'
const imgId='img_info'
const TokenKey = 'Admin-Token'

export const getFiled=()=>{
  return window.localStorage.getItem(imgId)
}
export const setFiled=(data)=>{
  return window.localStorage.setItem(imgId,data)
}
export const reFiled=()=>{
  return window.localStorage.removeItem(imgId)
}
export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  // var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);//设置小于一天的时间
  // Cookies.set('foo', 'bar', {
  //   expires: inFifteenMinutes//不设置默认会话式储存，游览器关闭就删除
  // });
  let str=JSON.stringify(token)
  return sessionStorage.setItem(TokenKey, str)//存储是按照字符串存着，取出来后需要JSON.parse
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

