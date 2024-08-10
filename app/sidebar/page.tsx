import { MdDashboard } from "react-icons/md";
import { FaInbox } from "react-icons/fa6";
import { IoMdText } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";

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
    return (
        <>
            <aside
                id="sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="flex flex-col h-full bg-indigo-200 dark:bg-gray-800">
                    <div className="flex-grow overflow-y-auto px-3 scrollbar-hide">
                        <h3 className="text-lg font-semibold mb-2 sticky top-0 text-orange-500 bg-indigo-200 py-2"> Recent Charts: </h3>
                        {recentCharts.map((chart) => (
                            <div key={chart.id} className="mb-2 hover:bg-gray-100 hover:cursor-pointer rounded-lg p-2">
                                <a href="#" className="font-medium hover:cursor-pointer"> {chart.title} </a>
                                <p className="text-sm text-gray-600"> {chart.description} </p>
                            </div>
                        ))}
                    </div>
                    <div className="px-3 py-4">
                        <hr className="border border-gray-500 mb-4"/>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <MdDashboard />
                                    <span className="ms-3"> Overview </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <FaInbox />
                                    <span className="flex-1 ms-3 whitespace-nowrap"> Inbox </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <IoMdText />
                                    <span className="flex-1 ms-3 whitespace-nowrap"> Chats </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <MdContactSupport />
                                    <span className="flex-1 ms-3 whitespace-nowrap"> Help </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    )
}
