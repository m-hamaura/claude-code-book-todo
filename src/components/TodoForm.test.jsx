import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoForm } from './TodoForm'

describe('TodoForm', () => {
  it('should render input and button', () => {
    const mockOnAddTodo = vi.fn()
    render(<TodoForm onAddTodo={mockOnAddTodo} />)

    expect(screen.getByPlaceholderText(/add a magical todo/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('should call onAddTodo when form is submitted with text', async () => {
    const user = userEvent.setup()
    const mockOnAddTodo = vi.fn()
    render(<TodoForm onAddTodo={mockOnAddTodo} />)

    const input = screen.getByPlaceholderText(/add a magical todo/i)
    await user.type(input, 'New todo')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo')
  })

  it('should clear input after submitting', async () => {
    const user = userEvent.setup()
    const mockOnAddTodo = vi.fn()
    render(<TodoForm onAddTodo={mockOnAddTodo} />)

    const input = screen.getByPlaceholderText(/add a magical todo/i)
    await user.type(input, 'New todo')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(input).toHaveValue('')
  })

  it('should not call onAddTodo with empty input', async () => {
    const user = userEvent.setup()
    const mockOnAddTodo = vi.fn()
    render(<TodoForm onAddTodo={mockOnAddTodo} />)

    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(mockOnAddTodo).not.toHaveBeenCalled()
  })

  it('should not call onAddTodo with whitespace only', async () => {
    const user = userEvent.setup()
    const mockOnAddTodo = vi.fn()
    render(<TodoForm onAddTodo={mockOnAddTodo} />)

    const input = screen.getByPlaceholderText(/add a magical todo/i)
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(mockOnAddTodo).not.toHaveBeenCalled()
  })

  it('should submit on Enter key press', async () => {
    const user = userEvent.setup()
    const mockOnAddTodo = vi.fn()
    render(<TodoForm onAddTodo={mockOnAddTodo} />)

    const input = screen.getByPlaceholderText(/add a magical todo/i)
    await user.type(input, 'New todo{Enter}')

    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo')
  })
})
