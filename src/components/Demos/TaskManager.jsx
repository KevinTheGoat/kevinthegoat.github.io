import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useTheme } from '../../context/ThemeContext'

const priorities = [
  { id: 'high', label: 'High', color: '#ef4444' },
  { id: 'medium', label: 'Medium', color: '#f59e0b' },
  { id: 'low', label: 'Low', color: '#22c55e' },
]

const categories = ['Work', 'Personal', 'Shopping', 'Health']

export default function TaskManager() {
  const { theme } = useTheme()
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kevco-tasks')
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Review project proposal', completed: false, priority: 'high', category: 'Work' },
      { id: 2, text: 'Buy groceries', completed: false, priority: 'medium', category: 'Shopping' },
      { id: 3, text: 'Schedule dentist appointment', completed: true, priority: 'low', category: 'Health' },
    ]
  })
  const [newTask, setNewTask] = useState('')
  const [newPriority, setNewPriority] = useState('medium')
  const [newCategory, setNewCategory] = useState('Work')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('kevco-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        priority: newPriority,
        category: newCategory,
      },
    ])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return task.category === filter
  })

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: theme.elevated }}
        >
          <div className="text-2xl font-bold" style={{ color: theme.accent }}>
            {tasks.length}
          </div>
          <div className="text-sm" style={{ color: theme.muted }}>Total</div>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: theme.elevated }}
        >
          <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>
            {completedCount}
          </div>
          <div className="text-sm" style={{ color: theme.muted }}>Completed</div>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: theme.elevated }}
        >
          <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
            {tasks.length - completedCount}
          </div>
          <div className="text-sm" style={{ color: theme.muted }}>Pending</div>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 rounded-xl outline-none transition-all focus:ring-2"
            style={{
              backgroundColor: theme.elevated,
              color: theme.text,
              border: `1px solid ${theme.border}`,
            }}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            <Icon icon="ph:plus-bold" className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-3">
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ backgroundColor: theme.elevated, color: theme.text, border: `1px solid ${theme.border}` }}
          >
            {priorities.map((p) => (
              <option key={p.id} value={p.id}>{p.label} Priority</option>
            ))}
          </select>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ backgroundColor: theme.elevated, color: theme.text, border: `1px solid ${theme.border}` }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'active', 'completed', ...categories].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
            style={{
              backgroundColor: filter === f ? theme.accent : theme.elevated,
              color: filter === f ? theme.bg : theme.text,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12" style={{ color: theme.muted }}>
            <Icon icon="ph:clipboard-text" className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const priority = priorities.find((p) => p.id === task.priority)
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl flex items-center gap-4 transition-all ${
                  task.completed ? 'opacity-60' : ''
                }`}
                style={{ backgroundColor: theme.elevated }}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    borderColor: task.completed ? theme.accent : theme.border,
                    backgroundColor: task.completed ? theme.accent : 'transparent',
                  }}
                >
                  {task.completed && (
                    <Icon icon="ph:check-bold" className="w-3.5 h-3.5" style={{ color: theme.bg }} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: priority?.color }}
                    />
                    <span className="text-xs" style={{ color: theme.muted }}>
                      {task.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 rounded-lg transition-all hover:bg-red-500/20"
                  style={{ color: theme.muted }}
                >
                  <Icon icon="ph:trash-bold" className="w-4 h-4" />
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
