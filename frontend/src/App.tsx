import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div className="App">
      <h1>Authentication Forms</h1>
      <h2>Login</h2>
      <LoginForm />
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
}

export default App;
