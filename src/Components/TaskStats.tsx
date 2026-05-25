import React from 'react';
import { TaskStatsData } from '../Interfaces/Task';
import { ListTodo, Flame, CheckCircle2 } from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatsData;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card todo">
        <div className="stat-header">
          <span>Yapılacaklar</span>
          <div className="stat-icon-wrapper">
            <ListTodo size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.todo}</div>
      </div>

      <div className="stat-card progress">
        <div className="stat-header">
          <span>Devam Edenler</span>
          <div className="stat-icon-wrapper">
            <Flame size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.inProgress}</div>
      </div>

      <div className="stat-card completed">
        <div className="stat-header">
          <span>Tamamlananlar</span>
          <div className="stat-icon-wrapper">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.completed}</div>
      </div>

      <div className="stat-card progress-container">
        <div className="progress-header">
          <span>Tamamlama Oranı</span>
          <span style={{ color: 'var(--accent)' }}>{stats.completionRate}%</span>
        </div>
        <div className="progress-track">
          <div 
            className="progress-bar" 
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};
