import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from './TodoItem'

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test todo',
    completed: false
  }

  it('should render todo text', () => {
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('should call onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockHandlers.onToggle).toHaveBeenCalledWith('1')
  })

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    await user.click(screen.getByRole('button', { name: /delete/i }))

    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1')
  })

  it('should enter edit mode when edit button is clicked', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))

    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('should call onEdit when save button is clicked in edit mode', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const input = screen.getByDisplayValue('Test todo')
    await user.clear(input)
    await user.type(input, 'Updated todo')
    await user.click(screen.getByRole('button', { name: /save/i }))

    expect(mockHandlers.onEdit).toHaveBeenCalledWith('1', 'Updated todo')
  })

  it('should cancel edit mode when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))

    // In edit mode, should have Save and Cancel buttons
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    // After cancel, should be back in normal mode
    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('should save on Enter key press in edit mode', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const input = screen.getByDisplayValue('Test todo')
    await user.clear(input)
    await user.type(input, 'Updated todo{Enter}')

    expect(mockHandlers.onEdit).toHaveBeenCalledWith('1', 'Updated todo')
  })

  it('should cancel on Escape key press in edit mode', async () => {
    const user = userEvent.setup()
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={mockTodo} {...mockHandlers} />)

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const input = screen.getByDisplayValue('Test todo')
    await user.type(input, '{Escape}')

    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(mockHandlers.onEdit).not.toHaveBeenCalled()
  })

  it('should display completed todo with strikethrough', () => {
    const completedTodo = { ...mockTodo, completed: true }
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={completedTodo} {...mockHandlers} />)

    const text = screen.getByText(/test todo/i)
    expect(text).toHaveClass('line-through')
  })

  it('should check checkbox for completed todo', () => {
    const completedTodo = { ...mockTodo, completed: true }
    const mockHandlers = {
      onToggle: vi.fn(),
      onDelete: vi.fn(),
      onEdit: vi.fn()
    }

    render(<TodoItem todo={completedTodo} {...mockHandlers} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })
})
