import React, { useState, useEffect } from 'react';
import { Task, TaskCategory, TaskPriority } from '../Interfaces/Task';
import { X, Calendar, PlusCircle, Save } from 'lucide-react';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  taskToEdit?: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Work');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category);
      setPriority(taskToEdit.priority);
      // Format date for input yyyy-MM-dd
      setDueDate(taskToEdit.dueDate.substring(0, 10));
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('Work');
      setPriority('Medium');
      // Set tomorrow as default due date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().substring(0, 10));
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Lütfen bir görev başlığı girin.');
      return;
    }
    if (!dueDate) {
      setError('Lütfen bir teslim tarihi seçin.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: new Date(dueDate).toISOString()
    });

    onClose();
  };

  const categories: { value: TaskCategory; label: string }[] = [
    { value: 'Work', label: 'İş' },
    { value: 'Personal', label: 'Kişisel' },
    { value: 'Health', label: 'Sağlık' },
    { value: 'Education', label: 'Eğitim' },
    { value: 'Other', label: 'Diğer' }
  ];

  const priorities: { value: TaskPriority; label: string }[] = [
    { value: 'Low', label: 'Düşük' },
    { value: 'Medium', label: 'Orta' },
    { value: 'High', label: 'Yüksek' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {taskToEdit ? 'Görevi Güncelle' : 'Yeni Görev Oluştur'}
          </h2>
          <button onClick={onClose} className="icon-btn" aria-label="Kapat">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px 16px', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: '500', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Görev Başlığı</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Örn: React projesini tamamla..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Açıklama (Opsiyonel)</label>
            <textarea 
              className="form-textarea" 
              placeholder="Görevle ilgili detaylar ekle..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kategori</label>
            <div className="segment-group">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`segment-btn ${category === cat.value ? `active ${cat.value.toLowerCase()}` : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Öncelik Derecesi</label>
            <div className="segment-group">
              {priorities.map(prio => (
                <button
                  key={prio.value}
                  type="button"
                  onClick={() => setPriority(prio.value)}
                  className={`segment-btn ${priority === prio.value ? `active ${prio.value.toLowerCase()}` : ''}`}
                >
                  {prio.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Son Teslim Tarihi</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="date" 
                className="form-input" 
                style={{ width: '100%', paddingLeft: '40px' }}
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
              <Calendar size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              İptal
            </button>
            <button type="submit" className="btn btn-primary">
              {taskToEdit ? <Save size={16} /> : <PlusCircle size={16} />}
              <span>{taskToEdit ? 'Güncellemeyi Kaydet' : 'Görevi Ekle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
