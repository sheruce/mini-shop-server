# mini-shop-server

微信小商城后端服务

## 技术栈

- Node.js + Express + TypeScript
- MySQL 8.0（Docker）
- Prisma 6（ORM）

## 项目结构

```
mini-shop-server/
├── prisma/
│   ├── schema.prisma      # 数据库模型定义
│   ├── migrations/        # 数据库迁移文件
│   └── seed.ts            # 测试数据
├── src/
│   ├── index.ts           # 入口文件
│   ├── app.ts             # Express 应用配置
│   ├── lib/prisma.ts      # Prisma 客户端实例
│   ├── routes/            # 路由层
│   │   ├── product.ts
│   │   └── order.ts
│   └── services/          # 业务逻辑层
│       ├── product.ts
│       └── order.ts
```

## 环境准备

1. 安装 [Node.js](https://nodejs.org/)（v18+）
2. 安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. 克隆项目并安装依赖：

```bash
git clone https://github.com/sheruce/mini-shop-server.git
cd mini-shop-server
npm install
```

4. 在项目根目录创建 `.env` 文件：

```
DATABASE_URL="mysql://root:root123@localhost:3306/mini_shop"
PORT=3000
```

5. 启动 MySQL：

```bash
docker compose up -d
```

6. 初始化数据库：

```bash
npm run db:migrate
npm run db:seed
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 编译 TypeScript |
| `npm start` | 运行编译后的代码 |
| `npm run db:migrate` | 运行数据库迁移 |
| `npm run db:generate` | 生成 Prisma Client |
| `npm run db:seed` | 插入测试数据 |
| `docker compose up -d` | 启动 MySQL 容器 |
| `docker compose down` | 停止 MySQL 容器 |

## API 接口

基础路径：`http://localhost:3000/api`

### 商品

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/products` | 商品列表 |
| GET | `/products/:id` | 商品详情 |

### 订单

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/orders` | 创建订单 |
| GET | `/orders` | 订单列表 |
| GET | `/orders/:id` | 订单详情 |

### 创建订单请求示例

```json
{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ],
  "remark": "备注信息（可选）"
}
```

### 通用响应格式

```json
{
  "code": 0,
  "message": "ok",
  "data": {}
}
```
