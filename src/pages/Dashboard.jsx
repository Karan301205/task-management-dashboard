import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

function Dashboard() {
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

          {/* Right — Invite + Avatars */}
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

        {/* Task columns will go here */}
        <div className="flex gap-6">
          <div className="bg-gray-100 rounded-xl p-4 w-80 text-center text-gray-400 text-sm">
            To Do column coming soon...
          </div>
          <div className="bg-gray-100 rounded-xl p-4 w-80 text-center text-gray-400 text-sm">
            In Progress column coming soon...
          </div>
          <div className="bg-gray-100 rounded-xl p-4 w-80 text-center text-gray-400 text-sm">
            Done column coming soon...
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard