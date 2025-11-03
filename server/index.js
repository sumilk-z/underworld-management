const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { initDatabase } = require('./db');
const { initMythologyData } = require('./init-data');
const { 
  getGhosts, 
  addGhost, 
  updateGhost, 
  deleteGhost,
  getGhostById,
  getReincarnations,
  addReincarnation,
  getPunishments,
  addPunishment,
  getStats
} = require('./handlers');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 初始化数据库
initDatabase();
// 初始化神话人物数据
initMythologyData();

// API 路由

// 鬼魂管理
app.get('/api/ghosts', getGhosts);
app.get('/api/ghosts/:id', getGhostById);
app.post('/api/ghosts', addGhost);
app.put('/api/ghosts/:id', updateGhost);
app.delete('/api/ghosts/:id', deleteGhost);

// 转世管理
app.get('/api/reincarnations', getReincarnations);
app.post('/api/reincarnations', addReincarnation);

// 刑罚管理
app.get('/api/punishments', getPunishments);
app.post('/api/punishments', addPunishment);

// 统计数据
app.get('/api/stats', getStats);

// 静态文件服务
app.use(express.static(path.join(__dirname, '../client/dist')));

// SPA 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌍 地府管理系统后端运行在 http://localhost:${PORT}`);
});
