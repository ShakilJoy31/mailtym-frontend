"use client"
import { AnimatePresence, easeOut } from "framer-motion";
import {motion} from 'framer-motion'
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            <div key={pathname} className="h-screen w-screen bg-black text-white">

            <motion.div className="h-screen w-screen fixed bg-white rounded-b-[100px] z-40" 
            animate={{height: "0vh"}}
            exit={{height: "140vh"}}
            transition={{duration: 0.5, ease: "easeOut"}}
            />

            <motion.div className="fixed m-auto top-0 bottom-0 left-0 right-0 text-black text-9xl z-50 w-fit h-fit" 
            initial={{opacity: 1}}
            animate={{opacity: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            >{pathname === '/' ? 'Welcome to SMTP server' : pathname.substring(1)}</motion.div>

            <motion.div className="h-screen w-screen fixed bg-white rounded-t-[100px] bottom-0 z-40" 
            initial={{height: "140vh"}} 
            animate={{height: "0vh", transition: {delay: 0.5}}}/>

          <div className="h-24">
        <Navbar/>
          </div>
          
          <div className="h-[calc(100vh-96px)]">{children}</div>
        </div>
        </AnimatePresence>
    )
}
export default TransitionProvider;