'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
	return (
		<div className="h-screen w-full rounded-md bg-neutral-100 relative flex flex-col px-5 sm:px-10 items-center justify-center antialiased">
			<motion.div
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: 'easeInOut',
				}}
				className="text-center"
			>
				<h1 className="mt-8 bg-gradient-to-br from-slate-600 to-slate-800 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
					HelpMeAI: The next generation <br /> of Customer Service AI
				</h1>
				<p className="text-neutral-700 max-w-xl mx-auto my-6 text-sm text-center relative z-10">
					HelpMeAI helps with customer service, and guarantees satisfactory answers
				</p>
				<div className="flex justify-center gap-4 mt-10">
					<Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
						<Link href="/login">Login</Link>
					</Button>
					<Button className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md">
						<Link href="/dashboard">Dashboard</Link>
					</Button>
				</div>
			</motion.div>
		</div>
	);
}