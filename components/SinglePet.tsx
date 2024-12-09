"use client"

import { usePathname } from 'next/navigation';
import React, {
    useEffect,
    useState,
} from 'react';
import { IoCopySharp } from "react-icons/io5";


interface Product {
    _id: string;
    name: string;
    images: string[];
    species: string;
    breed: string;
    age: number;
    gender: string;
    size: string;
    color: string;
    vaccinationStatus: string;
    healthCondition: string;
    spayedNeutered: boolean;
    adoptionFee: number;
    description: string;
}


const SinglePet = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const pathname = usePathname().substring(1);
    function getCurrentDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString();
    }
    useEffect(() => {
        // Simulated API call
        async function fetchProduct() {
            const response = await fetch(`http://localhost:5000/get-productById/${pathname}`); // Replace with your actual API endpoint
            const data: Product = await response.json();
            setProduct(data);
        }

        fetchProduct();
    }, []);

    const copyToClipboard = () => {
        const phoneNumber = '01680071048';
        navigator.clipboard.writeText(phoneNumber).then(() => {
            alert(`Copied to clipboard: ${phoneNumber}`);
        });
    };

    const handleAdoptClick = () => {
        const modal = document.getElementById('alReadyExistsOnTheCartModal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };


    return (
        <div data-aos="zoom-in-up">
            {
                product ? <div className="flex flex-col lg:flex-row bg-gray-100 p-8 rounded-lg shadow-lg items-center">

                    <div className="lg:w-1/2 mb-6 lg:mb-0">
                        <img
                            src={product.images[0] || "https://via.placeholder.com/150"}
                            alt={product.name}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>


                    <div className="lg:w-1/2 lg:pl-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        <div className="space-y-3">
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Species:</span> {product.species}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Breed:</span> {product.breed}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Age:</span> {product.age} months
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Gender:</span> {product.gender}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Size:</span> {product.size}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Color:</span> {product.color}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Vaccination Status:</span> {product.vaccinationStatus}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Health Condition:</span> {product.healthCondition}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Spayed/Neutered:</span> {product.spayedNeutered}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Adoption Fee:</span> ${product.adoptionFee}
                            </p>
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Description:</span> {product.description}
                            </p>
                        </div>


                        <div className="mt-6">
                            <button onClick={handleAdoptClick}
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                            >
                                Adopt {product.name}
                            </button>
                        </div>
                    </div>
                </div> : <div className='w-full min-h-screen items-center flex justify-center'>
                    <div>
                        <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                        <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                    </div>
                </div>
            }


            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: 'black',
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex text-white">Bkash Marchent: <span className='mx-4'>01680071048</span> <span className='mt-1 hover:cursor-pointer' onClick={copyToClipboard}><IoCopySharp size={20}></IoCopySharp></span></h3>
                    <h1 className='mt-2'>Transaction id</h1>
                    <input type="text" placeholder='Type your Transaction id here' className='p-2 rounded-md w-full mt-2 border border-white' />
                    <div className='flex justify-end mt-4'>
                        <button onClick={() => {
                            const modal = document.getElementById('alReadyExistsOnTheCartModal') as HTMLDialogElement;
                            if (modal) {
                                modal.close();
                            }
                        }} className="w-32 bg-purple-600 text-white py-1 rounded-md hover:bg-purple-700 transition">
                            Submit
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>);
};

export default SinglePet;