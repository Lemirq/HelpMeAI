'use client';

import { type CoreMessage } from 'ai';
import { useEffect, useState } from 'react';
import { continueConversation } from '@/app/chat/actions';
import { readStreamableValue } from 'ai/rsc';
import Sidebar from './sidebar';
import { createClient } from '@/utils/supabase/client';
import { Input } from './ui/input';
import { IoMdArrowRoundForward, IoMdChatbubbles } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Chat({ user_id, SupaMessages, id }: { user_id: string; SupaMessages: CoreMessage[]; id: string }) {
	console.log(SupaMessages);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		if (SupaMessages) {
			setMessages(SupaMessages);
		}
	}, []);

	const supabase = createClient();

	const updateChat = async (messages: CoreMessage[]) => {
		const { data, error } = await supabase.from('chats').update({ messages }).eq('id', parseInt(id));
		if (error) {
			console.error(error);
			return;
		}
	};

	const router = useRouter();

	return (
		<>
			<Sidebar />
			<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
				{messages.map((m, i) => (
					<div key={i} className="whitespace-pre-wrap">
						{m.role === 'user' ? 'User: ' : 'AI: '}
						<ReactMarkdown>{m.content as string}</ReactMarkdown>
					</div>
				))}

				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const newMessages: CoreMessage[] = [...messages, { content: input, role: 'user' }];

						setMessages(newMessages);

						// either create new chat or update existing chat
						if (!id) {
							console.log(messages);
							console.log(user_id);

							const { data: iData, error: iError } = await supabase
								.from('chats')
								.insert({ messages: JSON.stringify(newMessages), user_id });
							console.log(iData);
							if (iError) {
								console.error(iError);
							}

							// get the id of the chat and redirect to the chat page
							const { data, error } = await supabase
								.from('chats')
								.select('*')
								.eq('user_id', user_id)
								.order('created_at', { ascending: false });
							if (error || !data) {
								console.error(error);
								return;
							}
							const chatId = data[0].id;
							router.push(`/chat/${chatId}`);
						} else {
							await updateChat(newMessages);
						}

						setInput('');

						const result = await continueConversation(newMessages);

						for await (const content of readStreamableValue(result)) {
							setMessages([
								...newMessages,
								{
									role: 'assistant',
									content: content as string,
								},
							]);
							await updateChat([
								...newMessages,
								{
									role: 'assistant',
									content: content as string,
								},
							]);
						}
					}}
				>
					<div className="fixed bottom-10 w-full max-w-md fr gap-2 text-3xl">
						<label htmlFor="user">
							<IoMdChatbubbles />
						</label>

						<Input className="w-full text-base" value={input} placeholder="Say something..." onChange={(e) => setInput(e.target.value)} />
						<Button type="submit">
							<IoMdArrowRoundForward />
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
