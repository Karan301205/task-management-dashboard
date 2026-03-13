import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TaskColumn from "../components/TaskColumn"
import AddTaskModal from "../components/AddTaskModal"
import { moveTask } from "../redux/taskSlice"

function Dashboard() {
  const tasks = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const todoTasks = tasks.filter((t) => t.status === "todo")
  const inprogressTasks = tasks.filter((t) => t.status === "inprogress")
  const doneTasks = tasks.filter((t) => t.status === "done")

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // Dropped outside any column
    if (!destination) return

    // Dropped in same position
    if (destination.droppableId === source.droppableId) return

    // Dispatch moveTask to update status in Redux
    dispatch(moveTask({
      taskId: draggableId,
      newStatus: destination.droppableId,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar />
      <Header />

      <div className="ml-64 pt-16 p-8">

        {/* Project Title Row */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-800">Mobile App</h1>
            <button className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">✏️</button>
            <button className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">🔗</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["bg-purple-400", "bg-blue-400", "bg-pink-400", "bg-green-400"].map((color, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white`}></div>
              ))}
              <div className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-xs text-pink-600 font-bold">+2</div>
            </div>
            <button className="flex items-center gap-1 bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700">
              + Invite
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
              ☰ Filter
            </button>
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
              📅 Today ▾
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-purple-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-purple-700 font-medium"
            >
              + Add Task
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
              Share
            </button>
            <button className="bg-purple-600 text-white rounded-lg px-3 py-2 text-sm">⊞</button>
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">⋮⋮</button>
          </div>
        </div>

        {/* Task Board with Drag and Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6">
            <TaskColumn status="todo" tasks={todoTasks} />
            <TaskColumn status="inprogress" tasks={inprogressTasks} />
            <TaskColumn status="done" tasks={doneTasks} />
          </div>
        </DragDropContext>

      </div>

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal onClose={() => setShowModal(false)} />
      )}

    </div>
  )
}

export default Dashboard