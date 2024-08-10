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
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
			{messages.map((m) => (
				<div key={m.id} className="whitespace-pre-wrap">
					{m.role === 'user' ? 'User: ' : 'AI: '}
					{m.content}
				</div>
			))}

            <Sidebar />

			<form onSubmit={handleSubmit}>
				<input
					className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
					value={input}
					placeholder="Say something..."
					onChange={handleInputChange}
				/>
			</form>
		</div>
        </>
	);
}
