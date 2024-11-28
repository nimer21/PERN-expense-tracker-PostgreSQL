import React, { useState } from "react";
import { RiCurrencyLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ThemeSwitch from "./themeswitch";
import useStore from "../store";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuItems } from '@headlessui/react';
import { MenuButton } from '@headlessui/react';
import TransactionWrapper from "./wrappers/transition-wrapper";
import MobileSidebar from "./MobileSidebar";

const links = ["Dashboard", "Transactions", "Accounts", "Settings"];


const Navbar = () => {
  const [selected, setSelected] = useState(0);
  const { user, setCredentials } = useStore((state) => state);
  const navigate = useNavigate();

  const handleSingout = async () => {
    if (user.provider === "google") {
      await handleSocialLogout();
  };
  localStorage.removeItem("user");
  setCredentials(null);
  navigate("/sign-in");
  };
  const handleSocialLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className='w-full  flex items-center justify-between py-6'>
      <div className='flex items-center gap-2 cursor-pointer'>
        <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-violet-700 rounded-xl'>
          <RiCurrencyLine className='text-white text-3xl hover:animate-spin' />
        </div>
        <span className='text-xl font-bold text-black dark:text-white'>
          My-Finance
        </span>
      </div>

      <div className='hidden md:flex items-center gap-4'>
      {links.map((link, index) => (
          <div
            key={index}
            className={`${
              index === selected
                ? "bg-black dark:bg-slate-800 text-white"
                : "text-gray-700 dark:text-gray-500"
            } px-6 py-2 rounded-full`}
             onClick={() => setSelected(index)}
          >
           <Link to={`/${link.toLowerCase()}`}>{link}</Link> 
      {/* Using Link for Navigation: The tabs now utilize Link instead of anchor tags to ensure proper client-side navigation without refreshing the page. */}
          </div>
        ))}
      </div>

      <div className='flex items-center gap-10 2xl:gap-20'>
        <ThemeSwitch />

        <Menu as="div" className="relative z-50">
      <div>
        <MenuButton className=''>
        <div className="flex items-center gap-2">          
          <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer 2xl:w-12 2xl:h-12">
              <p className="text-2xl font-bold">{user?.firstname?.charAt(0)}</p>
            </div>
            <div className="hidden text-left md:block">
              <p className="text-lg font-medium text-black dark:text-gray-400">
                {user?.firstname}
              </p>
              <span className="text-sm text-gray-700 dark:text-gray-500">
                {user?.email}
              </span>
            </div>
          <MdOutlineKeyboardArrowDown className='hidden md:block text-2xl text-gray-600 dark:text-gray-300 cursor-pointer' />
        </div>
        </MenuButton>
      </div>

      <TransactionWrapper>
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 md:p-5">
            <div className="flex w-full gap-3 mb-5">
              <div className="flex items-center justify-center text-white rounded-full cursor-pointer min-w-10 size-10 2xl:size-12">
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-300">
              {user?.firstname?.charAt(0)}
            </p>                
              </div>

              <div className="w-full">
                <p className="text-violet-700">{user?.firstname}</p>
                <span className="text-xs overflow-ellipsis">
                  {user?.country}
                </span>
              </div>
            </div>

            {/* Profile Link */}
            <MenuItem>
              {({active}) => (//active
                <Link to={"/settings"}>
                  <button 
                  // className={`text-gray-900 dark:text-gray-300 mb-4 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  // onClick={() => setSelected(3)}
                  onClick={() => setSelected(links.indexOf("Settings"))} // Set index for Profile dynamically
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } text-gray-900 dark:text-gray-300 mb-4 flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile
                  </button>
                </Link>
              )}
            </MenuItem>

            {/* Sign Out Button */}
            <MenuItem>
            {({active}) => (//active
              <button
              onClick={handleSingout}
              // className={`bg-red-700/15 text-red-600 dark:bg-red-600 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
              className={`${
                active ? 'bg-red-700/15' : 'bg-red-600'
              } text-white dark:bg-red-600 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Sign out
            </button>              
            )}            
            </MenuItem>
            </div>
        </MenuItems>
      </TransactionWrapper>

      </Menu>
      </div>
         {/* Include Mobile Sidebar for mobile view */}
          <MobileSidebar />
    </div>
    
  );
};



export default Navbar;
