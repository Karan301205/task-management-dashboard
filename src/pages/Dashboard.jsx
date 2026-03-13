import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TaskColumn from "../components/TaskColumn"

const dummyTasks = [
  {
    id: "1",
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "todo",
    priority: "low",
  },
  {
    id: "2",
    title: "Research",
    description: "User research helps you to create an optimal product for users.",
    status: "todo",
    priority: "high",
  },
  {
    id: "3",
    title: "Wireframes",
    description: "Low fidelity wireframes include the most basic content and visuals.",
    status: "todo",
    priority: "high",
  },
  {
    id: "4",
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
  },
  {
    id: "5",
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
  },
  {
    id: "6",
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "done",
    priority: "low",
  },
  {
    id: "7",
    title: "Design System",
    description: "It just needs to adapt the UI from what you did before.",
    status: "done",
    priority: "low",
  },
]

function Dashboard() {
  const todoTasks = dummyTasks.filter((t) => t.status === "todo")
  const inprogressTasks = dummyTasks.filter((t) => t.status === "inprogress")
  const doneTasks = dummyTasks.filter((t) => t.status === "done")

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar />
      <Header />

      {/* Main Content */}
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
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
              Share
            </button>
            <button className="bg-purple-600 text-white rounded-lg px-3 py-2 text-sm">⊞</button>
            <button className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">⋮⋮</button>
          </div>
        </div>

        {/* Task Board */}
        <div className="flex gap-6">
          <TaskColumn status="todo" tasks={todoTasks} />
          <TaskColumn status="inprogress" tasks={inprogressTasks} />
          <TaskColumn status="done" tasks={doneTasks} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard