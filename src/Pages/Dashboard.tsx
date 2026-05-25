import React, { useState, useEffect } from 'react';
import { Task, TaskCategory, TaskStatus, TaskStatsData } from '../Interfaces/Task';
import { TaskStats } from '../Components/TaskStats';
import { TaskCard } from '../Components/TaskCard';
import { TaskForm } from '../Components/TaskForm';
import { ThemeToggle } from '../Components/ThemeToggle';
import { PlusCircle, Search, SortAsc } from 'lucide-react';

export const Dashboard: React.FC = () => {
  // 1. Initial State (Load dummy tasks if localStorage is empty to wow the user immediately)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('aura-tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Görevler yüklenirken hata oluştu', e);
      }
    }
    
    // Default dummy tasks
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 5);

    return [
      {
        id: '1',
        title: 'Örnek: React CRUD Uygulamasını Netlify\'da Canlıya Al',
        description: 'Bu ödevin son aşaması! Projeyi GitHub\'a yükleyip Netlify üzerinden yayına al ve linkleri proje formunda paylaş.',
        category: 'Work',
        priority: 'High',
        status: 'In_Progress',
        dueDate: tomorrow.toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Örnek: AuraTask Projesi Arayüz Tasarımını Kontrol Et',
        description: 'Modern CSS, cam efekti ve karanlık mod geçişlerinin tarayıcıda pürüzsüz çalışıp çalışmadığını test et.',
        category: 'Education',
        priority: 'Medium',
        status: 'Todo',
        dueDate: tomorrow.toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Örnek: HTML ve CSS Temellerini Tekrar Et',
        description: 'Eğitimdeki semantik HTML etiketleri ve Flexbox/Grid yapısını pekiştir.',
        category: 'Education',
        priority: 'Low',
        status: 'Completed',
        dueDate: nextWeek.toISOString(),
        createdAt: new Date().toISOString()
      }
    ];
  });

  // 2. Control states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TaskCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [stats, setStats] = useState<TaskStatsData>({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    completionRate: 0
  });

  // 3. Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem('aura-tasks', JSON.stringify(tasks));
    
    // Recalculate stats
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'Todo').length;
    const inProgress = tasks.filter(t => t.status === 'In_Progress').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({ total, todo, inProgress, completed, completionRate });
  }, [tasks]);

  // 4. CRUD Operations
  // CREATE (Add task)
  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      status: 'Todo',
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // UPDATE (Edit existing task details)
  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    if (!editingTask) return;
    
    setTasks(prev => prev.map(t => {
      if (t.id === editingTask.id) {
        return {
          ...t,
          ...taskData
        };
      }
      return t;
    }));
    setEditingTask(null);
  };

  // UPDATE (Change task status only)
  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  // DELETE (Remove task)
  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Open Edit Modal
  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // 5. Filter & Sort Logic
  const getFilteredAndSortedTasks = () => {
    let result = [...tasks];

    // Filter by search query (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(t => t.category === activeCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'priority') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return 0;
    });

    return result;
  };

  const processedTasks = getFilteredAndSortedTasks();
  
  // Categorized tasks for boards
  const todoTasks = processedTasks.filter(t => t.status === 'Todo');
  const inProgressTasks = processedTasks.filter(t => t.status === 'In_Progress');
  const completedTasks = processedTasks.filter(t => t.status === 'Completed');

  const categories: (TaskCategory | 'All')[] = ['All', 'Work', 'Personal', 'Health', 'Education', 'Other'];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">✨</div>
          <div>
            <h1 className="brand-title">AuraTask</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>Premium Görev Yöneticisi</p>
          </div>
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <button 
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }} 
            className="btn btn-primary"
          >
            <PlusCircle size={18} />
            <span>Yeni Görev</span>
          </button>
        </div>
      </header>

      {/* Statistics Section */}
      <TaskStats stats={stats} />

      {/* Controls Bar: Search, Category Filter, Sorting */}
      <div className="controls-bar">
        {/* Search Input */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: '1', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Görevlerde ara..."
            style={{ width: '100%', paddingLeft: '40px' }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="filters-group">
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Kategori:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat === 'All' ? 'Tümü' : cat === 'Work' ? 'İş' : cat === 'Personal' ? 'Kişisel' : cat === 'Health' ? 'Sağlık' : cat === 'Education' ? 'Eğitim' : 'Diğer'}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SortAsc size={16} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="sort-select" 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value as any)}
          >
            <option value="dueDate">Teslim Tarihi (Önce Yakın)</option>
            <option value="priority">Öncelik Derecesi</option>
            <option value="createdAt">Eklenme Tarihi (Yeni)</option>
          </select>
        </div>
      </div>

      {/* Board Columns Grid */}
      <main className="board-grid">
        {/* Column 1: Todo */}
        <div className="board-column">
          <div className="column-header">
            <h2 className="column-title">
              <span style={{ color: 'var(--text-muted)' }}>●</span>
              <span>Yapılacaklar</span>
            </h2>
            <span className="column-badge">{todoTasks.length}</span>
          </div>
          {todoTasks.length > 0 ? (
            todoTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDeleteTask} 
                onEdit={handleOpenEditModal}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon">📋</span>
              <span className="empty-state-text">Yapılacak görev bulunmuyor.</span>
            </div>
          )}
        </div>

        {/* Column 2: In Progress */}
        <div className="board-column">
          <div className="column-header">
            <h2 className="column-title">
              <span style={{ color: 'var(--color-education)' }}>●</span>
              <span>Süreçte</span>
            </h2>
            <span className="column-badge">{inProgressTasks.length}</span>
          </div>
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDeleteTask} 
                onEdit={handleOpenEditModal}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon">⚡</span>
              <span className="empty-state-text">Şu an devam eden görev yok.</span>
            </div>
          )}
        </div>

        {/* Column 3: Completed */}
        <div className="board-column">
          <div className="column-header">
            <h2 className="column-title">
              <span style={{ color: 'var(--color-low)' }}>●</span>
              <span>Tamamlananlar</span>
            </h2>
            <span className="column-badge">{completedTasks.length}</span>
          </div>
          {completedTasks.length > 0 ? (
            completedTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={handleDeleteTask} 
                onEdit={handleOpenEditModal}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon">🎉</span>
              <span className="empty-state-text">Henüz tamamlanan görev yok.</span>
            </div>
          )}
        </div>
      </main>

      {/* Task Creation & Modification Modal */}
      <TaskForm 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        taskToEdit={editingTask}
      />
    </div>
  );
};
