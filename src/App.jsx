import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import WelcomePage from "./pages/WelcomePage"
import Dashboard from "./pages/Dashboard"

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/welcome" /> : <LoginPage />}
      />
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <WelcomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App