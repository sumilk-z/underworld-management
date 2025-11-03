import React from 'react';
import './Dashboard.css';

function Dashboard({ stats, ghosts }) {
  const getStatusDistribution = () => {
    const pending = ghosts.filter(g => g.status === 'pending').length;
    const reincarnated = ghosts.filter(g => g.status === 'reincarnated').length;
    const punished = ghosts.filter(g => g.status === 'punished').length;
    return { pending, reincarnated, punished };
  };

  const distribution = getStatusDistribution();

  return (
    <div className="dashboard">
      <h2>📊 地府管理仪表板</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👻</div>
          <div className="stat-content">
            <div className="stat-label">总鬼魂数</div>
            <div className="stat-value">{stats.total_ghosts || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-label">已转世</div>
            <div className="stat-value">{stats.reincarnated || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚖️</div>
          <div className="stat-content">
            <div className="stat-label">活跃刑罚</div>
            <div className="stat-value">{stats.active_punishments || 0}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">完成转世</div>
            <div className="stat-value">{stats.completed_reincarnations || 0}</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>鬼魂状态分布</h3>
          <div className="status-chart">
            <div className="status-item">
              <span className="status-label">待审核</span>
              <div className="status-bar">
                <div 
                  className="status-fill pending"
                  style={{ width: `${(distribution.pending / (stats.total_ghosts || 1)) * 100}%` }}
                >
                  {distribution.pending}
                </div>
              </div>
            </div>
            <div className="status-item">
              <span className="status-label">已转世</span>
              <div className="status-bar">
                <div 
                  className="status-fill reincarnated"
                  style={{ width: `${(distribution.reincarnated / (stats.total_ghosts || 1)) * 100}%` }}
                >
                  {distribution.reincarnated}
                </div>
              </div>
            </div>
            <div className="status-item">
              <span className="status-label">受罚中</span>
              <div className="status-bar">
                <div 
                  className="status-fill punished"
                  style={{ width: `${(distribution.punished / (stats.total_ghosts || 1)) * 100}%` }}
                >
                  {distribution.punished}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>系统信息</h3>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">系统名称：</span>
              <span className="info-value">地府管理系统 v1.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">管理员：</span>
              <span className="info-value">阎王</span>
            </div>
            <div className="info-item">
              <span className="info-label">部门：</span>
              <span className="info-value">阎王殿信息技术部</span>
            </div>
            <div className="info-item">
              <span className="info-label">运行状态：</span>
              <span className="info-value" style={{ color: '#90ee90' }}>✓ 正常运行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
