import { 
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import api from "../libs/apiCall";
import { auth } from "../libs/firebaseConfig";
import  useStore from "../store";
import { Button } from './ui/button';

export const  SocialAuth = ({ isLoading, setLoading}) => { 
    const [user] = useAuthState(auth);
    const [selectProvider, setSelectedProvider] = useState("google");
    const {setCredentials} = useStore((state) => state);
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        setSelectedProvider("google");
        try {
            const res = await signInWithPopup(auth, provider);
        } catch (error) {
            console.log("Error signing in with Google",error);
        }
    };
    
    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        setSelectedProvider("github");
        try {
            const res = await signInWithPopup(auth, provider);
        } catch (error) {
            console.log("Error signing in with Github",error);
        }
    };

    useEffect(() => {
        const saveUserToDo = async () => {
            try {
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    provider: setSelectedProvider,
                    uid: user.uid,
                    // accessToken: user.accessToken,
                    // refreshToken: user.refreshToken,
                    // isAnonymous: user.isAnonymous,
                    // signInMethod: user.signInMethod,
                    // photoURL: user.photoURL,
                };
                setLoading(true);
                const { data:res } = await api.post("/auth/sign-in", userData);
                //console.log(res);
                if(res?.user) {
                    Toaster.success(res?.message);
                    const userInfo = { ...res?.user, token: res?.token };
                    localStorage.setItem("user", JSON.stringify(userInfo));
                    setCredentials(userInfo);
                    setTimeout(() => {
                        navigate("/dashboard");
                        //setLoading(false);
                    }, 1500);
                }
            } catch (error) {
                console.error("Something went wrong:", error);
                toast.error(error?.response?.data?.message || error.message);
            }
            finally {
                setLoading(false);
            }
        };

        if (user) {
            saveUserToDo();
        }
    }, [user?.uid]);

    return (
        <div className="flex items-center gap-2">
            <Button
            onClick={signInWithGoogle}
            disabled={isLoading}
            variant="outline"
            className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
            type="button"
            //size="sm"
            >
                <FcGoogle className="mr-2 size-5" />
                Continue with Google
            </Button>

            {/* <Button
            //onClick={signInWithGithub}
            disabled={isLoading}
            variant="outline"
            className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
            type="button"
            >
                <BsGithub className="mr-2 size-4" />
                Continue with Github
            </Button> */}
        </div>
    );
};