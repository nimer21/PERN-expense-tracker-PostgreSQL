import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import Transactions from './pages/transactions';
import Settings from './pages/settings';
import AccountPage from './pages/account-page';
import Dashboard from './pages/dashboard';
import useStore from './store';
import { setAuthToken } from './libs/apiCall';
import Navbar from './components/navbar';

const RootLayout = () => {
  const {user} = useStore((state) => state);
  //console.log(user);
  setAuthToken(user?.token || "");
  return !user ? (
    <Navigate to="/sign-in" replace={true}/>
  ) : (
    <>
    <Navbar/>
    <div className='min-h-[cal(h-screen-100px)]'>
      <Outlet/>
    </div>
    </>
  );
};

function App() {
  const { theme } = useStore((state) => state);

  useEffect(() => {
    if(theme === 'dark')
    {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <main>
      <div className='w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900'>
        <Routes>
          <Route element={<RootLayout />}>
            {/* <Route path="/" element={<Navigate to="/overview"/>}/> */}
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/transactions" element={<Transactions/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/accounts" element={<AccountPage/>}/>
          </Route>

          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
        </Routes>
      </div>
      <Toaster richColors position="top-center"/>
    </main> 
  )
}

export default App
