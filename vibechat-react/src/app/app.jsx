import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./styles/reset.css";
import "./styles/index.css";
import "./styles/auth.css";
import "./styles/chat.css";
import "./styles/modal.css";
import "./styles/variables.css";
import { AuthPage } from "@/pages/AuthPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ChatPage } from "@/pages/ChatPage";
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "@/shared/lib/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<ChatPage />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/auth/login" replace />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
