import {Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";

function App() {
  return (
      <Routes>

        {/* Home route -> Login */}
        <Route path="/" element={<Login />} />

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect any unknown route back to login */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
  );
}

export default App;
