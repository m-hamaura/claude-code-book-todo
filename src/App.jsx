import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoFilter } from './components/TodoFilter'
import { TodoList } from './components/TodoList'

function App() {
  const {
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    filter,
    getFilteredTodos
  } = useTodos()

  const filteredTodos = getFilteredTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-white">
        <h1 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          ✨ Todo App ✨
        </h1>

        <TodoForm onAddTodo={addTodo} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  )
}

export default App
