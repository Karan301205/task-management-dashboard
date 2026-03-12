function Header() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-80">
        <span className="text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search for anything..."
          className="bg-transparent text-sm text-gray-600 focus:outline-none w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600 text-xl">📅</button>
        <button className="text-gray-400 hover:text-gray-600 text-xl">❓</button>
        <button className="text-gray-400 hover:text-gray-600 text-xl">🔔</button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">Palak Jain</p>
            <p className="text-xs text-gray-400">Rajasthan, India</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
            P
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header