"use client"

import { baseURL } from '@/server-calling/variable';
import { usePathname } from 'next/navigation';
import React, {
    useEffect,
    useState,
} from 'react';
import { IoCopySharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
    const [trx, setTrx] = useState('');
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
        <div data-aos="zoom-in-up" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20'>
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
                    Thank you so much for adoptation!
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <ToastContainer></ToastContainer>
        </div>);
};

export default SinglePet;