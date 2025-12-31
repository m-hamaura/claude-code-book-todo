import { useState } from 'react'

export const TodoForm = ({ onAddTodo }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onAddTodo(input)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="✏️ Add a magical todo..."
          className="flex-1 px-6 py-4 text-lg border-4 border-purple-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-400 placeholder-purple-400 font-medium shadow-lg transition-all"
        />
        <button
          type="submit"
          className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-200 active:scale-95"
        >
          ➕ Add
        </button>
      </div>
    </form>
  )
}
