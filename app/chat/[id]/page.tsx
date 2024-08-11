import Sidebar from '@/components/sidebar';
import Chat from '@/components/chat';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

const ChatPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const supabase = createClient();
	const fetchChat = async () => {
		const { data, error } = await supabase.from('chats').select('*').eq('id', parseInt(id));
		if (error) {
			console.error(error);
			return;
		}
		return data;
	};

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (!user || error) {
		redirect('/login');
	}

	const SupaMessages = await fetchChat();
	if (SupaMessages && SupaMessages) {
		// if not user's chat, redirect to /chat
		if (SupaMessages![0].user_id !== user.id) {
			redirect('/chat');
		}
	}

	return (
		<div className="fc w-full max-w-md py-24 mx-auto">
			<Sidebar />
			<Chat SupaMessages={SupaMessages![0].messages || []} id={id} user_id={id} />
		</div>
	);
};

export default ChatPage;
