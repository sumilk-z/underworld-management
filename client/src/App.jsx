import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GhostList from './components/GhostList';
import GhostForm from './components/GhostForm';
import ReincarnationList from './components/ReincarnationList';
import PunishmentList from './components/PunishmentList';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ghosts, setGhosts] = useState([]);
  const [reincarnations, setReincarnations] = useState([]);
  const [punishments, setPunishments] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ghostsRes, reincarnationsRes, punishmentsRes, statsRes] = await Promise.all([
        axios.get('/api/ghosts'),
        axios.get('/api/reincarnations'),
        axios.get('/api/punishments'),
        axios.get('/api/stats')
      ]);
      setGhosts(ghostsRes.data);
      setReincarnations(reincarnationsRes.data);
      setPunishments(punishmentsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  const handleAddGhost = async (ghostData) => {
    try {
      await axios.post('/api/ghosts', ghostData);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('添加鬼魂失败:', error);
    }
  };

  const handleDeleteGhost = async (id) => {
    if (window.confirm('确定要删除这个鬼魂吗？')) {
      try {
        await axios.delete(`/api/ghosts/${id}`);
        fetchData();
      } catch (error) {
        console.error('删除失败:', error);
      }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>👻 地府管理系统</h1>
          <p className="subtitle">阎王殿数据管理平台</p>
        </div>
      </header>

      <nav className="nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 仪表板
        </button>
        <button 
          className={`nav-btn ${activeTab === 'ghosts' ? 'active' : ''}`}
          onClick={() => setActiveTab('ghosts')}
        >
          👻 鬼魂档案
        </button>
        <button 
          className={`nav-btn ${activeTab === 'reincarnations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reincarnations')}
        >
          🔄 转世管理
        </button>
        <button 
          className={`nav-btn ${activeTab === 'punishments' ? 'active' : ''}`}
          onClick={() => setActiveTab('punishments')}
        >
          ⚖️ 刑罚管理
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} ghosts={ghosts} />
        )}

        {activeTab === 'ghosts' && (
          <div className="section">
            <div className="section-header">
              <h2>👻 鬼魂档案管理</h2>
              <button 
                className="btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '取消' : '➕ 新增鬼魂'}
              </button>
            </div>
            {showForm && (
              <GhostForm onSubmit={handleAddGhost} />
            )}
            <GhostList 
              ghosts={ghosts} 
              onDelete={handleDeleteGhost}
              onRefresh={fetchData}
            />
          </div>
        )}

        {activeTab === 'reincarnations' && (
          <div className="section">
            <h2>🔄 转世管理</h2>
            <ReincarnationList 
              reincarnations={reincarnations}
              ghosts={ghosts}
              onRefresh={fetchData}
            />
          </div>
        )}

        {activeTab === 'punishments' && (
          <div className="section">
            <h2>⚖️ 刑罚管理</h2>
            <PunishmentList 
              punishments={punishments}
              ghosts={ghosts}
              onRefresh={fetchData}
            />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 地府管理系统 | 阎王殿信息技术部</p>
      </footer>
    </div>
  );
}

export default App;
