'use client';

import { type CoreMessage } from 'ai';
import { useEffect, useState } from 'react';
import { continueConversation } from '@/app/chat/actions';
import { readStreamableValue } from 'ai/rsc';
import Sidebar from './sidebar';
import { createClient } from '@/utils/supabase/client';
import { Input } from './ui/input';
import { IoMdArrowRoundForward, IoMdChatbubbles } from 'react-icons/io';
import { IoPerson } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { FaRobot } from 'react-icons/fa';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Chat({ user_id, SupaMessages, id }: { user_id: string; SupaMessages: CoreMessage[]; id?: string }) {
	const [messages, setMessages] = useState<CoreMessage[] | null>(null);
	const [input, setInput] = useState('');
	useEffect(() => {
		if (SupaMessages) {
			if (typeof SupaMessages === 'string') {
				SupaMessages = JSON.parse(SupaMessages);
			}
			setMessages(SupaMessages);
		} else {
			setMessages([]);
		}
	}, []);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	const supabase = createClient();

	const updateChat = async (messages: CoreMessage[]) => {
		const { data, error } = await supabase.from('chats').update({ messages }).eq('id', parseInt(id));
		if (error) {
			console.error(error);
			return;
		}
		console.log(data);
	};

	const router = useRouter();

	return (
		<>
			<Sidebar />
			<div className="fc w-full max-w-xl py-24 mx-auto stretch">
				<div className="fc items-start gap-10">
					{messages &&
						messages.map((m, i) => {
							if (m.role === 'system') return null;
							return (
								<div key={i} className="w-full fr gap-2 justify-start items-start">
									{m.role === 'user' ? <IoPerson className="text-2xl" /> : <FaRobot className="text-2xl" />}
									<div key={i} className="whitespace-pre-wrap text-base w-full">
										<ReactMarkdown
											components={{
												a: ({ node, ...props }) => <a className="" {...props} target="_blank" rel="noreferrer noopener" />,
											}}
										>
											{m.content as string}
										</ReactMarkdown>
									</div>
								</div>
							);
						})}
				</div>

				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const newMessages: CoreMessage[] = [...messages, { content: input, role: 'user' }];

						setMessages(newMessages);

						// either create new chat or update existing chat
						if (id) {
							await updateChat(newMessages);
						}

						setInput('');

						const result = await continueConversation(newMessages);
						let latestMessages = [];

						for await (const content of readStreamableValue(result)) {
							console.log(content);
							setMessages([
								...newMessages,
								{
									role: 'assistant',
									content: content as string,
								},
							]);
							if (id) {
								await updateChat([
									...newMessages,
									{
										role: 'assistant',
										content: content as string,
									},
								]);
							} else {
								latestMessages = [
									{
										role: 'system',
										content:
											"Your name is HelpMeAi (always state your name in bold). You are a helpful AI Assistant that is specialized in helping customers of Youtube. You must be very respectful at all times, understand the user's requests, and provide accurate information and solutions at all times. If the user asks that is not related to Youtube help, please state that the user is going off topic, and that you are made specifically for help with Youtube. YOU MUST NOT PROVIDE ANY INFORMATION THAT IS NOT RELATED TO YOUTUBE, INSTEAD SAY THAT YOU ARE NOT PROGRAMMED TO HELP WITH THAT TOPIC.",
									},
									...newMessages,
									{
										role: 'assistant',
										content: content as string,
									},
								];
							}
						}

						if (!id) {
							console.log(latestMessages);
							const { data: iData, error: iError } = await supabase
								.from('chats')
								.insert({ messages: JSON.stringify(latestMessages), user_id });
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
