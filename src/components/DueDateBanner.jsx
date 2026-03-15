import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getDueDateStatus, formatDueDate } from "../utils/dateHelpers"

function BannerItem({ task, onDismiss }) {
  const [visible, setVisible] = useState(true)
  const dueDateStatus = getDueDateStatus(task.dueDate)

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

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 3000)
    const removeTimer = setTimeout(() => onDismiss(task.id), 3500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [task.id, onDismiss])

  const itemClass = visible
    ? "flex items-center justify-between px-4 py-2.5 rounded-xl shadow-sm transition-all duration-500 ease-in-out opacity-100 translate-y-0 " + bannerStyles[dueDateStatus]
    : "flex items-center justify-between px-4 py-2.5 rounded-xl shadow-sm transition-all duration-500 ease-in-out opacity-0 -translate-y-4 pointer-events-none " + bannerStyles[dueDateStatus]

  return (
    <div className={itemClass}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <span>{icons[dueDateStatus]}</span>
        <span>
          <span className="font-bold">"{task.title}"</span> {messages[dueDateStatus]}
        </span>
      </div>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(() => onDismiss(task.id), 500)
        }}
        className="text-lg leading-none opacity-50 hover:opacity-100 ml-4"
      >
        ✕
      </button>
    </div>
  )
}

function DueDateBanner({ sidebarCollapsed }) {
  const tasks = useSelector((state) => state.tasks.tasks)
  const [dismissed, setDismissed] = useState([])

  const handleDismiss = (id) => {
    setDismissed((prev) => [...prev, id])
  }

  const alertTasks = tasks.filter((task) => {
    const status = getDueDateStatus(task.dueDate)
    return (
      (status === "overdue" || status === "due-today" || status === "due-tomorrow") &&
      !dismissed.includes(task.id) &&
      task.status !== "done"
    )
  })

  if (alertTasks.length === 0) return null

  const leftPos = sidebarCollapsed ? "left-16" : "left-64"

  return (
    <div className={`fixed top-16 right-0 z-20 px-4 md:px-6 pt-3 flex flex-col gap-2 transition-all duration-300 ${leftPos}`}>
      {alertTasks.map((task) => (
        <BannerItem key={task.id} task={task} onDismiss={handleDismiss} />
      ))}
    </div>
  )
}

export default DueDateBanner