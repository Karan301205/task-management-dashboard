import { Draggable } from "react-beautiful-dnd"

function TaskCard({ task, index }) {
  const priorityStyles = {
    low: "bg-orange-100 text-orange-500",
    medium: "bg-blue-100 text-blue-500",
    high: "bg-red-100 text-red-500",
  }

  const avatarColors = [
    "bg-purple-400",
    "bg-blue-400",
    "bg-pink-400",
  ]

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl p-4 shadow-sm border mb-3 cursor-grab active:cursor-grabbing transition-shadow
            ${snapshot.isDragging
              ? "shadow-lg border-purple-300 rotate-1"
              : "border-gray-100"
            }`}
        >
          {/* Priority Badge + Menu */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded-md ${priorityStyles[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">···</button>
          </div>

          {/* Title */}
          <h4 className="text-gray-800 font-semibold text-sm mb-1">{task.title}</h4>

          {/* Description */}
          <p className="text-gray-400 text-xs leading-relaxed mb-4">{task.description}</p>

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

        </div>
      )}
    </Draggable>
  )
}

export default TaskCard