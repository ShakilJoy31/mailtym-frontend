"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "@/server-calling/variable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Animal {
    _id: string;
    name: string;
    species: string;
    breed: string;
    age: string;
    gender: string;
    color: string;
    size: string;
    description: string;
    images: string[];
    adoptionFee: string;
    healthCondition: string;
    spayedNeutered: string;
    vaccinationStatus: string;
}

interface Order {
    _id: string;
    trxId: string;
    orderBy: {
        email: string;
        name: string;
    };
    animal: Animal;
}



const ManageAdoptation = () => {
    const [deleteUserId, setDeleteUserId] = useState('');
    const [users, setUsers] = useState<Order[]>([]);

    useEffect(() => {
        fetch(`${baseURL}/get-pet-orders`)
            .then((res) => res.json())
            .then((data) => {

                if (Array.isArray(data)) {
                    setUsers(data); // Directly setting the array to the state
                } else {
                    console.error("Data is not an array", data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);



    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${baseURL}/delete-pet/${deleteUserId}`, {
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

    console.log(users); 
    return (
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8 h-screen">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Pet id</th>
                                <th>Pet Image</th>
                                <th>Trx ID</th>
                                <th>Action Button</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((user, index) => <tr key={index} className="bg-gray-300">
                                    <th>{index + 1}</th>
                                    <td>{user?.orderBy?.name}</td>
                                    <td>{user?.orderBy?.email}</td>
                                    <td>{user?.animal?._id}</td>
                                    <td>
                                        <img
                                            src={user?.animal?.images[0]}
                                            alt='Pet image'
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />

                                    </td>
                                    <td>{user?.trxId}</td>
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

export default ManageAdoptation;
