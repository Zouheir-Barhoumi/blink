import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { Flex, Box, Image, Text } from "@chakra-ui/react";

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
    <Box className="App" position="relative">
      <Flex
        position="absolute"
        boxSize="100px"
        alignItems="center"
        zIndex={1000}
      >
        <Image
          src="/src/assets/images/logo.png"
          alt="logo"
          transform="rotate(90deg)"
        ></Image>
        <Text
          transform="translateY(.3rem)"
          fontSize="4xl"
          letterSpacing="6px"
          color="primary.200"
        >
          Blink
        </Text>
      </Flex>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default App;
