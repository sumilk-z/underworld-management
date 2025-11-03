const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data.json');

const defaultData = {
  ghosts: [],
  reincarnations: [],
  punishments: [],
  tasks: []
};

const loadData = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('读取数据文件失败:', error);
  }
  return defaultData;
};

const saveData = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('保存数据失败:', error);
  }
};

const initDatabase = () => {
  if (!fs.existsSync(dbPath)) {
    saveData(defaultData);
    console.log('✅ 数据库初始化完成');
  } else {
    console.log('✅ 数据库已存在');
  }
};

module.exports = { initDatabase, loadData, saveData };
