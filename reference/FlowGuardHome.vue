<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <el-header class="main-header">
      <div class="header-left">
        <el-icon class="logo-icon"><Monitor /></el-icon>
        <h1 class="platform-title">FlowGuard 智能网络流量安全监控平台</h1>
      </div>
      <div class="header-right">
        <el-divider direction="vertical" class="header-divider" />
        
        <el-dropdown trigger="click">
          <div class="user-info">
            <el-avatar :size="32" class="user-avatar">{{
              userInitial
            }}</el-avatar>
            <span class="username">管理员</span>
            <el-icon class="dropdown-icon"><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <el-dropdown-item>
                <el-icon><User /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><Setting /></el-icon>系统设置
              </el-dropdown-item>
              <el-dropdown-item divided>
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
          <el-tooltip content="实时监控网络流量状态" placement="right" effect="light">
            <el-menu-item index="1" @click="showDashboard">
              <el-icon><DataAnalysis /></el-icon>
              <template #title>
                <span>实时监控</span>
              </template>
            </el-menu-item>
          </el-tooltip>

          <el-tooltip content="分析网络流量数据和趋势" placement="right" effect="light">
            <el-menu-item index="2" @click="showTrafficAnalysis">
              <el-icon><TrendCharts /></el-icon>
              <template #title>
                <span>流量分析</span>
              </template>
            </el-menu-item>
          </el-tooltip>

          <el-tooltip content="检测和管理安全威胁" placement="right" effect="light">
            <el-menu-item index="3" @click="showThreatDetection">
              <el-icon><Warning /></el-icon>
              <template #title>
                <span>威胁检测</span>
              </template>
            </el-menu-item>
          </el-tooltip>

          <el-tooltip content="查看和管理安全告警" placement="right" effect="light">
            <el-menu-item index="4" @click="showAlerts">
              <el-icon><Bell /></el-icon>
              <template #title>
                <span>安全告警</span>

              </template>
            </el-menu-item>
          </el-tooltip>

          <el-tooltip content="配置防火墙规则" placement="right" effect="light">
            <el-menu-item index="5" @click="showFirewallRules">
              <el-icon><Lock /></el-icon>
              <template #title>
                <span>防火墙规则</span>
              </template>
            </el-menu-item>
          </el-tooltip>

          <el-tooltip content="系统配置和参数设置" placement="right" effect="light">
            <el-menu-item index="7" @click="showSystemConfig">
              <el-icon><Setting /></el-icon>
              <template #title>
                <span>系统配置</span>
              </template>
            </el-menu-item>
          </el-tooltip>
        </el-menu>
      </el-aside>

      <!-- 主要内容区域 -->
      <el-main class="main-content">
        <transition name="fade" mode="out-in">
          <div class="content-wrapper" :key="currentMenu">
            <!-- 实时监控组件 -->
            <RealTimeMonitor v-if="currentMenu === '1'" />

            <!-- 流量分析组件 -->
            <TrafficAnalysis v-else-if="currentMenu === '2'" />

            <!-- 威胁检测组件 -->
            <ThreatDetection v-else-if="currentMenu === '3'" />

            <!-- 安全告警组件 -->
            <SecurityAlerts v-else-if="currentMenu === '4'" />

            <!-- 防火墙规则组件 -->
            <FirewallRules v-else-if="currentMenu === '5'" />

            <!-- 系统配置组件 -->
            <SystemConfig v-else-if="currentMenu === '7'" />

            <!-- 其他菜单项的占位内容 -->
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Monitor,
  User,
  Setting,
  SwitchButton,
  CaretBottom,
  DataAnalysis,
  TrendCharts,
  Warning,
  Bell,
  Lock,
} from '@element-plus/icons-vue'
import RealTimeMonitor from './RealTimeMonitor.vue'
import TrafficAnalysis from './TrafficAnalysis.vue'
import ThreatDetection from './ThreatDetection.vue'
import FirewallRules from './FirewallRules.vue'
import SystemConfig from './SystemConfig.vue'
import SecurityAlerts from './SecurityAlerts.vue'

// 响应式数据
const currentMenu = ref('1')
const userInitial = computed(() => '管') // 管理员首字母
const alertCount = ref(5) // 告警数量

// 菜单标题映射
const menuTitleMap = {
  '1': '实时监控',
  '2': '流量分析',
  '3': '威胁检测',
  '4': '安全告警',
  '5': '防火墙规则',
  '7': '系统配置'
}

// 获取菜单标题
const getMenuTitle = (menuIndex) => {
  return menuTitleMap[menuIndex] || '未知功能'
}

// 菜单切换方法
const showDashboard = () => {
  currentMenu.value = '1'
}

const showTrafficAnalysis = () => {
  currentMenu.value = '2'
}

const showThreatDetection = () => {
  currentMenu.value = '3'
}

const showAlerts = () => {
  currentMenu.value = '4'
}

const showFirewallRules = () => {
  currentMenu.value = '5'
}

const showSystemConfig = () => {
  currentMenu.value = '7'
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #1890ff;
}

.side-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border-right: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.menu-badge {
  margin-left: auto;
  margin-right: 12px;
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