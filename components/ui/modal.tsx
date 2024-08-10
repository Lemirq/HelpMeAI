import {Dispatch, Fragment, SetStateAction} from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import {TbInfoTriangle} from "react-icons/tb";

interface IRenderMutationProps {
    displayState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const RenderReview = ({ displayState }: IRenderMutationProps) => {
    const [, setOpen] = displayState;

    const onClick = () => {
        // Logic to add write review to Supabase
        // analytics.track("Review Support: submitted");
    };

    return (
        <button
            type="button"
            className={`inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
            onClick={onClick}
        >
            Review
        </button>
    );
}

export function ReviewModal({ displayState }: IRenderMutationProps) {
    const [open, setOpen] = displayState;
    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setOpen}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-40 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start-">
                                    <div
                                        className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500-100 sm:mx-0 sm:h-10 sm:w-10`}
                                    >
                                    <TbInfoTriangle
                                            className="h-6 w-6 text-indigo-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-semibold leading-6 text-gray-900"
                                        >
                                            Leave Us A Review!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-md text-gray-500 mt-1 leading-6">
                                                Rate Your Experience
                                            </p>
                                            {/* Rate User Experience */}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <RenderReview displayState={displayState} />
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        No, go back
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
