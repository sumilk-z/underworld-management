# 👻 地府管理系统

一个融合中国传统文化与现代管理系统的创意应用，模拟地府的各项管理职能。

## 🌟 功能特性

### 📊 仪表板
- 实时统计鬼魂总数、转世数、活跃刑罚等关键指标
- 鬼魂状态分布图表
- 系统运行状态监控

### 👻 鬼魂档案管理
- 新增鬼魂档案（名字、死亡年龄、死亡日期、生平事迹）
- 编辑和删除鬼魂信息
- 业力值管理
- 状态跟踪（待审核、已转世、受罚中）

### 🔄 转世管理
- 记录鬼魂的转世信息
- 下一世身份设定
- 转世日期安排
- 转世状态追踪

### ⚖️ 刑罚管理
- 8种地狱刑罚类型（油锅、刀山、火海等）
- 刑期设定和自动计算
- 刑罚原因记录
- 剩余天数实时显示

## 🛠️ 技术栈

### 后端
- **Node.js + Express** - Web 服务器框架
- **SQLite3** - 轻量级数据库
- **CORS** - 跨域资源共享
- **UUID** - 唯一标识符生成

### 前端
- **React 18** - UI 框架
- **Vite** - 构建工具
- **Axios** - HTTP 客户端
- **CSS3** - 样式设计

## 📦 项目结构

```
underworld-system/
├── server/
│   ├── index.js          # 主服务器文件
│   ├── db.js             # 数据库初始化
│   └── handlers.js       # API 处理器
├── client/
│   ├── src/
│   │   ├── App.jsx       # 主应用组件
│   │   ├── App.css       # 主样式
│   │   ├── index.css     # 全局样式
│   │   ├── main.jsx      # 入口文件
│   │   └── components/   # 各功能组件
│   ├── index.html        # HTML 模板
│   ├── vite.config.js    # Vite 配置
│   └── package.json      # 前端依赖
├── package.json          # 项目配置
└── README.md             # 项目文档
```

## 🚀 快速开始

### 本地开发

1. **安装依赖**
```bash
cd underworld-system
npm install
cd client && npm install && cd ..
```

2. **启动开发服务器**
```bash
npm run dev
```

这将同时启动：
- 后端服务器：http://localhost:3001
- 前端开发服务器：http://localhost:5173

3. **访问应用**
打开浏览器访问 http://localhost:5173

### 生产构建

1. **构建前端**
```bash
npm run build
```

2. **启动生产服务器**
```bash
npm start
```

访问 http://localhost:3001

## 📡 API 接口

### 鬼魂管理
- `GET /api/ghosts` - 获取所有鬼魂
- `GET /api/ghosts/:id` - 获取单个鬼魂
- `POST /api/ghosts` - 新增鬼魂
- `PUT /api/ghosts/:id` - 更新鬼魂
- `DELETE /api/ghosts/:id` - 删除鬼魂

### 转世管理
- `GET /api/reincarnations` - 获取转世记录
- `POST /api/reincarnations` - 新增转世

### 刑罚管理
- `GET /api/punishments` - 获取刑罚记录
- `POST /api/punishments` - 新增刑罚

### 统计数据
- `GET /api/stats` - 获取系统统计数据

## 🎨 设计特色

- **中国风主题**：红黑金配色，古籍风格
- **响应式设计**：完美适配桌面和移动设备
- **流畅动画**：页面切换和交互动画
- **用户友好**：直观的界面和操作流程

## 📝 数据库表结构

### ghosts（鬼魂表）
- id: 唯一标识
- name: 名字
- age_at_death: 死亡年龄
- death_date: 死亡日期
- life_story: 生平事迹
- karma_score: 业力值
- status: 状态
- created_at: 创建时间
- updated_at: 更新时间

### reincarnations（转世表）
- id: 唯一标识
- ghost_id: 鬼魂ID
- next_life: 下一世身份
- reincarnation_date: 转世日期
- status: 状态
- created_at: 创建时间

### punishments（刑罚表）
- id: 唯一标识
- ghost_id: 鬼魂ID
- punishment_type: 刑罚类型
- duration_days: 刑期天数
- reason: 刑罚原因
- status: 状态
- start_date: 开始日期
- end_date: 结束日期
- created_at: 创建时间

## 🌐 部署到 CloudStudio

项目已配置可直接部署到 CloudStudio 云平台。

## 📄 许可证

MIT License

## 👨‍💻 开发者

地府管理系统开发团队

---

**阎王殿信息技术部** © 2024
