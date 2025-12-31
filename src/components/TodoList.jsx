import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎨</div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          No todos yet!
        </div>
        <div className="text-lg text-gray-500 mt-2">
          Add your first magical todo above ✨
        </div>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
