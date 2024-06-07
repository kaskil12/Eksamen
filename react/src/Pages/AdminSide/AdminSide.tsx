import { useState } from "react";
import AdminInventoryList from "../../prefabs/AdminInventoryList";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-black text">Admin Side</h1>
      </div>
      <AdminInventoryList />
    </div>
  );
};

export default AdminDashboard;
