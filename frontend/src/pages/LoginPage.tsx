import React, { useState } from "react";
import { login } from "../services/authService";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Login success: ", response);
      alert("Login successful: " + JSON.stringify(response));
      localStorage.setItem("username", response.user.username);
      window.location.href = "/chat";
    } catch (error) {
      alert("Login failed: " + error);
      console.log("Login failed", error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;