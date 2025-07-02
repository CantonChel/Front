# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# 医院管理系统

一个基于Vue 3 + Element Plus的现代化医院管理系统。

## 功能特性

### 用户管理
- 多角色登录（医生、护士、管理员）
- 用户认证和授权
- 个人信息管理

### 科室管理（管理员功能）
- 科室列表展示
- 新增科室
- 编辑科室信息
- 删除科室
- 科室搜索
- 分页显示

### 其他功能（开发中）
- 患者就诊管理
- 患者开药管理
- 处方管理
- 药品管理
- 人事管理

## 技术栈

- **前端框架**: Vue 3
- **UI组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router
- **HTTP客户端**: Axios
- **构建工具**: Vite

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 科室管理功能说明

### 访问方式
1. 使用管理员账号登录系统
2. 在左侧菜单中点击"科室管理"
3. 进入科室管理页面

### 功能操作
- **查看科室列表**: 页面默认显示所有科室信息
- **搜索科室**: 在搜索框中输入科室名称或编号进行搜索
- **新增科室**: 点击"新增科室"按钮，填写科室信息
- **编辑科室**: 在科室列表中点击"编辑"按钮
- **删除科室**: 在科室列表中点击"删除"按钮

### 科室信息字段
- **科室编号**: 唯一标识符，创建后不可修改
- **科室名称**: 科室的显示名称
- **负责人**: 科室负责人姓名
- **床位数**: 科室可用床位数
- **联系电话**: 科室联系电话
- **描述**: 科室详细描述

## API接口

系统使用以下API接口进行科室管理：

- `GET /api/departments` - 分页查询科室列表
- `GET /api/departments/{id}` - 根据ID查询科室详情
- `POST /api/departments` - 新增科室
- `PUT /api/departments/{id}` - 更新科室信息
- `DELETE /api/departments/{id}` - 删除科室
- `GET /api/departments/check-code` - 检查科室编号是否已存在
- `GET /api/departments/all` - 获取所有科室列表

## 项目结构

```
src/
├── components/          # 组件目录
│   └── HospitalHome.vue # 主页面组件（包含科室管理）
├── service/            # API服务
│   └── api.js         # API接口定义
├── stores/            # 状态管理
│   └── user.js        # 用户状态管理
├── utils/             # 工具函数
│   ├── auth.js        # 认证工具
│   └── request.js     # HTTP请求工具
├── views/             # 页面视图
│   └── Login.vue      # 登录页面
└── router/            # 路由配置
    └── index.js       # 路由定义
```

## 开发说明

### 添加新功能
1. 在`src/service/api.js`中添加API接口
2. 在`src/components/HospitalHome.vue`中添加对应的UI组件
3. 在侧边栏菜单中添加新的菜单项

### 样式规范
- 使用Element Plus组件库
- 遵循响应式设计原则
- 保持统一的视觉风格

## 注意事项

- 科室编号创建后不可修改
- 删除科室前需确保没有关联的医生
- 管理员角色才能访问科室管理功能
- 所有API请求都需要有效的认证token
