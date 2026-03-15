import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Header({ sidebarCollapsed }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const leftPos = sidebarCollapsed ? "left-16" : "left-64"

  return (
    <div className={`h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 z-20 transition-all duration-300 ${leftPos}`}>

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-48 md:w-80">
        <span className="text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search for anything..."
          className="bg-transparent text-sm text-gray-600 focus:outline-none w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="hidden md:block text-gray-400 hover:text-gray-600 text-xl">📅</button>
        <button className="hidden md:block text-gray-400 hover:text-gray-600 text-xl">❓</button>
        <button className="text-gray-400 hover:text-gray-600 text-xl">🔔</button>

        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-700">{user?.displayName || "User"}</p>
            <p className="text-xs text-gray-400">{user?.email || ""}</p>
          </div>

          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-purple-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold border-2 border-purple-200">
              {user?.displayName?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg px-2 py-1 hover:border-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header