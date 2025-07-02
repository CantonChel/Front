import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

// 路由配置
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HospitalHome.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 检查路由是否需要认证
  if (to.meta.requiresAuth) {
    // 如果需要认证且用户未登录，重定向到登录页
    if (!userStore.isAuthenticated) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    // 如果用户已登录且试图访问登录页，重定向到首页
    if (to.name === 'Login' && userStore.isAuthenticated) {
      next({ name: 'Home' })
    } else {
      next()
    }
  }
})

export default router 