import React, { useState } from 'react';
import axios from 'axios';
const ContactForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('/api/send-email', {
                title,
                message,
                recipient: 'kasperkilde2@gmail.com',
            });

            setTitle('');
            setMessage('');

            alert('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <>

        <div className="max-w-md mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block mb-2">
                        Message:
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        rows={4}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-gray-800 bg-transparent border border-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900"
                >
                    Send Email
                </button>
            </form>
        </div>
        </>
    );
};

export default ContactForm;