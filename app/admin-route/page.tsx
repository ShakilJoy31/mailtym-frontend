"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "@/server-calling/variable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ImageStorageKey = "1f2e07ae412954d520f52351b07dee66";
const url = `https://api.imgbb.com/1/upload?key=${ImageStorageKey}`;

const AdminPage = () => {
    const router = useRouter();
    // Pet Information States
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("Dog");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Male");
    const [size, setSize] = useState("Small");
    const [color, setColor] = useState("");
    const [vaccinationStatus, setVaccinationStatus] = useState("");
    const [healthCondition, setHealthCondition] = useState("");
    const [spayedNeutered, setSpayedNeutered] = useState("Yes");
    const [adoptionFee, setAdoptionFee] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [picture, setPicture] = useState<File | null>(null);

    const [user, setUser] = useState<string | null>(null);

    useEffect(()=> {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      const parsedUser = JSON.parse(getUser); 
      setUser(parsedUser?.email);
    }
    },[])

    console.log(user); 

    // Handle Image Upload
    if (picture) {
        const formDataImage = new FormData();
        formDataImage.append("image", picture);

        fetch(url, {
            method: "POST",
            body: formDataImage,
        })
            .then((res) => res.json())
            .then((result) => {
                setImages((prevImages) => [...prevImages, result.data.display_url]);
            });
        setPicture(null);
    }

    // Handle Submit
    const handleSubmitPet = async () => {
        const petData = {
            name,
            species,
            breed,
            age,
            gender,
            size,
            color,
            vaccinationStatus,
            healthCondition,
            spayedNeutered,
            adoptionFee,
            description,
            images,
        };

        // Example POST request to save data
        try {
            const response = await fetch(`${baseURL}/add-productByAdmin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(petData),
            });
            const result = await response.json();
            console.log(result.acknowledged);
            if (result.acknowledged) {
                toast.success('Uploaded successfully!', {
                    autoClose: 2000,
                });
            } else {
                toast.error('Something went wrong!', {
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.error('Something went wrong!', {
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 2xl:px-20 py-8">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold mb-4 text-black">Add a New Pet</h1>
                {
                    user === 'admin@gmail.com' ? <div className="flex gap-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin-route/manage-users')}
                        className="w-48 bg-black hover:bg-gray-600 text-white py-2 rounded"
                    >
                        Manage Users
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/admin-route/manage-adoptation')}
                        className="w-48 bg-black hover:bg-gray-600 text-white py-2 rounded"
                    >
                        Manage Donation
                    </button>

                </div> : ''
                }
                
            </div>

            <form className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter pet's name"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Species */}
                <div>
                    <label className="block font-medium">Species</label>
                    <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Rabbit</option>
                    </select>
                </div>

                {/* Breed */}
                <div>
                    <label className="block font-medium">Breed</label>
                    <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        placeholder="Enter breed"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="block font-medium">Age</label>
                    <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age (e.g., 2 years)"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block font-medium">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                {/* Size */}
                <div>
                    <label className="block font-medium">Size</label>
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </div>

                {/* Color */}
                <div>
                    <label className="block font-medium">Color</label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Enter color"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Vaccination Status */}
                <div>
                    <label className="block font-medium">Vaccination Status</label>
                    <textarea
                        value={vaccinationStatus}
                        onChange={(e) => setVaccinationStatus(e.target.value)}
                        placeholder="Enter vaccination details"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Health Condition */}
                <div>
                    <label className="block font-medium">Health Condition</label>
                    <textarea
                        value={healthCondition}
                        onChange={(e) => setHealthCondition(e.target.value)}
                        placeholder="Enter health details"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Spayed/Neutered */}
                <div>
                    <label className="block font-medium">Spayed/Neutered</label>
                    <select
                        value={spayedNeutered}
                        onChange={(e) => setSpayedNeutered(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                {/* Adoption Fee */}
                <div>
                    <label className="block font-medium">Adoption Fee</label>
                    <input
                        type="text"
                        value={adoptionFee}
                        onChange={(e) => setAdoptionFee(e.target.value)}
                        placeholder="Enter fee amount"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium">Upload Images</label>
                    <input
                        type="file"
                        onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
                        className="mt-2"
                    />
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image} alt={`Uploaded ${index}`} className="w-full h-20 object-cover rounded" />
                                <button
                                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                                >
                                    <RxCross1 />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmitPet}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Submit Pet
                </button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AdminPage;
