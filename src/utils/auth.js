// 用户数据的键名
const TOKEN_KEY = 'token'
const USER_INFO_KEY = 'user_info'

// 存储token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

// 获取token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

// 移除token
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// 存储用户信息
export function setUserInfo(userInfo) {
  // 确保userId作为字符串存储，防止精度丢失
  if (userInfo && userInfo.userId) {
    userInfo.userId = String(userInfo.userId)
  }
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

// 获取用户信息
export function getUserInfo() {
  const userInfo = localStorage.getItem(USER_INFO_KEY)
  return userInfo ? JSON.parse(userInfo) : null
}

// 移除用户信息
export function removeUserInfo() {
  localStorage.removeItem(USER_INFO_KEY)
}

// 清除所有认证信息
export function clearAuth() {
  removeToken()
  removeUserInfo()
}

// 检查是否已登录
export function isAuthenticated() {
  return !!getToken() && !!getUserInfo()
} 