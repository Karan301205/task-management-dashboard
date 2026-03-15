const TASKS_KEY = "taskboard_tasks"
const FILTER_KEY = "taskboard_filter"

export const loadTasks = () => {
  try {
    const data = localStorage.getItem(TASKS_KEY)
    return data ? JSON.parse(data) : undefined
  } catch {
    return undefined
  }
}

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch {
    console.error("Failed to save tasks to localStorage")
  }
}

export const loadFilter = () => {
  try {
    return localStorage.getItem(FILTER_KEY) || "all"
  } catch {
    return "all"
  }
}

export const saveFilter = (filter) => {
  try {
    localStorage.setItem(FILTER_KEY, filter)
  } catch {
    console.error("Failed to save filter to localStorage")
  }
}