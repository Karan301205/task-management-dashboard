import { useState } from "react"
import { useSelector } from "react-redux"
import { getDueDateStatus, formatDueDate } from "../utils/dateHelpers"

function DueDateBanner() {
  const tasks = useSelector((state) => state.tasks.tasks)
  const [dismissed, setDismissed] = useState([])

  const alertTasks = tasks.filter((task) => {
    const status = getDueDateStatus(task.dueDate)
    return (
      (status === "overdue" || status === "due-today" || status === "due-tomorrow") &&
      !dismissed.includes(task.id) &&
      task.status !== "done"
    )
  })

  if (alertTasks.length === 0) return null

  return (
    <div className="fixed top-16 left-64 right-0 z-20 px-6 pt-3 flex flex-col gap-2">
      {alertTasks.map((task) => {
        const status = getDueDateStatus(task.dueDate)

        const bannerStyles = {
          "overdue": "bg-red-50 border border-red-200 text-red-700",
          "due-today": "bg-orange-50 border border-orange-200 text-orange-700",
          "due-tomorrow": "bg-yellow-50 border border-yellow-200 text-yellow-700",
        }

        const icons = {
          "overdue": "🚨",
          "due-today": "🔔",
          "due-tomorrow": "⏰",
        }

        const messages = {
          "overdue": `is overdue since ${formatDueDate(task.dueDate)}`,
          "due-today": `is due today — ${formatDueDate(task.dueDate)}`,
          "due-tomorrow": `is due tomorrow — ${formatDueDate(task.dueDate)}`,
        }

        return (
          <div
            key={task.id}
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl shadow-sm ${bannerStyles[status]}`}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <span>{icons[status]}</span>
              <span>
                <span className="font-bold">"{task.title}"</span> {messages[status]}
              </span>
            </div>
            <button
              onClick={() => setDismissed((prev) => [...prev, task.id])}
              className="text-lg leading-none opacity-50 hover:opacity-100 ml-4"
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default DueDateBanner