import { useState, useEffect } from 'react'
import { getTodosFromStorage, saveTodosToStorage } from '../utils/localStorage'

export const useTodos = () => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = getTodosFromStorage()
    if (savedTodos.length > 0) {
      setTodos(savedTodos)
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodosToStorage(todos)
  }, [todos])

  const addTodo = (text) => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: trimmedText,
      completed: false,
      createdAt: Date.now()
    }

    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const editTodo = (id, newText) => {
    const trimmedText = newText.trim()
    if (!trimmedText) return

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    )
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  return {
    todos,
    filter,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    getFilteredTodos
  }
}
