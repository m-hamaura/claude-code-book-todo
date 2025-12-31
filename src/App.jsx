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

  console.log('App rendered, todos:', filteredTodos)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Todo App
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
