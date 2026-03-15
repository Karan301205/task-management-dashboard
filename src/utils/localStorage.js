const TASKS_KEY = "taskboard_tasks"
const FILTER_KEY = "taskboard_filter"
const TAGS_KEY = "taskboard_tags"

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
    console.error("Failed to save tasks")
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
    console.error("Failed to save filter")
  }
}

export const loadTags = () => {
  try {
    const data = localStorage.getItem(TAGS_KEY)
    return data ? JSON.parse(data) : undefined
  } catch {
    return undefined
  }
}

export const saveTags = (tags) => {
  try {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags))
  } catch {
    console.error("Failed to save tags")
  }
}