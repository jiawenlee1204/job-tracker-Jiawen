# 求职记录管理系统 - 部署指南

## 项目简介

这是一个完整的求职记录管理系统，支持多用户注册、登录和数据持久化存储。使用 Node.js + Express + SQLite 构建。

## 功能特性

- ✅ 用户注册和登录（密码加密存储）
- ✅ JWT Token 认证
- ✅ 面试记录的增删改查
- ✅ 数据持久化存储（SQLite 数据库）
- ✅ 跨设备同步
- ✅ 数据筛选和排序
- ✅ OCR 图片识别
- ✅ 数据导出功能

## 本地运行

### 1. 安装依赖

```bash
cd d:\TRAE学习\job-tracker
npm install
```

### 2. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动

### 3. 访问应用

在浏览器中打开 `http://localhost:3000`

## 部署到生产环境

### 方案一：部署到 Vercel（推荐）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **创建 vercel.json 配置文件**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

3. **部署**
```bash
vercel
```

4. **配置环境变量**
在 Vercel Dashboard 中设置：
- PORT: 3000（或其他端口）

### 方案二：部署到 Render

1. **创建 render.yaml 配置文件**
```yaml
services:
  - type: web
    name: job-tracker
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: PORT
        value: 3000
```

2. **推送到 GitHub**
```bash
git add .
git commit -m "Add backend"
git push
```

3. **在 Render 中连接 GitHub 仓库并部署**

### 方案三：部署到 Railway

1. **访问 railway.app**
2. **创建新项目**
3. **从 GitHub 部署**
4. **自动检测 Node.js 项目**

### 方案四：使用 Docker 部署

1. **创建 Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

2. **构建和运行**
```bash
docker build -t job-tracker .
docker run -p 3000:3000 job-tracker
```

## 数据库说明

- 使用 JSON 文件存储数据（无需数据库服务器）
- 数据库文件：`data.json`
- 自动创建和管理数据结构
- 支持用户和面试记录的关联查询

## API 端点

### 认证接口

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 面试记录接口

- `GET /api/records` - 获取所有记录
- `POST /api/records` - 创建新记录
- `PUT /api/records/:id` - 更新记录
- `DELETE /api/records/:id` - 删除记录
- `GET /api/records/stats` - 获取统计数据

## 安全注意事项

1. **修改 JWT Secret**
   在 `middleware/auth.js` 中修改 `JWT_SECRET` 为强密码

2. **环境变量**
   在生产环境中使用环境变量存储敏感信息

3. **HTTPS**
   生产环境务必使用 HTTPS

## 故障排除

### 端口被占用
修改 `server.js` 中的 PORT 或使用环境变量

### 数据库错误
删除 `jobtracker.db` 文件，重启服务器会自动重建

### CORS 错误
检查 `server.js` 中的 CORS 配置

## 技术栈

- **前端**: HTML, Tailwind CSS, Vanilla JavaScript
- **后端**: Node.js, Express
- **数据库**: SQLite3
- **认证**: JWT (jsonwebtoken)
- **密码加密**: bcryptjs

## 联系支持

如有问题，请查看 GitHub Issues 或联系开发者。
