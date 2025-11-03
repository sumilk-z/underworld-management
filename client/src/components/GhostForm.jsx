import React, { useState } from 'react';
import './GhostForm.css';

function GhostForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    age_at_death: '',
    death_date: '',
    life_story: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age_at_death && formData.death_date) {
      onSubmit(formData);
      setFormData({
        name: '',
        age_at_death: '',
        death_date: '',
        life_story: ''
      });
    } else {
      alert('请填写所有必填项');
    }
  };

  return (
    <form className="ghost-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>鬼魂名字 *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="输入鬼魂名字"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>死亡年龄 *</label>
          <input
            type="number"
            name="age_at_death"
            value={formData.age_at_death}
            onChange={handleChange}
            placeholder="输入死亡年龄"
            required
          />
        </div>

        <div className="form-group">
          <label>死亡日期 *</label>
          <input
            type="date"
            name="death_date"
            value={formData.death_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>生平事迹</label>
        <textarea
          name="life_story"
          value={formData.life_story}
          onChange={handleChange}
          placeholder="记录鬼魂的生平事迹和主要行为..."
          rows="4"
        />
      </div>

      <button type="submit" className="btn-submit">
        ✓ 提交档案
      </button>
    </form>
  );
}

export default GhostForm;
