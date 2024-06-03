import React from 'react';
import Logo from '../assets/logo.png';

const Footer: React.FC = () => {
    const companyName = "Cyber Security Services";
    const companyAddress = "Hamar, Norway";
    const companyPhone = "+47 123-456-7890";
    const companyEmail = "Hamar@gmail.com";

    return (
        <footer className="mt-16 bg-transparent text-white py-4">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-10 w-auto" />
                    <div className="ml-4">
                        <p>{companyName}</p>
                        <p>{companyAddress}</p>
                        <p>{companyPhone}</p>
                        <p>{companyEmail}</p>
                    </div>
                </div>
                <div className="hidden md:block flex-grow">
                    {/* Additional content for the right side of the footer */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;