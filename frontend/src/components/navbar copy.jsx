import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { MdOutlineClose, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiCurrencyLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { IoIosMenu } from "react-icons/io";
import { auth } from "../libs/firebaseConfig";
import  useStore  from "../store";
import ThemeSwitch from './themeswitch';
import TransactionWrapper from "./wrappers/transition-wrapper";

import  Avatar  from "../assets/avatar.png";

//const links = ["Dashboard", "Transactions", "Accounts", "Settings"];
const links = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];

const UserMenu = () => {
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


// const Navbar = () => {
//   const [selected, setSelected] = useState(0);

  return (
    <Menu as="div" className="relative z-50">
      <div>
        <MenuButton className=''>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer 2xl:w-12 2xl:h-12">
              <p className="text-2xl font-bold">{user?.firstname?.charAt(0)}</p>
            </div>

            {/* <div className="hidden text-left md:block">
              <p className="text-lg font-medium text-black dark:text-gray-400">
                {user?.firstname}
              </p>
              <span className="text-sm text-gray-700 dark:text-gray-500">
                {user?.email}
              </span>
            </div> */}

            <MdOutlineKeyboardArrowDown className='hidden text-2xl text-gray-600 cursor-pointer md:block dark:text-gray-300' />
          </div>
        </MenuButton>        
        {/* <span className='text-xl font-bold text-black dark:text-white'>
          My-Finance
        </span> */}
      </div>

      <TransactionWrapper>
        <MenuItems className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 md:p-5">
            <div className="flex w-full gap-3 mb-5">
              <div className="flex items-center justify-center text-white rounded-full cursor-pointer min-w-10 size-10 2xl:size-12">
              <p className="text-2xl font-bold">
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

            <MenuItem>
              {({ active }) => (
                <Link to={"/settings"}>
                  <button className={`text-gray-900 dark:text-gray-300 mb-4 flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                    Settings
                  </button>
                </Link>
              )}
            </MenuItem>
            <MenuItem>
            {({ active }) => (
              <button
              onClick={handleSingout}
              className={`bg-red-700/15 text-red-600 dark:bg-red-600 dark:text-white flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Sign out
            </button>              
            )}            
            </MenuItem>
            </div>
        </MenuItems>
      </TransactionWrapper>
    </Menu>
  );
};
const MobileSidebar = () => {
  const location = useLocation();
  const path  = location.pathname;

  return (
    <div className="">
      <Popover className="">
        {({ open }) => (
          <>
          <PopoverButton className={`
            flex md:hidden items-center rounded-md font-medium focus:outline-none text-gray-600 dark:text-gray-400`}>
              {open ? <MdOutlineClose size={26} /> : <IoIosMenu size={26} />}
            </PopoverButton>
            <TransactionWrapper>
              <PopoverPanel className="absolute z-50 w-screen max-w-sm px-4 py-6 mt-3 transform -translate-x-1/2 bg-white left-1/2">
              <div className="flex flex-col space-y-2">

                {links.map(({ label, link }, index) => 
                (
                  <Link to={link} key={index}>
                    <PopoverButton className={`${
                      link === path
                    }`}>
                    </PopoverButton>
                  </Link>
                )
                )}
              </div>
              </PopoverPanel>
            </TransactionWrapper>            
          </>
        )}
      </Popover>
    </div>
  );
}

export default Navbar;
