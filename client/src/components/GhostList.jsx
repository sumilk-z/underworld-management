import React, { useState } from 'react';
import axios from 'axios';
import './GhostList.css';

function GhostList({ ghosts, onDelete, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (ghost) => {
    setEditingId(ghost.id);
    setEditData(ghost);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/ghosts/${editingId}`, editData);
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error('更新失败:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'reincarnated': return '#4caf50';
      case 'punished': return '#f44336';
      default: return '#e0e0e0';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return '待审核';
      case 'reincarnated': return '已转世';
      case 'punished': return '受罚中';
      default: return status;
    }
  };

  return (
    <div className="ghost-list">
      {ghosts.length === 0 ? (
        <div className="empty-state">
          <p>📭 暂无鬼魂档案</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>名字</th>
                <th>死亡年龄</th>
                <th>死亡日期</th>
                <th>业力值</th>
                <th>状态</th>
                <th>生平事迹</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {ghosts.map(ghost => (
                <tr key={ghost.id}>
                  <td>
                    {editingId === ghost.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      ghost.name
                    )}
                  </td>
                  <td>
                    {editingId === ghost.id ? (
                      <input
                        type="number"
                        name="age_at_death"
                        value={editData.age_at_death}
                        onChange={handleChange}
                      />
                    ) : (
                      ghost.age_at_death
                    )}
                  </td>
                  <td>{ghost.death_date}</td>
                  <td>
                    {editingId === ghost.id ? (
                      <input
                        type="number"
                        name="karma_score"
                        value={editData.karma_score}
                        onChange={handleChange}
                      />
                    ) : (
                      ghost.karma_score
                    )}
                  </td>
                  <td>
                    {editingId === ghost.id ? (
                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                      >
                        <option value="pending">待审核</option>
                        <option value="reincarnated">已转世</option>
                        <option value="punished">受罚中</option>
                      </select>
                    ) : (
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(ghost.status) }}
                      >
                        {getStatusText(ghost.status)}
                      </span>
                    )}
                  </td>
                  <td className="story-cell">
                    {editingId === ghost.id ? (
                      <textarea
                        name="life_story"
                        value={editData.life_story}
                        onChange={handleChange}
                        rows="2"
                      />
                    ) : (
                      <span title={ghost.life_story}>
                        {ghost.life_story ? ghost.life_story.substring(0, 30) + '...' : '-'}
                      </span>
                    )}
                  </td>
                  <td className="actions-cell">
                    {editingId === ghost.id ? (
                      <>
                        <button className="btn-save" onClick={handleSave}>✓</button>
                        <button className="btn-cancel" onClick={handleCancel}>✕</button>
                      </>
                    ) : (
                      <>
                        <button className="btn-edit" onClick={() => handleEdit(ghost)}>编辑</button>
                        <button className="btn-delete" onClick={() => onDelete(ghost.id)}>删除</button>
                      </>
                    )}
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

export default GhostList;
