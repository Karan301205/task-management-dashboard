import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { deleteTask } from "../redux/taskSlice"
import { getDueDateStatus, formatDueDate } from "../utils/dateHelpers"

function TaskCard({ task, index }) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const priorityStyles = {
    low: "bg-orange-100 text-orange-500",
    medium: "bg-blue-100 text-blue-500",
    high: "bg-red-100 text-red-500",
  }

  const avatarColors = ["bg-purple-400", "bg-blue-400", "bg-pink-400"]

  const dueDateStatus = getDueDateStatus(task.dueDate)

  const dueDateStyles = {
    "overdue": "bg-red-100 text-red-600 border border-red-200",
    "due-today": "bg-orange-100 text-orange-600 border border-orange-200",
    "due-tomorrow": "bg-yellow-100 text-yellow-600 border border-yellow-200",
    "upcoming": "bg-green-100 text-green-600 border border-green-200",
  }

  const dueDateLabels = {
    "overdue": "⚠️ Overdue",
    "due-today": "🔔 Due Today",
    "due-tomorrow": "⏰ Due Tomorrow",
    "upcoming": "📅",
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
    setShowConfirm(false)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl p-4 shadow-sm border mb-3 cursor-grab active:cursor-grabbing transition-shadow
            ${snapshot.isDragging ? "shadow-lg border-purple-300 rotate-1" : "border-gray-100"}
            ${dueDateStatus === "overdue" ? "border-l-4 border-l-red-400" : ""}
            ${dueDateStatus === "due-today" ? "border-l-4 border-l-orange-400" : ""}
            ${dueDateStatus === "due-tomorrow" ? "border-l-4 border-l-yellow-400" : ""}
          `}
        >
          {/* Priority + Menu */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded-md ${priorityStyles[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none px-1"
              >
                ···
              </button>
              {showMenu && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                  <button
                    onClick={() => { setShowMenu(false); setShowConfirm(true) }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h4 className="text-gray-800 font-semibold text-sm mb-1">{task.title}</h4>

          {/* Description */}
          <p className="text-gray-400 text-xs leading-relaxed mb-3">{task.description}</p>

          {/* Due Date Badge */}
          {task.dueDate && (
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg mb-3 ${dueDateStyles[dueDateStatus]}`}>
              <span>{dueDateLabels[dueDateStatus]}</span>
              {dueDateStatus === "upcoming" && (
                <span>{formatDueDate(task.dueDate)}</span>
              )}
              {dueDateStatus !== "upcoming" && (
                <span>· {formatDueDate(task.dueDate)}</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {avatarColors.map((color, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${color} border-2 border-white`}></div>
              ))}
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-xs">
              <span className="flex items-center gap-1">💬 <span>12 comments</span></span>
              <span className="flex items-center gap-1">📄 <span>0 files</span></span>
            </div>
          </div>

          {/* Delete Confirmation */}
          {showConfirm && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setShowConfirm(false)}></div>
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-80 mx-4">
                  <h3 className="text-gray-800 font-bold text-base mb-2">Delete Task</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Are you sure you want to delete <span className="font-semibold text-gray-700">"{task.title}"</span>? This cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowConfirm(false)} className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50">Cancel</button>
                    <button onClick={handleDelete} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm hover:bg-red-600">Delete</button>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </Draggable>
  )
}

export default TaskCard