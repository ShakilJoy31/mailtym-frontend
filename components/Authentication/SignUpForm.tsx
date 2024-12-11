"use client";

import { handlePostDataToDatabase } from "@/server-calling/authentication";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaChevronLeft } from "react-icons/fa6";
import 'react-toastify/dist/ReactToastify.css';
import homeLogo from '../../assets/Pet-Find-logo.png';


const SignUpForm = () => {
  const router = useRouter();
  // const [authError, setAuthError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegisterButton = async () => {
    const formData = {
      name: name,
      email: email,
      password: password,
    };
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email || !emailRegex.test(email)) {
      toast.error('Invalid email address. Please enter a valid email.', {
        autoClose: 2000,
      });
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error('OPPS! Password is not matched.', {
        autoClose: 2000,
      });
      return;
    }

    if(password && password.length < 6){
      toast.error('Password must be 6 digit or more.', {
        autoClose: 2000,
      });
      return
    }

    const result = await handlePostDataToDatabase(formData);
  
    if (result?.acknowledged === true) {
      toast.success(result?.message || 'Account created successfully!', {
        autoClose: 2000,
      });
      localStorage.setItem("user", JSON.stringify(formData));
      router?.push('/');
    } else {
      toast.error(result?.message || 'An error occurred. Please try again.', {
        autoClose: 2000,
      });
    }
  };
  



  return (
    <section className="pb-16 pt-6 h-screen">

      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white border border-gray-300 rounded-sm px-12 py-6">
          <button onClick={() => router?.back()} className="mb-4 flex items-center gap-x-1"><span><FaChevronLeft size={15} color={'black'}></FaChevronLeft></span> <span className="font-semibold hover:cursor-pointer">Back</span></button>


          <Link href={'/'} className="flex justify-center ">
            <Image
              src={homeLogo}
              alt="Prothom Alo home icon"
              width={800}
              height={150}
              className="rounded-md w-48 h-16 hover:cursor-pointer"
            />
          </Link>


          <h2 className="text-2xl font-bold text-center text-blue-600 mb-1">Create an account</h2>
          <p className="text-center text-black mb-6">to continue to <span className="font-bold">Pet Finder</span></p>


          <input onChange={(e) => setName(e?.target?.value)} type="text" placeholder="Full name" className="w-full border border-gray-300 rounded py-2 px-3 mb-6 focus:outline-none" />

          <input onChange={(e) => setEmail(e?.target?.value)} type="email" placeholder="Email" className="w-full border border-gray-300 rounded py-2 px-3 mb-6 focus:outline-none" />


          <div className="relative mb-6">
            <input onChange={(e) => setPassword(e?.target?.value)} type={`${showPassword ? 'text' : 'password'}`} placeholder="Password" className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none" />
            <button onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 text-blue-500 font-medium">{showPassword ? 'Hide' : 'Show'}</button>
          </div>

          <div className="relative mb-6">
            <input onChange={(e) => setConfirmPassword(e?.target?.value)} type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder="Confirm Password" className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none" />
            <button onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-3 text-blue-500 font-medium">{showConfirmPassword ? 'Hide' : 'Show'}</button>
          </div>

          <button onClick={handleRegisterButton} className="w-full bg-red-600 hover:bg-red-400 text-white font-bold py-2 rounded mb-3">Register</button>


          <p className="text-center text-black font-bold">
            Already a member? <Link href="/" className="text-red-600 font-bold underline">Login</Link>
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

export default SignUpForm;
