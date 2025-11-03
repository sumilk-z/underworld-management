import React, { useState } from 'react';
import axios from 'axios';
import './PunishmentList.css';

function PunishmentList({ punishments, ghosts, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ghost_id: '',
    punishment_type: '',
    duration_days: '',
    reason: ''
  });

  const punishmentTypes = [
    '油锅地狱',
    '刀山地狱',
    '火海地狱',
    '冰冻地狱',
    '拔舌地狱',
    '挖眼地狱',
    '锯解地狱',
    '蒸笼地狱'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.ghost_id && formData.punishment_type && formData.duration_days) {
      try {
        await axios.post('/api/punishments', formData);
        setFormData({ ghost_id: '', punishment_type: '', duration_days: '', reason: '' });
        setShowForm(false);
        onRefresh();
      } catch (error) {
        console.error('添加刑罚失败:', error);
      }
    } else {
      alert('请填写所有必填项');
    }
  };

  const getGhostName = (ghostId) => {
    const ghost = ghosts.find(g => g.id === ghostId);
    return ghost ? ghost.name : '未知';
  };

  const calculateRemainingDays = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="punishment-list">
      <div className="section-header">
        <h3>⚖️ 刑罚管理</h3>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '取消' : '➕ 新增刑罚'}
        </button>
      </div>

      {showForm && (
        <form className="punishment-form" onSubmit={handleSubmit}>
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
              <label>刑罚类型 *</label>
              <select
                name="punishment_type"
                value={formData.punishment_type}
                onChange={handleChange}
                required
              >
                <option value="">-- 请选择 --</option>
                {punishmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>刑期(天数) *</label>
              <input
                type="number"
                name="duration_days"
                value={formData.duration_days}
                onChange={handleChange}
                placeholder="输入天数"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>刑罚原因</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="记录刑罚原因..."
              rows="3"
            />
          </div>

          <button type="submit" className="btn-submit">✓ 确认刑罚</button>
        </form>
      )}

      {punishments.length === 0 ? (
        <div className="empty-state">
          <p>📭 暂无刑罚记录</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>鬼魂名字</th>
                <th>刑罚类型</th>
                <th>刑期</th>
                <th>原因</th>
                <th>开始日期</th>
                <th>结束日期</th>
                <th>剩余天数</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {punishments.map(punishment => (
                <tr key={punishment.id}>
                  <td>{punishment.name || getGhostName(punishment.ghost_id)}</td>
                  <td className="punishment-type">{punishment.punishment_type}</td>
                  <td>{punishment.duration_days} 天</td>
                  <td className="reason-cell">{punishment.reason || '-'}</td>
                  <td>{punishment.start_date ? new Date(punishment.start_date).toLocaleDateString('zh-CN') : '-'}</td>
                  <td>{punishment.end_date ? new Date(punishment.end_date).toLocaleDateString('zh-CN') : '-'}</td>
                  <td>
                    <span className="remaining-days">
                      {punishment.end_date ? calculateRemainingDays(punishment.end_date) : '-'}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{
                        backgroundColor: punishment.status === 'active' ? '#f44336' : '#4caf50'
                      }}
                    >
                      {punishment.status === 'active' ? '执行中' : '已完成'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PunishmentList;
