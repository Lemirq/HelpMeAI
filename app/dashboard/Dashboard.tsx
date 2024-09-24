'use client';

import { useChat } from 'ai/react';
import { User } from '@supabase/supabase-js';
import Sidebar from '../sidebar/page';
import Navbar from './Navbar';

interface DashboardProps {
    user: User;
}

export default function Chat({user}: DashboardProps) {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    return (
        <>
            <Navbar />
            <div className="flex flex-col w-full max-w-md py-24 mx-auto">
                {messages.map((m) => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        {m.role === 'user' ? 'User: ' : 'AI: '}
                        {m.content}
                    </div>
                ))}

                <Sidebar />

                <form onSubmit={handleSubmit} className="fixed bottom-0 w-full mb-8">
                    <input
                        className="flex-grow w-96 p-4 border border-gray-400 rounded-lg shadow-xl m-3 focus:outline-none focus-ring-5 focus:ring-indigo-300"
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                    <button type="submit"
                        className="text-sm font-medium text-white p-4 bg-orange-700 rounded-lg border border-blue-700 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </form>
            </div>
        </>
    );
}
