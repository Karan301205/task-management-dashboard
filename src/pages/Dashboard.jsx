import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TaskColumn from "../components/TaskColumn"
import AddTaskModal from "../components/AddTaskModal"
import DueDateBanner from "../components/DueDateBanner"
import { moveTask } from "../redux/taskSlice"
import { loadFilter, saveFilter } from "../utils/localStorage"

function Dashboard() {
  const tasks = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState(loadFilter)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const priorityOrder = { high: 0, medium: 1, low: 2 }
  const sortByPriority = (taskList) =>
    [...taskList].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const handleFilterChange = (level) => {
    setPriorityFilter(level)
    saveFilter(level)
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId) return
    dispatch(moveTask({ taskId: draggableId, newStatus: destination.droppableId }))
  }

  const filteredTasks = priorityFilter === "all"
    ? tasks
    : tasks.filter((t) => t.priority === priorityFilter)

  const todoTasks = sortByPriority(filteredTasks.filter((t) => t.status === "todo"))
  const inprogressTasks = sortByPriority(filteredTasks.filter((t) => t.status === "inprogress"))
  const doneTasks = sortByPriority(filteredTasks.filter((t) => t.status === "done"))

  // Responsive left margin
  // mobile: no margin, tablet: ml-16, desktop: ml-64 or ml-16
  const mainMargin = "ml-0 md:ml-16 lg:" + (sidebarCollapsed ? "ml-16" : "ml-64")

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <Header
        sidebarCollapsed={sidebarCollapsed}
        onMobileMenuClick={() => setMobileMenuOpen(true)}
      />

      <DueDateBanner sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <div
        className={"transition-all duration-300 p-4 md:p-6 lg:p-8 " + mainMargin}
        style={{ paddingTop: "80px" }}
      >

        {/* Project Title Row */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Mobile App</h1>
            <button className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs md:text-sm">✏️</button>
            <button className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs md:text-sm">🔗</button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex -space-x-2">
              {["bg-purple-400", "bg-blue-400", "bg-pink-400", "bg-green-400"].map((color, i) => (
                <div key={i} className={"w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white " + color}></div>
              ))}
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-xs text-pink-600 font-bold">+2</div>
            </div>
            <button className="flex items-center gap-1 bg-purple-600 text-white text-xs md:text-sm px-3 md:px-4 py-2 rounded-lg hover:bg-purple-700">
              + Invite
            </button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 text-white rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm hover:bg-purple-700 font-medium"
          >
            + Add Task
          </button>
          <div className="flex items-center gap-2">
            <button className="hidden sm:block border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
              Share
            </button>
            <button className="bg-purple-600 text-white rounded-lg px-3 py-2 text-sm">⊞</button>
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">⋮⋮</button>
          </div>
        </div>

        {/* Priority Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs md:text-sm text-gray-500 font-medium">Filter:</span>
          {["all", "low", "medium", "high"].map((level) => {
            const styles = {
              all: "bg-gray-200 text-gray-600",
              low: "bg-orange-100 text-orange-500",
              medium: "bg-blue-100 text-blue-500",
              high: "bg-red-100 text-red-500",
            }
            const activeStyles = {
              all: "bg-gray-500 text-white",
              low: "bg-orange-400 text-white",
              medium: "bg-blue-500 text-white",
              high: "bg-red-500 text-white",
            }
            return (
              <button
                key={level}
                onClick={() => handleFilterChange(level)}
                className={"px-3 py-1 rounded-full text-xs font-semibold transition-colors " + (priorityFilter === level ? activeStyles[level] : styles[level])}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            )
          })}
          {priorityFilter !== "all" && (
            <button
              onClick={() => handleFilterChange("all")}
              className="text-xs text-gray-400 hover:text-gray-600 underline ml-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Task Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-6">
            <div className="flex-shrink-0 w-72 sm:w-80">
              <TaskColumn status="todo" tasks={todoTasks} />
            </div>
            <div className="flex-shrink-0 w-72 sm:w-80">
              <TaskColumn status="inprogress" tasks={inprogressTasks} />
            </div>
            <div className="flex-shrink-0 w-72 sm:w-80">
              <TaskColumn status="done" tasks={doneTasks} />
            </div>
          </div>
        </DragDropContext>

      </div>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}

    </div>
  )
}

export default Dashboard