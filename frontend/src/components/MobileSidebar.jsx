import React from 'react';
import { Popover } from '@headlessui/react';
import { IoIosMenu } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import TransactionWrapper from "./wrappers/transition-wrapper";

const links = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" }
];

const MobileSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={`flex md:hidden items-center rounded-md font-medium focus:outline-none text-gray-600 dark:text-gray-400`}>
              {open ? <MdOutlineClose size={26} /> : <IoIosMenu size={26} />}
            </Popover.Button>
            <TransactionWrapper>
              <Popover.Panel className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 transform -translate-x-1/2 bg-white left-1/2 rounded-lg shadow-lg">
                <div className="flex flex-col space-y-2">
                  {links.map(({ label, link }, index) => (
                    <Link to={link} key={index}>
                      <Popover.Button 
                        className={`flex items-center w-full px-4 py-2 text-left rounded-md transition-colors ${
                          link === path 
                            ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setSelected(index)} // Optional: Set selected index if needed
                      >
                        {label}
                      </Popover.Button>
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </TransactionWrapper>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MobileSidebar;