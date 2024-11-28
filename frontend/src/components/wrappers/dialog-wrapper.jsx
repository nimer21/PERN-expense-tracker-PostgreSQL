import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment } from "react";

const DialogWrapper = ({ isOpen, closeModal, children }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                // className="fixed inset-0 z-10 overflow-y-auto"
                className="relative z-50"
                onClose={closeModal}
            >
                {/* <div className="min-h-screen px-4 text-center"> */}
                    <TransitionChild
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" /> 
                        {/* bg-opacity-25 */}
                        {/* <Dialog.Overlay className="fixed inset-0" /> */}
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">

                    {/* This element is to trick the browser into centering the modal contents. */}
                    {/* <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span> */}
                    <TransitionChild
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {children}
                    </TransitionChild>

                    </div>
                    </div>
                {/* </div> */}
            </Dialog>
        </Transition>
    );
};

export default DialogWrapper;