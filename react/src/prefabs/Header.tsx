import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export function Header() {
    return (
        <>
            <header className="bg-white border-b-2 border-green-500">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="h-16 mr-4" />
                    </div>
                    <div className="hidden md:flex gap-4">
                        <h1 className="hover:text-green-500 hover:underline transition-colors duration-200 cursor-pointer">
                            <Link to="/" className="text-3xl font-italic">Hjem</Link>
                        </h1>
                        {/* Add more navigation links here */}
                    </div>
                </div>
            </header>
        </>
    )
}