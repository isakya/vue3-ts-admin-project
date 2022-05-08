import axios from "axios"
import Cookies from "js-cookie"
const instance = axios.create({
  baseURL: 'http://120.24.64.5:8088/mall-admin',
  timeout: 15000
})

// 拦截器
// 请求拦截器
instance.interceptors.request.use(config => {
  let token = Cookies.get('token')
  if(token) {
    // 如果本身有值就自己等于自己，如果没有就为一个空对象，保证有headers这个属性
    config.headers = config.headers || {}
    config.headers.Authorization = token
  }
  return config
},err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(result => {
  return result.data
}, err => {
  return Promise.reject(err)
})

export default instance