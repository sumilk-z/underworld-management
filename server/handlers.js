const { v4: uuidv4 } = require('uuid');
const { loadData, saveData } = require('./db');

// 鬼魂管理
const getGhosts = (req, res) => {
  try {
    const data = loadData();
    const ghosts = data.ghosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(ghosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGhostById = (req, res) => {
  try {
    const { id } = req.params;
    const data = loadData();
    const ghost = data.ghosts.find(g => g.id === id);
    res.json(ghost || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addGhost = (req, res) => {
  try {
    const { name, age_at_death, death_date, life_story } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const data = loadData();
    const newGhost = {
      id,
      name,
      age_at_death: parseInt(age_at_death),
      death_date,
      life_story,
      karma_score: 0,
      status: 'pending',
      created_at: now,
      updated_at: now
    };
    
    data.ghosts.push(newGhost);
    saveData(data);
    res.json(newGhost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGhost = (req, res) => {
  try {
    const { id } = req.params;
    const { name, age_at_death, death_date, life_story, karma_score, status } = req.body;
    const now = new Date().toISOString();
    
    const data = loadData();
    const ghostIndex = data.ghosts.findIndex(g => g.id === id);
    
    if (ghostIndex === -1) {
      res.status(404).json({ error: '鬼魂不存在' });
      return;
    }
    
    data.ghosts[ghostIndex] = {
      ...data.ghosts[ghostIndex],
      name,
      age_at_death: parseInt(age_at_death),
      death_date,
      life_story,
      karma_score: parseInt(karma_score),
      status,
      updated_at: now
    };
    
    saveData(data);
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGhost = (req, res) => {
  try {
    const { id } = req.params;
    const data = loadData();
    
    data.ghosts = data.ghosts.filter(g => g.id !== id);
    data.reincarnations = data.reincarnations.filter(r => r.ghost_id !== id);
    data.punishments = data.punishments.filter(p => p.ghost_id !== id);
    
    saveData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 转世管理
const getReincarnations = (req, res) => {
  try {
    const data = loadData();
    const reincarnations = data.reincarnations.map(r => {
      const ghost = data.ghosts.find(g => g.id === r.ghost_id);
      return { ...r, name: ghost ? ghost.name : '未知' };
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(reincarnations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReincarnation = (req, res) => {
  try {
    const { ghost_id, next_life, reincarnation_date } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const data = loadData();
    const newReincarnation = {
      id,
      ghost_id,
      next_life,
      reincarnation_date,
      status: 'pending',
      created_at: now
    };
    
    data.reincarnations.push(newReincarnation);
    saveData(data);
    res.json(newReincarnation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 刑罚管理
const getPunishments = (req, res) => {
  try {
    const data = loadData();
    const punishments = data.punishments.map(p => {
      const ghost = data.ghosts.find(g => g.id === p.ghost_id);
      return { ...p, name: ghost ? ghost.name : '未知' };
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(punishments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPunishment = (req, res) => {
  try {
    const { ghost_id, punishment_type, duration_days, reason } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();
    const start_date = now;
    const end_date = new Date(Date.now() + parseInt(duration_days) * 24 * 60 * 60 * 1000).toISOString();
    
    const data = loadData();
    const newPunishment = {
      id,
      ghost_id,
      punishment_type,
      duration_days: parseInt(duration_days),
      reason,
      status: 'active',
      start_date,
      end_date,
      created_at: now
    };
    
    data.punishments.push(newPunishment);
    saveData(data);
    res.json(newPunishment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 统计数据
const getStats = (req, res) => {
  try {
    const data = loadData();
    const stats = {
      total_ghosts: data.ghosts.length,
      reincarnated: data.ghosts.filter(g => g.status === 'reincarnated').length,
      active_punishments: data.punishments.filter(p => p.status === 'active').length,
      completed_reincarnations: data.reincarnations.filter(r => r.status === 'completed').length
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGhosts,
  getGhostById,
  addGhost,
  updateGhost,
  deleteGhost,
  getReincarnations,
  addReincarnation,
  getPunishments,
  addPunishment,
  getStats
};
