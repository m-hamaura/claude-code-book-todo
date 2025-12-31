import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getTodosFromStorage, saveTodosToStorage } from './localStorage'

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('getTodosFromStorage', () => {
    it('should return empty array when no todos in storage', () => {
      localStorage.getItem.mockReturnValue(null)
      const result = getTodosFromStorage()
      expect(result).toEqual([])
    })

    it('should return parsed todos from storage', () => {
      const mockTodos = [
        { id: '1', text: 'Test todo', completed: false }
      ]
      localStorage.getItem.mockReturnValue(JSON.stringify(mockTodos))

      const result = getTodosFromStorage()
      expect(result).toEqual(mockTodos)
    })

    it('should return empty array on parse error', () => {
      localStorage.getItem.mockReturnValue('invalid json')
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const result = getTodosFromStorage()
      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('saveTodosToStorage', () => {
    it('should save todos to localStorage', () => {
      const todos = [
        { id: '1', text: 'Test todo', completed: false }
      ]

      saveTodosToStorage(todos)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'todos',
        JSON.stringify(todos)
      )
    })

    it('should handle storage errors', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      saveTodosToStorage([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})
