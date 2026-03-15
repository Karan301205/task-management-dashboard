export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return null

  const now = new Date()
  const due = new Date(dueDate)

  // Strip time — compare dates only
  now.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  const diffMs = due - now
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return "overdue"
  if (diffDays === 0) return "due-today"
  if (diffDays === 1) return "due-tomorrow"
  return "upcoming"
}

export const formatDueDate = (dueDate) => {
  if (!dueDate) return null
  const due = new Date(dueDate)
  return due.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}