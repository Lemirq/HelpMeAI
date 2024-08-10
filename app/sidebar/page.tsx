'use client'
import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaInbox } from "react-icons/fa6";
import { IoMdText } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import Link from 'next/link';

type RecentChart = {
    id: number;
    title: string;
    description: string;
}

const recentCharts: RecentChart[] = [
    {
        id: 1,
        title: "AI Ethics Discussion",
        description: "Exploring the implications of AI"
    },
    {
        id: 2,
        title: "Machine Learning Basics",
        description: "Introduction to fundamental ML Concepts"
    },
    {
        id: 3,
        title: "Data Privacy Concerns",
        description: "Addressing privacy issues in tech"
    },
    {
        id: 4,
        title: "NLP Advancements",
        description: "Recent breakthroughs in natural language processing"
    },
    {
        id: 5,
        title: "Quantum Computing",
        description: "Exploring the potential of quantum algorithms"
    },
    {
        id: 6,
        title: "Robotics in Healthcare",
        description: "Applications of robotics in medical field"
    },
    {
        id: 7,
        title: "Blockchain Technology",
        description: "Understanding decentralized systems"
    }
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside
            id="sidebar"
            className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
                isOpen ? 'w-64' : 'w-16'
            } bg-indigo-200 dark:bg-gray-800 flex flex-col`}
            aria-label="Sidebar"
        >
            {isOpen && (
                <div className="flex-grow overflow-y-auto px-3 scrollbar-hide">
                    <h3 className="text-lg font-semibold mb-2 sticky top-0 text-orange-500 bg-indigo-200 py-2">
                        Recent Charts:
                    </h3>
                    {recentCharts.map((chart) => (
                        <div key={chart.id} className="mb-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg p-2">
                            <a href="#" className="font-medium hover:cursor-pointer">
                                {chart.title}
                            </a>
                            <p className="text-sm text-gray-600">{chart.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-auto px-3 py-4">
                <hr className="border border-gray-500 mb-4" />
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href={Help} className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <MdDashboard size={20} />
                            {isOpen && <span className="ms-3">Overview</span>}
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FaInbox size={20} />
                            {isOpen && <span className="ms-3">Inbox</span>}
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <IoMdText size={20} />
                            {isOpen && <span className="ms-3">Chats</span>}
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <MdContactSupport size={20} />
                            {isOpen && <span className="ms-3">Help</span>}
                        </a>
                    </li>
                    <li>
                        <button onClick={toggleSidebar} className="w-full flex p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            {isOpen ? <LuPanelLeftClose size={20} /> : <LuPanelLeftOpen size={20} />}
                            {isOpen && <span className="ms-3">Close</span>}
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
