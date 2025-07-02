<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <el-icon class="logo-icon"><HomeFilled /></el-icon>
        <h2>医院管理系统</h2>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <el-form-item prop="employeeNumber">
          <el-input
            v-model="loginForm.employeeNumber"
            placeholder="请输入工号"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="role">
          <el-select
            v-model="loginForm.role"
            placeholder="请选择角色"
            class="role-select"
          >
            <el-option
              v-for="role in roles"
              :key="role.value"
              :label="role.label"
              :value="role.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { HomeFilled, User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref(null)
const loading = ref(false)

// 登录表单数据
const loginForm = reactive({
  employeeNumber: '',
  password: '',
  role: ''
})

// 角色选项
const roles = [
  { label: '医生', value: 'DOCTOR' },
  { label: '护士', value: 'NURSE' },
  { label: '管理员', value: 'ADMINISTRATOR' }
]

// 表单验证规则
const loginRules = {
  employeeNumber: [
    { required: true, message: '请输入工号', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    // 表单验证
    await loginFormRef.value.validate()
    
    loading.value = true
    // 调用登录接口
    await userStore.login(loginForm)
    
    ElMessage({
      type: 'success',
      message: '登录成功'
    })
    
    // 登录成功后跳转到首页
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #409EFF 0%, #2c5282 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.login-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
}

.logo-icon {
  font-size: 32px;
  color: #409EFF;
}

.login-form {
  margin-top: 20px;
}

.role-select {
  width: 100%;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

:deep(.el-input__wrapper) {
  padding: 8px 12px;
}

:deep(.el-input__inner) {
  height: 42px;
}

:deep(.el-form-item__error) {
  padding-top: 4px;
}
</style> 