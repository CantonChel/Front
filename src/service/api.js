import request from '../utils/request'
import { setToken, setUserInfo, clearAuth } from '../utils/auth'

/**
 * 用户角色枚举
 */
export const UserRole = {
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  ADMINISTRATOR: 'ADMINISTRATOR'
}

/**
 * 用户登录
 * @param {Object} data
 * @param {string} data.employeeNumber - 工号
 * @param {string} data.password - 密码
 * @param {string} data.role - 角色（DOCTOR/NURSE/ADMINISTRATOR）
 * @returns {Promise}
 */
export async function login(data) {
  try {
    const response = await request({
      url: '/api/auth/login',
      method: 'post',
      data
    })

    // 登录成功，保存token和用户信息
    if (response.data) {
      const { token, ...userInfo } = response.data
      setToken(token)
      setUserInfo(userInfo)
    }

    return response
  } catch (error) {
    // 登录失败，清除可能存在的旧认证信息
    clearAuth()
    throw error
  }
}

/**
 * 用户登出
 */
export function logout() {
  clearAuth()
  // 可以在这里添加其他登出逻辑，比如重定向到登录页
} 