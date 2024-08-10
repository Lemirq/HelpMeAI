import { MdDashboard } from "react-icons/md";
import { FaInbox } from "react-icons/fa6";
import { IoMdText } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";

export default function Sidebar () {
    return (
        <>
            <aside
                id="sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-indigo-200 dark:bg-gray-800">
                    <h2 href="#" className="flex items-center p-2 text-indigo-900 font-bold mb-4 font rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                        <span className="ms-3 text-lg"> HelpMe AI </span>
                    </h2>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2"> Recent Chats </h3>
                        <div>
                            <h4 className="font-medium"> Chat 1 </h4>
                            <p className="text-sm text-gray-600"> Short description of Chat 1 </p>
                        </div>
                        <div>
                            <h4 className="font-medium"> Chat 2 </h4>
                            <p className="text-sm text-gray-600"> Short description of Chat 2 </p>
                        </div>
                    </div>

                    <div className="flex-grow"></div>
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
                                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IoMdText />
                                <span className="flex-1 ms-3 whitespace-nowrap">Chats</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MdContactSupport />
                                <span className="flex-1 ms-3 whitespace-nowrap">Support</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    )
}

