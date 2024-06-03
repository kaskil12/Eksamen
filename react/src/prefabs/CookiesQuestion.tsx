import { useState, useEffect } from 'react';

const CookiesQuestion = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const hasAcceptedCookies = localStorage.getItem('acceptedCookies');
        if (!hasAcceptedCookies) {
            setShowPopup(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('acceptedCookies', 'true');
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black to-turquoise bg-opacity-50">
                    <div className="bg-gradient-to-br from-darkblue to-lightblue p-4 rounded-md text-white border border-white">
                        <h2 className="text-lg font-bold mb-2">Godta Cookies</h2>
                        <p className="mb-4">Vil du at denne siden skal bruke cookies for å øke din brukeropplevelse?</p>
                        <div className="flex justify-center items-end">
                            <button className="mr-2 px-4 py-2 bg-none text-green-500 rounded-md border border-green-500" onClick={acceptCookies}>
                                Accept
                            </button>
                            <button className="px-4 py-2 bg-none text-red-500 rounded-md border border-red-500" onClick={() => setShowPopup(false)}>
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookiesQuestion;