import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTodos } from './useTodos'

vi.mock('../utils/localStorage', () => ({
  getTodosFromStorage: vi.fn(() => []),
  saveTodosToStorage: vi.fn(),
}))

describe('useTodos hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty todos and "all" filter', () => {
    const { result } = renderHook(() => useTodos())

    expect(result.current.todos).toEqual([])
    expect(result.current.filter).toBe('all')
  })

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('New todo')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('New todo')
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('should not add empty todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('   ')
    })

    expect(result.current.todos).toHaveLength(0)
  })

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Todo 1')
      result.current.addTodo('Todo 2')
    })

    const firstTodoId = result.current.todos[0].id

    act(() => {
      result.current.deleteTodo(firstTodoId)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Todo 2')
  })

  it('should toggle todo completion', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Test todo')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(true)

    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(false)
  })

  it('should edit todo text', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Original text')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.editTodo(todoId, 'Updated text')
    })

    expect(result.current.todos[0].text).toBe('Updated text')
  })

  it('should not edit todo with empty text', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Original text')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.editTodo(todoId, '   ')
    })

    expect(result.current.todos[0].text).toBe('Original text')
  })

  it('should filter todos by "active"', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Active todo')
      result.current.addTodo('Completed todo')
    })

    act(() => {
      result.current.toggleTodo(result.current.todos[1].id)
    })

    act(() => {
      result.current.setFilter('active')
    })

    const filtered = result.current.getFilteredTodos()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].text).toBe('Active todo')
  })

  it('should filter todos by "completed"', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Active todo')
      result.current.addTodo('Completed todo')
    })

    act(() => {
      result.current.toggleTodo(result.current.todos[1].id)
    })

    act(() => {
      result.current.setFilter('completed')
    })

    const filtered = result.current.getFilteredTodos()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].text).toBe('Completed todo')
  })

  it('should show all todos when filter is "all"', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('Todo 1')
      result.current.addTodo('Todo 2')
    })

    act(() => {
      result.current.toggleTodo(result.current.todos[0].id)
    })

    const filtered = result.current.getFilteredTodos()
    expect(filtered).toHaveLength(2)
  })
})
