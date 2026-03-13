# 求职记录管理系统

一个完整的求职记录管理系统，支持多用户注册、登录和数据持久化存储。

## 功能特性

- ✅ 用户注册和登录（密码加密存储）
- ✅ JWT Token 认证
- ✅ 面试记录的增删改查
- ✅ 数据持久化存储（JSON 文件）
- ✅ 跨设备同步
- ✅ 数据筛选和排序
- ✅ OCR 图片识别
- ✅ 数据导出功能
- ✅ 响应式设计

## 技术栈

### 前端
- HTML5
- Tailwind CSS
- Vanilla JavaScript
- Tesseract.js (OCR)

### 后端
- Node.js
- Express.js
- JSON 文件存储
- JWT (jsonwebtoken)
- bcryptjs (密码加密)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动

### 3. 访问应用

在浏览器中打开 `http://localhost:3000`

## 使用说明

### 注册账号

1. 打开应用
2. 点击"立即注册"
3. 填写用户名和密码（密码至少6位）
4. 点击"注册"

### 登录

1. 输入用户名和密码
2. 勾选"记住我"可保持登录状态
3. 点击"登录"

### 添加求职记录

1. 点击右上角的"+"按钮
2. 填写公司名称、职位名称、投递日期
3. 添加面试阶段（可选）
4. 点击"保存"

### 管理记录

- **编辑**：点击记录卡片上的编辑图标
- **删除**：点击记录卡片上的删除图标
- **筛选**：使用顶部的筛选器和搜索框
- **排序**：选择不同的排序方式
- **导出**：点击用户菜单中的"导出数据"

## API 端点

### 认证接口

- `POST /api/auth/register` - 用户注册
  ```json
  {
    "username": "用户名",
    "password": "密码"
  }
  ```

- `POST /api/auth/login` - 用户登录
  ```json
  {
    "username": "用户名",
    "password": "密码"
  }
  ```

### 面试记录接口

- `GET /api/records` - 获取所有记录
  - 查询参数：`status`, `search`, `sortBy`

- `POST /api/records` - 创建新记录
  ```json
  {
    "company": "公司名称",
    "position": "职位名称",
    "status": "状态",
    "date": "日期",
    "notes": "备注"
  }
  ```

- `PUT /api/records/:id` - 更新记录
  ```json
  {
    "company": "公司名称",
    "position": "职位名称",
    "status": "状态",
    "date": "日期",
    "notes": "备注"
  }
  ```

- `DELETE /api/records/:id` - 删除记录

- `GET /api/records/stats` - 获取统计数据

## 数据存储

数据存储在 `data.json` 文件中，包含：
- 用户信息（加密密码）
- 面试记录
- 创建和更新时间戳

## 部署

详细的部署说明请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

### 推荐平台

- **Vercel** - 免费且简单
- **Render** - 免费层
- **Railway** - 免费层
- **Heroku** - 需要付费

## 安全注意事项

1. **修改 JWT Secret**
   在 `middleware/auth.js` 中修改 `JWT_SECRET` 为强密码

2. **环境变量**
   在生产环境中使用环境变量存储敏感信息

3. **HTTPS**
   生产环境务必使用 HTTPS

4. **数据备份**
   定期备份 `data.json` 文件

## 故障排除

### 端口被占用
修改 `server.js` 中的 PORT 或使用环境变量：
```bash
PORT=3001 npm start
```

### 数据库错误
删除 `data.json` 文件，重启服务器会自动重建

### CORS 错误
检查 `server.js` 中的 CORS 配置

## 开发

### 开发模式（自动重启）
```bash
npm run dev
```

### 项目结构

```
job-tracker/
├── server.js           # 服务器入口
├── database.js         # 数据库接口
├── middleware/         # 中间件
│   └── auth.js       # JWT 认证
├── routes/           # API 路由
│   ├── auth.js       # 认证路由
│   └── records.js   # 记录路由
├── index.html        # 登录页面
├── dashboard.html    # 主页面
├── package.json     # 项目配置
└── data.json       # 数据文件（自动生成）
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
