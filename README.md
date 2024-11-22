# LeBron James Game Stats Viewer

这是一个展示勒布朗詹姆斯NBA比赛数据的单页面应用。用户可以通过日历界面查看勒布朗在每场比赛中的详细数据。

## 功能特点

- 月度日历视图
- 比赛日期高亮显示
- 详细的比赛数据卡片
- 实时数据更新

## 技术栈

- Frontend: React.js + TypeScript
- UI: Tailwind CSS
- Backend: FastAPI
- Data: NBA API

## 运行项目

### 后端

1. 进入项目目录：
   ```bash
   cd lebron-stats
   ```

2. 创建并激活虚拟环境：
   ```bash
   python -m venv venv
   source venv/bin/activate  # 在Windows上使用 venv\Scripts\activate
   ```

3. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

4. 运行后端服务：
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

### 前端

1. 进入前端目录：
   ```bash
   cd frontend
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行开发服务器：
   ```bash
   npm start
   ```

4. 在浏览器中打开 http://localhost:3000

## 部署说明

### 后端

1. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

2. 运行生产环境服务：
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

### 前端

1. 创建生产环境构建：
   ```bash
   npm run build
   ```

2. 从 `build` 目录提供静态文件

## API 接口

- `GET /api/stats/{month}`: 获取指定月份的比赛数据
- `GET /api/game/{date}`: 获取指定日期的详细比赛数据

## 使用说明

1. 打开网站后，你会看到一个月度日历视图
2. 有比赛的日期会被特殊标记
3. 点击任何一个有比赛的日期，下方会显示勒布朗在该场比赛中的详细数据
4. 使用日历顶部的箭头可以切换月份

## 数据更新

- 数据会通过NBA API自动更新
- 每次切换月份时会自动获取该月的最新数据
