import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No todos yet. Add one above!
      </div>
    )
  }

  return (
    <ul className="space-y-2">
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
