import axios, { type Method } from 'axios'
import { useUserInfoStore } from '@/stores'
import { showToast } from 'vant'
import router from '@/router'

// 创建axios实例
const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 10000
})
// 请求拦截器
// 有token时携带token
instance.interceptors.request.use(
  (config) => {
    const store = useUserInfoStore()
    if (store.userInfo?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.userInfo.token}`
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

// 响应拦截器
// 对响应的数据进行预处理
// http状态码为200 及响应的code为10000表示请求响应成功
// http状态码为401跳转login页面
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 10000) {
      res = res.data
    } else {
      showToast({
        type: 'fail',
        message: res.data.message || '网络异常'
      })
      return Promise.reject(res.data)
    }
    return res
  },
  (err) => {
    if (err.response.status === 401) {
      const store = useUserInfoStore()
      store.delUserInfo()
      router.push({ path: '/login', query: { returnUrl: router.currentRoute.value.fullPath } })
    }
    return Promise.reject(err)
  }
)

// 封装请求工具函数
type Data<T> = {
  code: number
  message: string
  data: T
}
const request = <T>(url: string, method: Method, data: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

export { baseURL, instance, request }
