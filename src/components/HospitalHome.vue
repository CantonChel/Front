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
          </template>
        </el-menu>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-main class="main-content">
        <transition name="fade" mode="out-in">
          <div class="content-wrapper" :key="currentMenu">
            <!-- 占位内容 -->
            <div class="placeholder-content">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
} from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const currentMenu = ref('1')

// 用户信息计算属性
const userInitial = computed(() => userStore.name ? userStore.name.charAt(0) : 'U')
const userName = computed(() => userStore.name || '未知用户')

// 菜单标题映射
const menuTitleMap = {
  '1': '患者就诊',
  '2': '患者开药',
  '3': '人事管理',
  '4': '药品管理',
  '5': '处方管理'
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
}
</style> 