"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "@/server-calling/variable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ImageStorageKey = "1f2e07ae412954d520f52351b07dee66";
const url = `https://api.imgbb.com/1/upload?key=${ImageStorageKey}`;

const ManageAdoptation = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8">
            
        </div>
    );
};

export default ManageAdoptation;
