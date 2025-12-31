import { useState } from 'react'

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <li className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg border-2 border-purple-300">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 font-medium"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold hover:scale-110 hover:shadow-xl transition-all"
        >
          💾 Save
        </button>
        <button
          onClick={handleCancel}
          className="px-5 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl font-bold hover:scale-110 hover:shadow-xl transition-all"
        >
          ✖️ Cancel
        </button>
      </li>
    )
  }

  return (
    <li className={`flex items-center gap-4 p-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl border-2 ${
      todo.completed
        ? 'bg-gradient-to-r from-green-100 to-blue-100 border-green-300'
        : 'bg-gradient-to-r from-yellow-50 to-pink-50 border-pink-300'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-7 h-7 text-purple-500 rounded-lg focus:ring-4 focus:ring-purple-400 cursor-pointer transform hover:scale-125 transition-transform"
      />
      <span
        className={`flex-1 text-lg font-medium transition-all ${
          todo.completed
            ? 'line-through text-gray-500 opacity-75'
            : 'text-gray-800'
        }`}
      >
        {todo.completed ? '✓ ' : ''}{todo.text}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-bold hover:scale-110 hover:shadow-xl transition-all"
      >
        ✏️ Edit
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl font-bold hover:scale-110 hover:shadow-xl transition-all"
      >
        🗑️ Delete
      </button>
    </li>
  )
}
