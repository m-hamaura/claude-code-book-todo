import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodoList } from './TodoList'

describe('TodoList', () => {
  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn()
  }

  it('should display empty state when no todos', () => {
    render(<TodoList todos={[]} {...mockHandlers} />)

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument()
    expect(screen.getByText(/add your first magical todo/i)).toBeInTheDocument()
  })

  it('should render list of todos', () => {
    const todos = [
      { id: '1', text: 'Todo 1', completed: false },
      { id: '2', text: 'Todo 2', completed: true }
    ]

    render(<TodoList todos={todos} {...mockHandlers} />)

    expect(screen.getByText('Todo 1')).toBeInTheDocument()
    expect(screen.getByText(/todo 2/i)).toBeInTheDocument()
  })

  it('should render correct number of todo items', () => {
    const todos = [
      { id: '1', text: 'Todo 1', completed: false },
      { id: '2', text: 'Todo 2', completed: false },
      { id: '3', text: 'Todo 3', completed: true }
    ]

    render(<TodoList todos={todos} {...mockHandlers} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
  })

  it('should not show empty state when todos exist', () => {
    const todos = [
      { id: '1', text: 'Todo 1', completed: false }
    ]

    render(<TodoList todos={todos} {...mockHandlers} />)

    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument()
  })
})
