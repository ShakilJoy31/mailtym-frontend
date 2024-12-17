"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import homeLogo from '../assets/Pet-Find-logo.png';

import {
    FaUser,
} from 'react-icons/fa';
import Image from "next/image";
import { useEffect, useState } from "react";

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

    console.log(user); 

    const links = [
        { url: "/", title: "Home" },
        { url: "/about", title: "About" },
        { url: "/admin-route", title: "Post a Pet" },
        { url: `${user === 'Admin' ? '/admin-route/manage-users' : '/donation'}`, title: `${user === 'Admin' ? 'Admin' : 'Donaiton'}` }
    ]

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

            <div className="flex gap-x-4 py-[20px]">

                {
                    user ? <button className="hover:bg-gray-200 hover:text-black border text-black py-2 px-4 rounded-sm flex gap-x-2 items-center">
                        <FaUser size={20} />
                        <span>{user}</span>
                    </button> : <Link href={'/login'} className="hover:bg-gray-200 hover:text-black border text-black py-2 px-4 rounded-sm flex gap-x-2 items-center">
                        <FaUser size={20} />
                        <span>Login</span>
                    </Link>
                }

                {
                    user ? <button onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                    }} className="hover:bg-red-500 border text-black py-2 px-4 rounded-sm flex gap-x-2 items-center">
                        <FaUser size={20} />
                        <span>Logout</span>
                    </button> : ''
                }

            </div>
        </div>
    )
}

export default Navbar;