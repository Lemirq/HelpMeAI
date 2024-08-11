'use client';
import React, { useState } from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { logout } from '@/app/login/actions';
import Link from 'next/link';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { IoMenu } from 'react-icons/io5';
const Sidebar = ({ user, allChats }: { user: any; allChats: any }) => {
	const [chats, setChats] = useState(allChats || []);

	const supabase = createClient();
	const pathname = usePathname();
	useEffect(() => {
		const channel = supabase
			.channel('realtime chats')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'chats',
				},
				(payload) => {
					console.log(payload);
					setChats((prev) => {
						const index = prev.findIndex((chat) => chat.id === payload.old.id);
						if (index === -1) {
							return [...prev, payload.new];
						}
						const newChats = [...prev];
						newChats[index] = payload.new;
						return newChats;
					});
				}
			)
			.subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase]);

	const [visible, setVisible] = useState(false);

	return (
		<>
			<div className="fixed top-0 py-4 px-5 fr justify-start sm:hidden w-full bg-white/60 backdrop-blur-2xl">
				<button className="text-2xl" onClick={() => setVisible(!visible)}>
					<IoMenu />
				</button>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: visible ? 1 : 0 }}
				transition={{ ease: 'linear', duration: 0.3 }}
				className={cn('fixed w-screen h-screen bg-black/60 z-20 inset-0', { 'pointer-events-none': !visible })}
				onClick={() => setVisible(false)}
			/>

			<motion.aside
				animate={{ x: visible ? 0 : '-100%' }}
				transition={{ duration: 0.3 }}
				id="sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:!translate-x-0 text-white"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 fc items-start overflow-y-auto bg-gray-900 relative">
					<h2 className="flex items-center p-2 font-bold mb-4 font rounded-lg group">TubeAssist</h2>
					<div className="h-full fc items-start justify-start w-full gap-2">
						{chats
							.sort((a, b) => a.created_at - b.created_at)
							.map((chat) => {
								console.log(chat.id);
								return (
									<Link
										key={chat.id}
										className={cn('w-full px-3 text-sm py-2 rounded-xl transition-colors hover:bg-gray-600', {
											'bg-gray-700': pathname.includes(chat.id),
										})}
										href={`/chat/${chat.id}`}
									>
										{chat.name}
									</Link>
								);
							})}
					</div>
					<form className="flex items-center p-2 rounded-lg group" action={logout}>
						<FaArrowRightFromBracket />
						<button className="ms-3 whitespace-nowrap" type="submit">
							Logout
						</button>
					</form>
				</div>
			</motion.aside>
		</>
	);
};

export default Sidebar;
