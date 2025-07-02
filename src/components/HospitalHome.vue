<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <el-header class="main-header">
      <div class="header-left">
        <el-icon class="logo-icon"><HomeFilled /></el-icon>
        <h1 class="platform-title">医院管理系统</h1>
      </div>
      <div class="header-right">
        <el-divider direction="vertical" class="header-divider" />
        
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="user-info">
            <el-avatar :size="32" class="user-avatar">{{
              userInitial
            }}</el-avatar>
            <span class="username">{{ userName }}</span>
            <el-icon class="dropdown-icon"><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <el-icon><Setting /></el-icon>系统设置
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <div class="main-container">
      <!-- 左侧边栏 -->
      <el-aside width="260px" class="main-sidebar">
        <el-menu
          v-model="currentMenu"
          class="side-menu"
          :default-active="currentMenu"
        >
          <!-- 根据用户角色显示不同的菜单项 -->
          <template v-if="userStore.isDoctor">
            <el-tooltip content="患者就诊管理" placement="right" effect="light">
              <el-menu-item index="1" @click="showPatientVisit">
                <el-icon><FirstAidKit /></el-icon>
                <template #title>
                  <span>患者就诊</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="患者开药管理" placement="right" effect="light">
              <el-menu-item index="2" @click="showPrescription">
                <el-icon><Notebook /></el-icon>
                <template #title>
                  <span>患者开药</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="处方记录管理" placement="right" effect="light">
              <el-menu-item index="5" @click="showPrescriptionManagement">
                <el-icon><Document /></el-icon>
                <template #title>
                  <span>处方管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="科室管理" placement="right" effect="light">
              <el-menu-item index="6" @click="showDepartmentManagement">
                <el-icon><OfficeBuilding /></el-icon>
                <template #title>
                  <span>科室管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>
          </template>

          <template v-if="userStore.isNurse">
            <el-tooltip content="患者就诊管理" placement="right" effect="light">
              <el-menu-item index="1" @click="showPatientVisit">
                <el-icon><FirstAidKit /></el-icon>
                <template #title>
                  <span>患者就诊</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="药品库存管理" placement="right" effect="light">
              <el-menu-item index="4" @click="showDrugManagement">
                <el-icon><Box /></el-icon>
                <template #title>
                  <span>药品管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="科室管理" placement="right" effect="light">
              <el-menu-item index="6" @click="showDepartmentManagement">
                <el-icon><OfficeBuilding /></el-icon>
                <template #title>
                  <span>科室管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>
          </template>

          <template v-if="userStore.isAdmin">
            <el-tooltip content="医院人事管理" placement="right" effect="light">
              <el-menu-item index="3" @click="showHR">
                <el-icon><User /></el-icon>
                <template #title>
                  <span>人事管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="药品库存管理" placement="right" effect="light">
              <el-menu-item index="4" @click="showDrugManagement">
                <el-icon><Box /></el-icon>
                <template #title>
                  <span>药品管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>

            <el-tooltip content="科室管理" placement="right" effect="light">
              <el-menu-item index="6" @click="showDepartmentManagement">
                <el-icon><OfficeBuilding /></el-icon>
                <template #title>
                  <span>科室管理</span>
                </template>
              </el-menu-item>
            </el-tooltip>
          </template>
        </el-menu>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-main class="main-content">
        <transition name="fade" mode="out-in">
          <div class="content-wrapper" :key="currentMenu">
            <!-- 科室管理页面 -->
            <div v-if="currentMenu === '6'" class="department-management">
              <div class="page-header">
                <h2 class="page-title">科室管理</h2>
                <el-button type="primary" @click="showAddDepartmentDialog">
                  <el-icon><Plus /></el-icon>新增科室
                </el-button>
              </div>

              <!-- 搜索栏 -->
              <div class="search-bar">
                <el-input
                  v-model="searchKeyword"
                  placeholder="请输入科室名称或编号搜索"
                  style="width: 300px"
                  clearable
                  @keyup.enter="handleSearch"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="resetSearch">重置</el-button>
              </div>

              <!-- 科室列表 -->
              <el-table
                :data="departmentList"
                v-loading="loading"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="departmentCode" label="科室编号" width="120" />
                <el-table-column prop="departmentName" label="科室名称" width="150" />
                <el-table-column prop="managerName" label="负责人" width="120" />
                <el-table-column prop="bedCount" label="床位数" width="100" />
                <el-table-column prop="phone" label="联系电话" width="150" />
                <el-table-column prop="description" label="描述" show-overflow-tooltip />
                <el-table-column label="操作" width="200" fixed="right">
                  <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 分页 -->
              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="pagination.current"
                  v-model:page-size="pagination.size"
                  :page-sizes="[10, 20, 50, 100]"
                  :total="pagination.total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>

            <!-- 其他功能占位内容 -->
            <div v-else class="placeholder-content">
              <el-empty 
                :description="`${getMenuTitle(currentMenu)}功能开发中...`"
                :image-size="150"
              >
                <el-button type="primary">敬请期待</el-button>
              </el-empty>
            </div>
          </div>
        </transition>
      </el-main>
    </div>

    <!-- 新增/编辑科室对话框 -->
    <el-dialog
      v-model="departmentDialogVisible"
      :title="isEdit ? '编辑科室' : '新增科室'"
      width="600px"
      @close="resetForm"
    >
      <el-form
        ref="departmentFormRef"
        :model="departmentForm"
        :rules="departmentRules"
        label-width="100px"
      >
        <el-form-item label="科室编号" prop="departmentCode">
          <el-input
            v-model="departmentForm.departmentCode"
            placeholder="请输入科室编号"
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="科室名称" prop="departmentName">
          <el-input
            v-model="departmentForm.departmentName"
            placeholder="请输入科室名称"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="managerName">
          <el-input
            v-model="departmentForm.managerName"
            placeholder="请输入负责人姓名"
          />
        </el-form-item>
        <el-form-item label="床位数" prop="bedCount">
          <el-input-number
            v-model="departmentForm.bedCount"
            :min="0"
            :max="999"
            placeholder="请输入床位数"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="departmentForm.phone"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="departmentForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入科室描述"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="departmentDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitLoading">
            {{ isEdit ? '更新' : '创建' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  HomeFilled,
  User,
  Setting,
  SwitchButton,
  CaretBottom,
  FirstAidKit,
  Notebook,
  Box,
  Document,
  OfficeBuilding,
  Plus,
  Search,
} from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  checkDepartmentCode
} from '../service/api'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const currentMenu = ref('6') // 默认显示科室管理

// 科室管理相关数据
const loading = ref(false)
const departmentList = ref([])
const searchKeyword = ref('')
const selectedDepartments = ref([])

// 分页数据
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

// 对话框相关
const departmentDialogVisible = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const departmentFormRef = ref()

// 表单数据
const departmentForm = reactive({
  id: null,
  departmentCode: '',
  departmentName: '',
  managerId: null,
  managerName: '',
  bedCount: 0,
  phone: '',
  description: ''
})

// 表单验证规则
const departmentRules = {
  departmentCode: [
    { required: true, message: '请输入科室编号', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  departmentName: [
    { required: true, message: '请输入科室名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  bedCount: [
    { required: true, message: '请输入床位数', trigger: 'blur' },
    { type: 'number', min: 0, message: '床位数不能小于0', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的电话号码', trigger: 'blur' }
  ]
}

// 用户信息计算属性
const userInitial = computed(() => userStore.name ? userStore.name.charAt(0) : 'U')
const userName = computed(() => userStore.name || '未知用户')

// 菜单标题映射
const menuTitleMap = {
  '1': '患者就诊',
  '2': '患者开药',
  '3': '人事管理',
  '4': '药品管理',
  '5': '处方管理',
  '6': '科室管理'
}

// 获取菜单标题
const getMenuTitle = (menuIndex) => {
  return menuTitleMap[menuIndex] || '未知功能'
}

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      // 处理个人中心
      break
    case 'settings':
      // 处理系统设置
      break
    case 'logout':
      handleLogout()
      break
  }
}

// 处理登出
const handleLogout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      userStore.logout()
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '已安全退出登录'
      })
    })
    .catch(() => {})
}

// 菜单切换方法
const showPatientVisit = () => {
  currentMenu.value = '1'
}

const showPrescription = () => {
  currentMenu.value = '2'
}

const showHR = () => {
  currentMenu.value = '3'
}

const showDrugManagement = () => {
  currentMenu.value = '4'
}

const showPrescriptionManagement = () => {
  currentMenu.value = '5'
}

const showDepartmentManagement = () => {
  currentMenu.value = '6'
  loadDepartments()
}

// 科室管理相关方法
const loadDepartments = async () => {
  loading.value = true
  try {
    const params = {
      current: pagination.current,
      size: pagination.size
    }
    if (searchKeyword.value) {
      params.keyword = searchKeyword.value
    }
    
    const response = await getDepartments(params)
    departmentList.value = response.data.records || []
    pagination.total = response.data.total || 0
  } catch (error) {
    console.error('加载科室列表失败:', error)
    ElMessage.error('加载科室列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.current = 1
  loadDepartments()
}

const resetSearch = () => {
  searchKeyword.value = ''
  pagination.current = 1
  loadDepartments()
}

const handleSizeChange = (size) => {
  pagination.size = size
  pagination.current = 1
  loadDepartments()
}

const handleCurrentChange = (current) => {
  pagination.current = current
  loadDepartments()
}

const handleSelectionChange = (selection) => {
  selectedDepartments.value = selection
}

const showAddDepartmentDialog = () => {
  isEdit.value = false
  departmentDialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  Object.assign(departmentForm, row)
  departmentDialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除科室"${row.departmentName}"吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    await deleteDepartment(row.id)
    ElMessage.success('删除成功')
    loadDepartments()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除科室失败:', error)
      ElMessage.error('删除科室失败')
    }
  }
}

const resetForm = () => {
  departmentFormRef.value?.resetFields()
  Object.assign(departmentForm, {
    id: null,
    departmentCode: '',
    departmentName: '',
    managerId: null,
    managerName: '',
    bedCount: 0,
    phone: '',
    description: ''
  })
}

const submitForm = async () => {
  if (!departmentFormRef.value) return
  
  try {
    await departmentFormRef.value.validate()
    submitLoading.value = true
    
    if (isEdit.value) {
      await updateDepartment(departmentForm.id, departmentForm)
      ElMessage.success('更新成功')
    } else {
      await createDepartment(departmentForm)
      ElMessage.success('创建成功')
    }
    
    departmentDialogVisible.value = false
    loadDepartments()
  } catch (error) {
    console.error('提交表单失败:', error)
    ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
  } finally {
    submitLoading.value = false
  }
}

// 页面加载时获取科室列表
onMounted(() => {
  if (currentMenu.value === '6') {
    loadDepartments()
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  letter-spacing: 0.3px;
}

/* 顶部导航栏样式 */
.main-header {
  backdrop-filter: blur(12px);
  background: linear-gradient(135deg, #409EFF 0%, #2c5282 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  font-size: 28px;
  color: #ffffff;
}

.platform-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-divider {
  height: 24px;
  margin: 0 8px;
  border-color: rgba(255, 255, 255, 0.3);
}

/* 用户信息样式 */
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 24px;
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.user-info:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-avatar {
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.username {
  margin: 0 8px;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
}

.dropdown-icon {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

/* 主容器样式 */
.main-container {
  display: flex;
  margin-top: 64px;
  min-height: calc(100vh - 64px);
}

/* 侧边栏样式 */
.main-sidebar {
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  padding: 24px 0;
  overflow-y: auto;
  transition: all 0.3s;
  z-index: 999;
}

/* 菜单样式 */
.side-menu {
  border-right: none;
}

.side-menu :deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
  margin: 4px 12px;
  font-size: 15px;
  border-radius: 8px;
  padding-left: 12px !important;
  transition: all 0.3s;
}

.side-menu :deep(.el-menu-item:hover) {
  background-color: #f0f9ff;
  color: #409EFF;
}

.side-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, #409EFF 0%, #2c5282 100%);
  color: #ffffff;
  border-right: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

/* 主内容区样式 */
.main-content {
  margin-left: 260px;
  padding: 28px;
  background-color: #f0f2f5;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.content-wrapper {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 科室管理页面样式 */
.department-management {
  min-height: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

/* 表格样式优化 */
.department-management :deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.department-management :deep(.el-table th) {
  background-color: #fafafa;
  font-weight: 600;
  color: #303133;
}

.department-management :deep(.el-table td) {
  padding: 12px 0;
}

/* 按钮样式优化 */
.department-management .el-button {
  border-radius: 6px;
  font-weight: 500;
}

.department-management .el-button--small {
  padding: 6px 12px;
  font-size: 12px;
}

/* 占位内容样式 */
.placeholder-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式布局 */
@media screen and (max-width: 1200px) {
  .platform-title {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .username {
    display: none;
  }
  
  .platform-title {
    font-size: 16px;
  }
  
  .main-sidebar {
    width: 240px;
  }
  
  .main-content {
    margin-left: 240px;
    padding: 16px;
  }
  
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style> 