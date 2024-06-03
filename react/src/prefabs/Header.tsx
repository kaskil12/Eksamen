import { Link } from "react-router-dom";

export function Header() {
    return (
        <>
            <div className="flex justify-center items-center p-4 flex-col md:flex-row">
                {/* <div className='md:w-96'>
                    <Link to="/" className=''>
                        <img src={logo} className="h-12" alt="logo" />
                    </Link>
                </div> */}
                <div className="text-gray-400 text-center">
                    <div className="flex gap-4 flex-col lg:flex-row">
                        <h1 className='hover:text-[#2596be] transition-colors duration-200 cursor-pointer'>
                            <Link to="/">Hjem</Link>
                        </h1>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
