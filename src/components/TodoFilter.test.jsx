import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoFilter } from './TodoFilter'

describe('TodoFilter', () => {
  it('should render all filter buttons', () => {
    const mockOnFilterChange = vi.fn()
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />)

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument()
  })

  it('should highlight the current filter', () => {
    const mockOnFilterChange = vi.fn()
    render(<TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />)

    const activeButton = screen.getByRole('button', { name: /active/i })
    expect(activeButton).toHaveClass('from-yellow-400')
  })

  it('should call onFilterChange when All button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnFilterChange = vi.fn()
    render(<TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />)

    await user.click(screen.getByRole('button', { name: /all/i }))

    expect(mockOnFilterChange).toHaveBeenCalledWith('all')
  })

  it('should call onFilterChange when Active button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnFilterChange = vi.fn()
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />)

    await user.click(screen.getByRole('button', { name: /active/i }))

    expect(mockOnFilterChange).toHaveBeenCalledWith('active')
  })

  it('should call onFilterChange when Done button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnFilterChange = vi.fn()
    render(<TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />)

    await user.click(screen.getByRole('button', { name: /done/i }))

    expect(mockOnFilterChange).toHaveBeenCalledWith('completed')
  })

  it('should apply different gradient to each filter button when active', () => {
    const mockOnFilterChange = vi.fn()

    const { rerender } = render(
      <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
    )
    expect(screen.getByRole('button', { name: /all/i })).toHaveClass('from-pink-400')

    rerender(<TodoFilter currentFilter="active" onFilterChange={mockOnFilterChange} />)
    expect(screen.getByRole('button', { name: /active/i })).toHaveClass('from-yellow-400')

    rerender(<TodoFilter currentFilter="completed" onFilterChange={mockOnFilterChange} />)
    expect(screen.getByRole('button', { name: /done/i })).toHaveClass('from-green-400')
  })
})
