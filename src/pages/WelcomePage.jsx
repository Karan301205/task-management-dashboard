import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function WelcomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard")
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #63e 100%)",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center">

        {/* Avatar */}
        <div className="mb-6">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-purple-200 shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-purple-200">
              {user?.displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"}
            </div>
          )}
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.displayName?.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Taking you to your dashboard...
        </p>

        {/* Loading dots */}
        <div className="flex justify-center items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default WelcomePage