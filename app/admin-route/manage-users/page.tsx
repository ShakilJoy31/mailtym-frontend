"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "@/server-calling/variable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface User {
    _id: string;
    email: string;
    name: string;
    password: string;
}



const ManageUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [deleteUserId, setDeleteUserId] = useState('');

    useEffect(() => {
        fetch(`${baseURL}/all-user`)
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }, [])



    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${baseURL}/delete-user/${deleteUserId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                if (modal) {
                    modal.close();
                }
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deleteUserId));
            } else {
                alert(data.message || "Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user");
        }
    };

    return (
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8 ">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action Button</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((user, index) => <tr key={index} className="bg-gray-300">
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td><button onClick={() => {
                                        setDeleteUserId(user?._id);
                                        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                                        if (modal) {
                                            modal.showModal();
                                        } else {
                                            console.error("Modal element not found!");
                                        }
                                    }}
                                        type="button"
                                        className="w-32 bg-red-600 hover:bg-red-500 text-white py-2 rounded">
                                        Delete
                                    </button></td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-black">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg flex justify-center text-white">Are you sure? </h3>
                    <button onClick={handleDeleteUser}
                        type="button"
                        className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-2 rounded">
                        Delete
                    </button>
                    <p className="py-4 flex justify-center">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>

        </div>
    );
};

export default ManageUser;
