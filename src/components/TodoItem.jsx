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
      <li className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors"
      >
        Delete
      </button>
    </li>
  )
}
