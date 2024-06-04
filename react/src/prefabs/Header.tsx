import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white border-b-2 border-green-500">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 mr-4" />
          </div>
          <div className="md:hidden">
            <button
              className="text-3xl font-italic hover:text-green-500 hover:underline transition-colors duration-200 cursor-pointer"
              onClick={toggleMenu}
            >
              ☰
            </button>
          </div>
          <nav
            className={`md:flex gap-4 ${
              isMenuOpen ? "flex" : "hidden"
            } flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t-2 border-green-500 md:border-0`}
          >
            <h1 className="hover:text-green-500 hover:underline transition-colors duration-200 cursor-pointer">
              <Link to="/" className="text-3xl font-italic">
                Hjem
              </Link>
            </h1>
            <h1 className="hover:text-green-500 hover:underline transition-colors duration-200 cursor-pointer">
              <Link to="/admin" className="text-3xl font-italic">
                Admin
              </Link>
            </h1>
          </nav>
        </div>
      </header>
    </>
  );
}
