"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import homeLogo from '../../assets/Pet-Find-logo.png';
import { handleLogin } from "@/server-calling/authentication";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams ? searchParams.get("redirect") : null;

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginButton = async () => {
    if(email === 'admin@gmail.com' && password === 'admin'){
      localStorage.setItem("user", JSON.stringify({name: 'Admin', email: 'admin@gmail.com'}));
      router.push('/admin-route');
    }else {
      const formData = {
        email: email,
        password: password,
      };
      const result = await handleLogin(formData);
      if (result?.message === 'Login successful') {
        toast.success(result?.message, {
          autoClose: 2000,
        });
        localStorage.setItem("user", JSON.stringify(result?.user));
        router.push('/');
      }else {
        toast.error('Something went wrong!', {
          autoClose: 2000,
        });
      }
    }
    
  };

  return (
    <section className="h-screen">

      {/* The new authentication system */}

      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white border border-gray-300 rounded-sm px-12 py-6">
          <button onClick={() => router?.back()} className="mb-4 flex items-center gap-x-1"><span><FaChevronLeft size={15} color={'black'}></FaChevronLeft></span> <span className="text-black font-semibold">Back</span></button>


          <Link className="flex justify-center" href={'/'}>
            <Image
              src={homeLogo}
              alt="Home icon"
              width={800}
              height={150}
              className="rounded-md w-48 h-16 hover:cursor-pointer"
            />
          </Link>


          <h2 className="text-2xl font-bold text-center text-blue-600 mb-1">Login</h2>
          <p className="text-center text-black mb-6">to continue to <span className="font-bold">Pet Adoption</span></p>

          <input onChange={(e) => setEmail(e?.target?.value)} type="email" placeholder="Email" className="w-full border border-gray-300 rounded py-2 px-3 mb-3 focus:outline-none" />

          <div className="relative mb-6">
            <input onChange={(e) => setPassword(e?.target?.value)} type={`${showPassword ? 'password' : 'text'}`} placeholder="Password" className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none" />
            <button onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 text-blue-500 font-medium">{showPassword ? 'Show' : 'Hide'}</button>
          </div>

          <div onClick={handleLoginButton} className="w-full bg-red-600 hover:bg-red-400 text-white font-bold py-2 rounded mb-3 hover:cursor-pointer"><span className="flex justify-center">Login</span></div>

          <p className="text-center text-black font-bold">
            New to Prothom Alo? <Link href="/signup" className="text-red-600 font-bold underline">Create an account</Link>
          </p>

          <p className="text-center text-gray-500 text-xs mt-6">
            By proceeding, you agree to our <a href="#" className="text-blue-500">Terms of Use</a> and <a href="#" className="text-blue-500">Privacy Policy</a> of Prothom Alo
          </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default LoginForm;



// Don&rsquo;t have an account?