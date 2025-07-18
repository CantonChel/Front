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

/**
 * 科室管理相关API
 */

/**
 * 分页查询科室列表
 * @param {Object} params
 * @param {number} params.current - 当前页码
 * @param {number} params.size - 每页大小
 * @param {string} params.keyword - 搜索关键字
 * @returns {Promise}
 */
export async function getDepartments(params) {
  return await request({
    url: '/api/departments',
    method: 'get',
    params
  })
}

/**
 * 根据ID查询科室详情
 * @param {number} id - 科室ID
 * @returns {Promise}
 */
export async function getDepartmentById(id) {
  return await request({
    url: `/api/departments/${id}`,
    method: 'get'
  })
}

/**
 * 新增科室
 * @param {Object} data - 科室信息
 * @returns {Promise}
 */
export async function createDepartment(data) {
  return await request({
    url: '/api/departments',
    method: 'post',
    data
  })
}

/**
 * 新增科室并设置负责人
 * @param {Object} data - 科室信息
 * @param {number} managerId - 负责人ID
 * @returns {Promise}
 */
export async function createDepartmentWithManager(data, managerId) {
  return await request({
    url: `/api/departments/with-manager?managerId=${managerId}`,
    method: 'post',
    data
  })
}

/**
 * 更新科室信息
 * @param {number} id - 科室ID
 * @param {Object} data - 科室信息
 * @returns {Promise}
 */
export async function updateDepartment(id, data) {
  return await request({
    url: `/api/departments/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除科室
 * @param {number} id - 科室ID
 * @returns {Promise}
 */
export async function deleteDepartment(id) {
  return await request({
    url: `/api/departments/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除科室
 * @param {Array} ids - 科室ID数组
 * @returns {Promise}
 */
export async function batchDeleteDepartments(ids) {
  return await request({
    url: '/api/departments',
    method: 'delete',
    data: ids
  })
}

/**
 * 根据科室编号查询科室
 * @param {string} code - 科室编号
 * @returns {Promise}
 */
export async function getDepartmentByCode(code) {
  return await request({
    url: `/api/departments/code/${code}`,
    method: 'get'
  })
}

/**
 * 检查科室编号是否已存在
 * @param {string} departmentCode - 科室编号
 * @param {number} excludeId - 排除的科室ID
 * @returns {Promise}
 */
export async function checkDepartmentCode(departmentCode, excludeId = null) {
  const params = { departmentCode }
  if (excludeId) {
    params.excludeId = excludeId
  }
  return await request({
    url: '/api/departments/check-code',
    method: 'get',
    params
  })
}

/**
 * 获取所有科室列表（不分页）
 * @returns {Promise}
 */
export async function getAllDepartments() {
  return await request({
    url: '/api/departments/all',
    method: 'get'
  })
}

/**
 * 医生管理相关API
 */

/**
 * 分页查询医生列表
 * @param {Object} params
 * @param {number} params.current - 当前页码
 * @param {number} params.size - 每页大小
 * @param {string} params.keyword - 搜索关键字
 * @returns {Promise}
 */
export async function getDoctors(params) {
  return await request({
    url: '/api/doctors',
    method: 'get',
    params
  })
}

/**
 * 根据ID查询医生详情
 * @param {number} id - 医生ID
 * @returns {Promise}
 */
export async function getDoctorById(id) {
  return await request({
    url: `/api/doctors/${id}`,
    method: 'get'
  })
}

/**
 * 新增医生
 * @param {Object} data - 医生信息
 * @returns {Promise}
 */
export async function createDoctor(data) {
  return await request({
    url: '/api/doctors',
    method: 'post',
    data
  })
}

/**
 * 更新医生信息
 * @param {number} id - 医生ID
 * @param {Object} data - 医生信息
 * @returns {Promise}
 */
export async function updateDoctor(id, data) {
  return await request({
    url: `/api/doctors/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除医生
 * @param {number} id - 医生ID
 * @returns {Promise}
 */
export async function deleteDoctor(id) {
  return await request({
    url: `/api/doctors/${id}`,
    method: 'delete'
  })
}

/**
 * 根据工号查询医生
 * @param {string} employeeNumber - 工号
 * @returns {Promise}
 */
export async function getDoctorByEmployeeNumber(employeeNumber) {
  return await request({
    url: `/api/doctors/employee/${employeeNumber}`,
    method: 'get'
  })
}

/**
 * 检查工号是否已存在
 * @param {string} employeeNumber - 工号
 * @param {number} excludeId - 排除的医生ID
 * @returns {Promise}
 */
export async function checkEmployeeNumber(employeeNumber, excludeId = null) {
  const params = { employeeNumber }
  if (excludeId) {
    params.excludeId = excludeId
  }
  return await request({
    url: '/api/doctors/check-employee-number',
    method: 'get',
    params
  })
}

/**
 * 获取所有医生列表（不分页）
 * @returns {Promise}
 */
export async function getAllDoctors() {
  return await request({
    url: '/api/doctors/all',
    method: 'get'
  })
}

/**
 * 药品管理相关API
 */

/**
 * 分页查询药品批次列表
 * @param {Object} params
 * @param {number} params.current - 当前页码
 * @param {number} params.size - 每页大小
 * @param {string} params.keyword - 搜索关键字
 * @returns {Promise}
 */
export async function getDrugBatches(params) {
  return await request({
    url: '/api/drug-batches',
    method: 'get',
    params
  })
}

/**
 * 根据ID查询药品批次详情
 * @param {number} id - 药品批次ID
 * @returns {Promise}
 */
export async function getDrugBatchById(id) {
  return await request({
    url: `/api/drug-batches/${id}`,
    method: 'get'
  })
}

/**
 * 新增药品批次
 * @param {Object} data - 药品批次信息
 * @returns {Promise}
 */
export async function createDrugBatch(data) {
  return await request({
    url: '/api/drug-batches',
    method: 'post',
    data
  })
}

/**
 * 更新药品批次
 * @param {number} id - 药品批次ID
 * @param {Object} data - 药品批次信息
 * @returns {Promise}
 */
export async function updateDrugBatch(id, data) {
  return await request({
    url: `/api/drug-batches/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除药品批次
 * @param {number} id - 药品批次ID
 * @returns {Promise}
 */
export async function deleteDrugBatch(id) {
  return await request({
    url: `/api/drug-batches/${id}`,
    method: 'delete'
  })
}

/**
 * 获取即将过期的药品批次
 * @param {number} days - 天数阈值
 * @returns {Promise}
 */
export async function getExpiringDrugBatches(days = 30) {
  return await request({
    url: '/api/drug-batches/expiring',
    method: 'get',
    params: { days }
  })
}

/**
 * 获取库存不足的药品批次
 * @param {number} threshold - 库存阈值
 * @returns {Promise}
 */
export async function getLowStockDrugBatches(threshold = 10) {
  return await request({
    url: '/api/drug-batches/low-stock',
    method: 'get',
    params: { threshold }
  })
}

/**
 * 药品入库
 * @param {Object} data - 入库信息
 * @returns {Promise}
 */
export async function drugInbound(data) {
  return await request({
    url: '/api/inbound-records/inbound',
    method: 'post',
    data
  })
}

/**
 * 药品出库
 * @param {Object} data - 出库信息
 * @returns {Promise}
 */
export async function drugOutbound(data) {
  return await request({
    url: '/api/outbound-records/outbound',
    method: 'post',
    data
  })
} 