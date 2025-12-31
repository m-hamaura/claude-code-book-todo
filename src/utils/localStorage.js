const STORAGE_KEY = 'todos'

export const getTodosFromStorage = () => {
  try {
    const todosJson = localStorage.getItem(STORAGE_KEY)
    if (todosJson) {
      return JSON.parse(todosJson)
    }
    return []
  } catch (error) {
    console.error('Error loading todos from localStorage:', error)
    return []
  }
}

export const saveTodosToStorage = (todos) => {
  try {
    const todosJson = JSON.stringify(todos)
    localStorage.setItem(STORAGE_KEY, todosJson)
  } catch (error) {
    console.error('Error saving todos to localStorage:', error)
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please delete some todos.')
    }
  }
}
