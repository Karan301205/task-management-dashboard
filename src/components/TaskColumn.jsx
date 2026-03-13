import { Droppable } from "react-beautiful-dnd"
import TaskCard from "./TaskCard"

const columnStyles = {
  todo: {
    label: "To Do",
    dot: "bg-blue-600",
    bar: "bg-blue-600",
  },
  inprogress: {
    label: "On Progress",
    dot: "bg-orange-400",
    bar: "bg-orange-400",
  },
  done: {
    label: "Done",
    dot: "bg-green-500",
    bar: "bg-green-500",
  },
}

function TaskColumn({ status, tasks }) {
  const style = columnStyles[status]

  return (
    <div className="w-80 flex-shrink-0">

      {/* Column Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`}></span>
          <span className="text-gray-700 font-semibold text-sm">{style.label}</span>
          <span className="bg-gray-200 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Colored Bar */}
      <div className={`h-1 rounded-full ${style.bar} mb-4`}></div>

      {/* Droppable Zone */}
      <Droppable droppableId={status} isDropDisabled={false} direction="vertical">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col min-h-32 rounded-xl transition-colors p-1
              ${snapshot.isDraggingOver ? "bg-purple-50" : "bg-transparent"}`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  )
}

export default TaskColumn