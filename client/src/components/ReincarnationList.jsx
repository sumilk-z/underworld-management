import React, { useState } from 'react';
import axios from 'axios';
import './ReincarnationList.css';

function ReincarnationList({ reincarnations, ghosts, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ghost_id: '',
    next_life: '',
    reincarnation_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.ghost_id && formData.next_life && formData.reincarnation_date) {
      try {
        await axios.post('/api/reincarnations', formData);
        setFormData({ ghost_id: '', next_life: '', reincarnation_date: '' });
        setShowForm(false);
        onRefresh();
      } catch (error) {
        console.error('添加转世记录失败:', error);
      }
    } else {
      alert('请填写所有必填项');
    }
  };

  const getGhostName = (ghostId) => {
    const ghost = ghosts.find(g => g.id === ghostId);
    return ghost ? ghost.name : '未知';
  };

  return (
    <div className="reincarnation-list">
      <div className="section-header">
        <h3>🔄 转世记录管理</h3>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '取消' : '➕ 新增转世'}
        </button>
      </div>

      {showForm && (
        <form className="reincarnation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>选择鬼魂 *</label>
            <select
              name="ghost_id"
              value={formData.ghost_id}
              onChange={handleChange}
              required
            >
              <option value="">-- 请选择 --</option>
              {ghosts.map(ghost => (
                <option key={ghost.id} value={ghost.id}>
                  {ghost.name} (卒于 {ghost.death_date})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>下一世身份 *</label>
              <input
                type="text"
                name="next_life"
                value={formData.next_life}
                onChange={handleChange}
                placeholder="如：皇帝、农民、商人等"
                required
              />
            </div>

            <div className="form-group">
              <label>转世日期 *</label>
              <input
                type="date"
                name="reincarnation_date"
                value={formData.reincarnation_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">✓ 确认转世</button>
        </form>
      )}

      {reincarnations.length === 0 ? (
        <div className="empty-state">
          <p>📭 暂无转世记录</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>原名</th>
                <th>下一世身份</th>
                <th>转世日期</th>
                <th>状态</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              {reincarnations.map(reincarnation => (
                <tr key={reincarnation.id}>
                  <td>{reincarnation.name || getGhostName(reincarnation.ghost_id)}</td>
                  <td className="next-life">{reincarnation.next_life}</td>
                  <td>{reincarnation.reincarnation_date}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{
                        backgroundColor: reincarnation.status === 'completed' ? '#4caf50' : '#ff9800'
                      }}
                    >
                      {reincarnation.status === 'completed' ? '已完成' : '待执行'}
                    </span>
                  </td>
                  <td>{new Date(reincarnation.created_at).toLocaleDateString('zh-CN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReincarnationList;
