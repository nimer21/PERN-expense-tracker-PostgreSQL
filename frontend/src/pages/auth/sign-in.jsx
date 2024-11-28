import React, { useEffect, useState } from 'react';
import * as z from 'zod'
import useStore from '../../store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './../../components/ui/card';
import { SocialAuth } from '../../components/social-auth';
import { Separator } from '../../components/separator';
import Input from './../../components/ui/input';
import {BiLoader} from 'react-icons/bi';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import api from '../../libs/apiCall';

const LoginSchema = z.object({
  email: z
  .string({ requirred_error: "Email is required"})
  .email({ message: "Invalid email address"}),

  password: z
  .string({ requirred_error: "Password is required" })
  .min(1, "Password is required"),
});

const SignIn = () => {
  const {user, setCredentials} = useStore((state)=> state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
      user && navigate("/");    
  }, [user]);

  const onSubmit = async (data) => {
    try {
      //console.log(data);
      setLoading(true);
      const { data:res } = await api.post("/auth/sign-in", data);
      if(res?.user)
      {
        toast.success(res?.message);
        const userInfo = { ...res?.user, token: res?.token };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setCredentials(userInfo);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10'>
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
      <div className='p-6 md:-8'>
        <CardHeader className='pb-0'>
          <CardTitle className='mb-8 text-center dark:text-white'>Sign In</CardTitle>
          {/* <CardDescription>
            Already have an account?{" "}
            <CardLink onClick={() => navigate("/sign-in")}>Sign In</CardLink>
          </CardDescription> */}
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='mb-8 space-y-6'>
              <SocialAuth isLoading={loading} setLoading={setLoading}/>
              <Separator />
              
              <Input
              disabled={loading}
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors?.email?.message}
              {...register("email")}
              className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700
               dark:text-gray-400 dark:outline-none"
              />
              <Input
              disabled={loading}
              id="password"
              label="Password"
              type="password"
              placeholder="Your password"
              error={errors?.password?.message}
              {...register("password")}
              className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700
               dark:text-gray-400 dark:outline-none"
              />
            </div>
            <Button
            type='submit' 
            className='w-full bg-violet-800'
            disabled={loading}
            >
              {loading ? <BiLoader className='text-2xl text-white animate-spin' /> : "Sign In"}              
            </Button>
            
          </form>
        </CardContent>
      </div>
      <CardFooter className="justify-center gap-2">
        <p className='text-sm text-gray-600'>Don't have an account</p>
        <Link to='/sign-up' className='text-sm font-semibold text-violet-600 hover:underline'>Sign Up</Link>
        {/* <CardLink onClick={() => navigate("/sign-in")}>Sign In</CardLink> */}
      </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn