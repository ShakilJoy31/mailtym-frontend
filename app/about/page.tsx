'use client'

import React, { useState } from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className='h-screen'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex justify-center text-black'>About</h1>
      <p className='flex justify-center my-2 italic px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-black'>Welcome to Pet finder website, the ultimate online destination for pet seekers and adopters! Our mission is to connect loving families with pets in need of a forever home. We provide a simple, intuitive platform where you can find a variety of pets, including dogs, cats, and small animals, all looking for a caring owner.

        Whether you are searching for a furry friend to adopt or trying to rehome a pet, we aim to make the process as easy and stress-free as possible. Our website allows users to search through listings by breed, age, size, and location, ensuring that you find the perfect match for your family.

        At Pet finder website, we believe every pet deserves a second chance, and we are here to help make that happen. Join us in giving animals a loving home today!</p>
    </div>
  );
};

export default AboutPage;