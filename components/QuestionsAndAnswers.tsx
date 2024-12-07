'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PricingPage: React.FC = () => {
  return (
    <div>
    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex justify-center my-4 text-black'>Questions and Answers</h1>
    <div className='px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48'>
      <div className="collapse">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          How does the Pet Finder service work?
        </div>
        <div className="collapse-content bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          <p>The Pet Finder service connects you with pets available for adoption in your area. You can search by pet type, breed, and other criteria, and directly reach out to pet owners or shelters.</p>
        </div>
      </div>
  
      <div className="collapse my-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          Is there any limit to sending inquiries about pets?
        </div>
        <div className="collapse-content bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          <p>There are no limits for Premium or Professional plan users, but Free plan users have limited access to messaging and pet details.</p>
        </div>
      </div>
  
      <div className="collapse my-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          How do I adopt a pet through this service?
        </div>
        <div className="collapse-content bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          <p>To adopt a pet, simply browse through available listings, view detailed profiles, and contact the pet owner or shelter for further details. After a successful match, you can complete the adoption process offline.</p>
        </div>
      </div>
  
      <div className="collapse my-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          Are there any fees for using the platform?
        </div>
        <div className="collapse-content bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          <p>The basic services are free, but for additional features such as priority notifications, detailed pet profiles, and unlimited messaging, you need to subscribe to one of our paid plans.</p>
        </div>
      </div>
  
      <div className="collapse my-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          Can I list my own pet for adoption?
        </div>
        <div className="collapse-content bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          <p>Yes, you can list your pet for adoption by creating a profile with detailed information and pictures. You can choose to make it available for free or include an adoption fee.</p>
        </div>
      </div>
  
      <div className="collapse my-4">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          How do I contact a pet owner or shelter?
        </div>
        <div className="collapse-content bg-slate-700 text-white peer-checked:bg-slate-700 peer-checked:text-white">
          <p>You can contact the pet owner or shelter directly through the messaging system on the platform. Premium and Professional plan users have additional features to contact owners more efficiently.</p>
        </div>
      </div>
  
    </div>
  </div>
  
  );
};

export default PricingPage;




{/* <div style={{
      borderRadius: "5px",
      backgroundImage: "linear-gradient(to right top, rgb(139, 92, 246), rgb(253, 186, 116))",
      backgroundSize: "100%",
      backgroundRepeat: "repeat",
    }} className='mt-[100px]'>
      <h1>This is prising page.</h1>
    </div> */}