import { useState } from "react";
import AdminInventoryList from "../../prefabs/AdminInventoryList";

const AdminDashboard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 border border-green-900 bg-gray-100 text-green-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <div>
            <input
              type="text"
              placeholder="Brukernavn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2 p-2 border border-green-900 rounded-lg w-full"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-green-900 rounded-lg w-full"
            />
          </div>
          <button
            onClick={handleLogin}
            className="p-2 bg-green-500 text-white rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-black text">Admin Side</h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
      <AdminInventoryList />
    </div>
  );
};

export default AdminDashboard;
