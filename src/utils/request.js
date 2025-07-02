import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://116.62.209.93:18081', // API基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从pinia获取token
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 如果返回的code不是200，说明有错误
    if (res.code !== 200) {
      ElMessage({
        message: res.message || '系统错误',
        type: 'error',
        duration: 3000
      })
      return Promise.reject(new Error(res.message || '系统错误'))
    }
    return res
  },
  error => {
    console.error('Response error:', error)
    // 如果是401错误，说明token过期或无效，需要清除用户信息并跳转到登录页
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore()
      userStore.clearUserInfo()
      // 这里可以添加路由跳转到登录页的逻辑
    }
    ElMessage({
      message: error.message || '请求失败',
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

export default service 