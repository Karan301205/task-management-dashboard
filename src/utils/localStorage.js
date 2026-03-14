const KEY = "taskboard_tasks"

export const loadTasks = () => {
  try {
    const data = localStorage.getItem(KEY)
    return data ? JSON.parse(data) : undefined
  } catch {
    return undefined
  }
}

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  } catch {
    console.error("Failed to save tasks to localStorage")
  }
}