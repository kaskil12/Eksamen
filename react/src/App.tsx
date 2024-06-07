import { useState, useEffect, SetStateAction } from "react";
import { Outlet } from "react-router";
import "./App.css";
import { Header } from "./prefabs/Header";
import { Background } from "./prefabs/Background";
import Footer from "./prefabs/Footer";
import Login from "./prefabs/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: SetStateAction<string>) => {
    localStorage.setItem("username", username as string);
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Background />
      <Header />
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <button className="absolute right-0 rounded  p-2 bg-red-500 text-white" onClick={handleLogout}>Logout</button>
          <Outlet context={{ username }} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
