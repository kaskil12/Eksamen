import React, { useState } from "react";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Added state for phone number
  const [isRegister, setIsRegister] = useState(false);


  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.0.0.155/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, isAdmin } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        onLogin(username);
      } else {
        alert("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  const handleRegister = async () => {
    try {
      const response = await fetch("http://10.0.0.155/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, phone }),
      });
      if (response.ok) {
        alert("Registration successful! You can now log in.");
        setIsRegister(false);
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 border border-green-900 bg-gray-100 text-green-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2 p-2 border border-green-900 rounded-lg w-full"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-green-900 rounded-lg w-full"
          />
        </div>
        {isRegister && (
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-4 p-2 border border-green-900 rounded-lg w-full"
            />
          </div>
        )}
        <button
          onClick={isRegister ? handleRegister : handleLogin}
          className="p-2 bg-green-500 text-white rounded w-full"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="p-2 bg-green-500 text-white rounded w-full mt-2"
        >
          {isRegister ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;