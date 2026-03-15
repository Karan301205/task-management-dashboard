import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, addSubtask, toggleSubtask, deleteSubtask } from "../redux/taskSlice"
import { getDueDateStatus, formatDueDate } from "../utils/dateHelpers"
import { v4 as uuidv4 } from "uuid"

function TaskCard({ task, index }) {
  const dispatch = useDispatch()
  const availableTags = useSelector((state) => state.tasks.tags)

  const [showMenu, setShowMenu] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSubtasks, setShowSubtasks] = useState(false)
  const [newSubtask, setNewSubtask] = useState("")

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

  // Subtask calculations
  const subtasks = task.subtasks || []
  const completedCount = subtasks.filter((s) => s.completed).length
  const totalCount = subtasks.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return
    dispatch(addSubtask({
      taskId: task.id,
      subtask: {
        id: uuidv4(),
        title: newSubtask.trim(),
        completed: false,
      },
    }))
    setNewSubtask("")
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

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {task.tags.map((tagId) => {
                const tag = availableTags.find((t) => t.id === tagId)
                if (!tag) return null
                return (
                  <span
                    key={tagId}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                )
              })}
            </div>
          )}

          {/* Due Date Badge */}
          {task.dueDate && (
            <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg mb-3 ${dueDateStyles[dueDateStatus]}`}>
              <span>{dueDateLabels[dueDateStatus]}</span>
              <span>· {formatDueDate(task.dueDate)}</span>
            </div>
          )}

          {/* Subtask Progress Bar */}
          {totalCount > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 font-medium">Subtasks</span>
                <span className="text-xs text-gray-500 font-semibold">
                  {completedCount}/{totalCount}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300
                    ${progressPercent === 100 ? "bg-green-500" : "bg-purple-500"}`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Subtasks Toggle Button */}
          <button
            onClick={() => setShowSubtasks(!showSubtasks)}
            className="flex items-center gap-1 text-xs text-purple-500 hover:text-purple-700 font-medium mb-3"
          >
            <span>{showSubtasks ? "▼" : "▶"}</span>
            <span>
              {showSubtasks ? "Hide subtasks" : `Subtasks ${totalCount > 0 ? `(${totalCount})` : ""}`}
            </span>
          </button>

          {/* Subtasks Expanded */}
          {showSubtasks && (
            <div className="mb-3 bg-gray-50 rounded-lg p-3">

              {subtasks.length === 0 && (
                <p className="text-xs text-gray-400 mb-2 text-center">
                  No subtasks yet. Add one below!
                </p>
              )}

              {subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2 py-1 group">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() =>
                      dispatch(toggleSubtask({ taskId: task.id, subtaskId: subtask.id }))
                    }
                    className="w-3.5 h-3.5 accent-purple-500 cursor-pointer flex-shrink-0"
                  />
                  <span
                    className={`text-xs flex-1 ${
                      subtask.completed ? "line-through text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {subtask.title}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(deleteSubtask({ taskId: task.id, subtaskId: subtask.id }))
                    }
                    className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add Subtask Input */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                  placeholder="Add a subtask..."
                  className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-purple-400 bg-white"
                />
                <button
                  onClick={handleAddSubtask}
                  className="bg-purple-500 text-white text-xs px-2 py-1.5 rounded-lg hover:bg-purple-600"
                >
                  + Add
                </button>
              </div>

            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {avatarColors.map((color, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full ${color} border-2 border-white`}
                ></div>
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
              <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={() => setShowConfirm(false)}
              ></div>
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-80 mx-4">
                  <h3 className="text-gray-800 font-bold text-base mb-2">Delete Task</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-700">"{task.title}"</span>?
                    This cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
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