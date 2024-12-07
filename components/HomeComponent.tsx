"use client";
import React, { useState, useEffect } from "react";

// Define the type for a product
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
};

const AdminPage = () => {
  // Use the Product type for the state
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
        setProducts(data); // Set the products data
      })
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return (
    <div className="mt-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      {/* The home banner */}
      <div>
        <div className="lg:flex grid space-4 lg:space-0 justify-between items-center">
          <div className="w-full lg:w-1/2">
            <p className="text-xl text-gray-600">There's no place like home.</p>
            <h1 className="text-4xl text-black font-bold">Keeping animals
              out of shelters by <span className="text-orange-600">empowering communities</span></h1>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={'https://home-home.org/assets/images/home_hero.png'}
              alt={'Home image'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6 text-black">Pet Adoption Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <div className="w-full h-64 bg-gray-200">
              <img
                src={product.images[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Species:</strong> {product.species}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Breed:</strong> {product.breed}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Age:</strong> {product.age} months
              </p>
              <p className="text-sm text-gray-600">
                <strong>Gender:</strong> {product.gender}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Size:</strong> {product.size}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Color:</strong> {product.color}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Vaccination Status:</strong> {product.vaccinationStatus}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Health Condition:</strong> {product.healthCondition}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Spayed/Neutered:</strong> {product.spayedNeutered}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Adoption Fee:</strong> ${product.adoptionFee}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {product.description}
              </p>
            </div>
            <div className="p-4 bg-gray-200">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition">
                Adopt {product.name}
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default AdminPage;
