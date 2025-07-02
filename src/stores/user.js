import { defineStore } from 'pinia'
import { login as apiLogin } from '@/service/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userId: '',
    employeeNumber: '',
    name: '',
    role: '',
    departmentId: null,
    departmentName: '',
    permissionLevel: null,
    isAuthenticated: false
  }),

  getters: {
    // 获取用户角色
    userRole: (state) => state.role,
    // 是否是管理员
    isAdmin: (state) => state.role === 'ADMINISTRATOR',
    // 是否是医生
    isDoctor: (state) => state.role === 'DOCTOR',
    // 是否是护士
    isNurse: (state) => state.role === 'NURSE',
    // 获取用户权限等级
    permissions: (state) => state.permissionLevel,
    // 获取用户部门信息
    department: (state) => ({
      id: state.departmentId,
      name: state.departmentName
    })
  },

  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      if (userInfo) {
        this.token = userInfo.token || ''
        this.userId = String(userInfo.userId || '') // 确保userId以字符串形式存储
        this.employeeNumber = userInfo.employeeNumber || ''
        this.name = userInfo.name || ''
        this.role = userInfo.role || ''
        this.departmentId = userInfo.departmentId || null
        this.departmentName = userInfo.departmentName || ''
        this.permissionLevel = userInfo.permissionLevel || null
        this.isAuthenticated = true
      }
    },

    // 清除用户信息
    clearUserInfo() {
      this.token = ''
      this.userId = ''
      this.employeeNumber = ''
      this.name = ''
      this.role = ''
      this.departmentId = null
      this.departmentName = ''
      this.permissionLevel = null
      this.isAuthenticated = false
    },

    // 登录操作
    async login(loginData) {
      try {
        const response = await apiLogin(loginData)
        if (response.data) {
          this.setUserInfo({
            token: response.data.token,
            ...response.data
          })
          return response
        }
      } catch (error) {
        this.clearUserInfo()
        throw error
      }
    },

    // 登出操作
    logout() {
      this.clearUserInfo()
      // 这里可以添加其他登出逻辑，比如重定向到登录页
    }
  },

  // 持久化配置
  persist: {
    // 启用持久化
    enabled: true,
    // 使用localStorage存储
    strategies: [
      {
        key: 'user-store', // 存储的key
        storage: localStorage, // 使用的存储方式
        paths: [ // 需要持久化的数据路径
          'token',
          'userId',
          'employeeNumber',
          'name',
          'role',
          'departmentId',
          'departmentName',
          'permissionLevel',
          'isAuthenticated'
        ]
      }
    ]
  }
}) 