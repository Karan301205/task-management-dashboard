import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase"

function LoginPage() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Gradient Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #63e 100%)",
          zIndex: -10,
        }}
      ></div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md mx-4 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-gray-800 font-bold text-2xl">Project M.</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Sign in to access your task board and projects.
        </p>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          By signing in you agree to our Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  )
}

export default LoginPage