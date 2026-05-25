import React, { useState } from 'react';
import { Task, TaskStatus } from '../Interfaces/Task';
import { Calendar, Trash2, Edit3, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit, onStatusChange }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    // Add deletion animation delay
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 250);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      Work: 'İş',
      Personal: 'Kişisel',
      Health: 'Sağlık',
      Education: 'Eğitim',
      Other: 'Diğer'
    };
    return labels[category] || category;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      Low: 'Düşük Öncelik',
      Medium: 'Orta Öncelik',
      High: 'Yüksek Öncelik'
    };
    return labels[priority] || priority;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Tarih Yok';
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`task-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="task-card-header">
        <span className={`category-badge ${task.category.toLowerCase()}`}>
          {getCategoryLabel(task.category)}
        </span>
        <div className={`priority-indicator ${task.priority.toLowerCase()}`}>
          <span className="priority-dot"></span>
          <span>{getPriorityLabel(task.priority)}</span>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>
      
      {task.description && (
        <p className="task-desc" title={task.description}>
          {task.description}
        </p>
      )}

      <div className="task-footer">
        <div className="task-due-date" title="Son Teslim Tarihi">
          <Calendar size={13} />
          <span>{formatDate(task.dueDate)}</span>
        </div>

        <div className="task-actions">
          <button 
            onClick={() => onEdit(task)} 
            className="icon-btn" 
            title="Görevi Düzenle"
            aria-label="Görevi Düzenle"
          >
            <Edit3 size={14} />
          </button>
          
          <button 
            onClick={handleDelete} 
            className="icon-btn delete-hover" 
            title="Görevi Sil"
            aria-label="Görevi Sil"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="task-status-changer" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
        {task.status !== 'Todo' ? (
          <button 
            onClick={() => onStatusChange(task.id, task.status === 'Completed' ? 'In_Progress' : 'Todo')}
            className="btn btn-secondary" 
            style={{ padding: '4px 8px', fontSize: '11px', borderRadius: 'var(--radius-sm)' }}
            title="Geri Al"
          >
            <ArrowLeft size={12} style={{ marginRight: '2px' }} /> 
            {task.status === 'Completed' ? 'Süreçte' : 'Yapılacak'}
          </button>
        ) : <div />}

        {task.status !== 'Completed' ? (
          <button 
            onClick={() => onStatusChange(task.id, task.status === 'Todo' ? 'In_Progress' : 'Completed')}
            className="btn btn-primary" 
            style={{ padding: '4px 8px', fontSize: '11px', borderRadius: 'var(--radius-sm)' }}
            title="İleri Taşı"
          >
            {task.status === 'Todo' ? 'Süreçte' : 'Tamamlandı'} 
            <ArrowRight size={12} style={{ marginLeft: '2px' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-health)', fontSize: '11px', fontWeight: '600' }}>
            <CheckCircle2 size={14} />
            <span>Harika, Tamamlandı!</span>
          </div>
        )}
      </div>
    </div>
  );
};
