function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col px-4 py-6 fixed left-0 top-0">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">P</span>
        </div>
        <span className="text-gray-800 font-bold text-lg">Project M.</span>
        <span className="ml-auto text-gray-400 cursor-pointer">«</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
          <span>⊞</span> Home
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
          <span>💬</span> Messages
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
          <span>✓</span> Tasks
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
          <span>👥</span> Members
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
          <span>⚙️</span> Settings
        </a>
      </nav>

      {/* My Projects */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">My Projects</span>
          <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">+</button>
        </div>
        <div className="flex flex-col gap-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-50 text-purple-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            Mobile App
            <span className="ml-auto text-gray-400">···</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Website Redesign
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
            <span className="w-2 h-2 rounded-full bg-purple-300"></span>
            Design System
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Wireframes
          </a>
        </div>
      </div>

      {/* Thoughts Time Card */}
      <div className="mt-auto mx-2 bg-amber-50 rounded-xl p-4 text-center">
        <div className="text-2xl mb-2">💡</div>
        <p className="text-sm font-semibold text-gray-700">Thoughts Time</p>
        <p className="text-xs text-gray-400 mt-1 mb-3">
          We don't have any notice for you, till then you can share your thoughts with your peers.
        </p>
        <button className="w-full text-xs border border-gray-300 rounded-lg py-2 text-gray-600 hover:bg-gray-100">
          Write a message
        </button>
      </div>

    </div>
  )
}

export default Sidebar