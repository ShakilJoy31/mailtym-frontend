"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import homeLogo from '../assets/Pet-Find-logo.png';

import {
    FaUser,
} from 'react-icons/fa';
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
    { url: "/", title: "Home" },
    { url: "/about", title: "About" },
    { url: "/pricing", title: "Pricing" },
    { url: "/contact", title: "Contact" },
]

const Navbar = () => {
    const pathname = usePathname();
    const [user, setUser] = useState<string | null>(null);

   useEffect(() => {
    const getUser = localStorage.getItem("user");

    if (getUser) {
      const parsedUser = JSON.parse(getUser); 
      setUser(parsedUser?.name); 
    }
  }, []);

    return (

        <div className="h-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-xl">
            {/* Logo */}
            <div className="">
                <Link href="/" className="text-sm rounded-md font-semibold flex items-center justify-between" >
                    <Image
                        src={homeLogo}
                        alt="Home icon"
                        width={800}
                        height={150}
                        className="rounded-md w-48 h-16 hover:cursor-pointer"
                    />
                </Link>
            </div>


            <div className="hidden md:flex items-center gap-4 w-1/3">
                {
                    links.map((link, index) => {
                        return (
                            <div key={index} className={`${link.url === pathname ? "bg-black text-white rounded-md px-4 py-1" : ""}`}>
                                <Link href={link.url}>
                                    {link.title}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            {/* <div className="md:flex hidden gap-x-6 w-1/3">
                <a href="tel:+8801761043883"><div>
                    <span className='flex items-center justify-center mt-1'><FaPhone size={25}></FaPhone></span>
                </div></a>

               
                <a target='_blank' href="https://wa.me/message/6CPDT6OUH2SJL1"><div>
                    <span className='flex items-center justify-center mt-1'><IoLogoWhatsapp size={25}></IoLogoWhatsapp></span>
                </div></a>

               
                <a target='_blank' href="https://www.facebook.com/beeraw23"><div>
                    <span className='flex items-center justify-center mt-1'><FaFacebook size={25}></FaFacebook></span>
                </div></a>

              
                <a target='_blank' href="https://www.messenger.com/t/101277466406447"><div>
                    <span className='flex items-center justify-center mt-1'><FaLinkedin size={25}></FaLinkedin></span>
                </div></a>

                <a target='_blank' href="https://www.messenger.com/t/101277466406447"><div>
                    <span className='flex items-center justify-center mt-1'><FaGithub size={25}></FaGithub></span>
                </div></a>

            </div> */}

            <div className="flex gap-x-4 py-[20px]">

                {
                    user? <button className="hover:bg-gray-200 hover:text-black border text-white py-2 px-4 rounded-sm flex gap-x-2 items-center">
                    <FaUser size={20} />
                    <span>{user}</span>
                </button> : <Link href={'/login'} className="hover:bg-gray-200 hover:text-black border text-white py-2 px-4 rounded-sm flex gap-x-2 items-center">
                    <FaUser size={20} />
                    <span>Login</span>
                </Link>
                }

                {
                    user? <button onClick={()=> {
                        localStorage.removeItem("user");
                        window.location.reload();
                    }} className="hover:bg-red-500 border text-white py-2 px-4 rounded-sm flex gap-x-2 items-center">
                    <FaUser size={20} />
                    <span>Logout</span>
                </button> : ''
                }

            </div>
        </div>
    )
}

export default Navbar;