import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login"> Login</Link>
        </li>
        <li>
          <Link to="/register"> Register</Link>
        </li>
        <li>
          <Link to="/chat"> Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
