"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "@/server-calling/variable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Order {
    _id: string;
    trxId: string;
    orderBy: string;
    animal: string;
}

type Product = {
    _id: string;
    name: string;
    species: string;
    breed: string;
    age: string;
    gender: string;
    size: string;
    color: string;
    vaccinationStatus: string;
    healthCondition: string;
    spayedNeutered: string;
    adoptionFee: string;
    description: string;
    images: string[];
    status: string;
};


const ManagePet = () => {
    const [deleteUserId, setDeleteUserId] = useState('');
    const [users, setUsers] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/get-productsByAdmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data: Product[]) => {
                console.log(data);
                const filterPending = data.filter(animal => animal.status === 'pending')
                setProducts(filterPending);
            })
            .catch((error) => console.error("Failed to fetch products:", error));
    }, []);


    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${baseURL}/delete-pet-admin/${deleteUserId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
                if (modal) {
                    modal.close();
                }
                setProducts((prevUsers) => prevUsers.filter((user) => user._id !== deleteUserId));
            } else {
                alert(data.message || "Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user");
        }
    };

    console.log(products);
    return (
        <div className="px-4 sm:px-6 md:px-8  lg:px-12 xl:px-16 2xl:px-20 py-8">
            <div>
                <div className="overflow-x-auto">
                    <table className="table bg-gray-400 text-black">
                        {/* head */}
                        <thead>
                            <tr className="text-black">
                                <th>SL</th>
                                <th>Pet Name</th>
                                <th>Pet Image</th>
                                <th>Pet Id</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Color</th>
                                <th>Action Button</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map((user, index) => <tr key={index} className="bg-gray-300">
                                    <th>{index + 1}</th>
                                    <td>{user?.name}</td>
                                    <td>
                                        <img className="w-20 h-20 rounded-md" src={user?.images[0]} alt="" />
                                    </td>
                                    <td>{user?._id}</td>
                                    <td>{user?.age}</td>
                                    <td>{user?.gender}</td>
                                    <td>{user?.color}</td>
                                    <td>
                                        <div className="flex gap-x-4">

                                            <button onClick={async () => {
                                                try {
                                                    const updatedData = { status: "approved" };

                                                    const response = await fetch(`${baseURL}/update-pet-admin/${user?._id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify(updatedData),
                                                    });
                                                   

                                                    if (response.ok) {
                                                        window.location.reload(); 
                                                    } else {
                                                        const errorData = await response.json();
                                                        alert(`Failed to update product status: ${errorData.message}`);
                                                    }
                                                } catch (error) {
                                                    console.error("Error updating product status:", error);
                                                    alert("An error occurred while updating the product.");
                                                }
                                            }}
                                                type="button"
                                                className="w-32 bg-green-600 hover:bg-green-500 text-white py-2 rounded">
                                                Approve
                                            </button>


                                            <button onClick={() => {
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
                                            </button>
                                        </div></td>
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

export default ManagePet;
