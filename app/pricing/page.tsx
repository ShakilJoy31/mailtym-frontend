'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CommunityComponentCSS from '../../style/Home.module.css';
import QuestionsAndAnswers from '../../components/QuestionsAndAnswers';

const PricingPage: React.FC = () => {
  const [billMonthly, setBillMonthly] = useState(false);
  return (
    <div className='pb-8'>
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex justify-center text-black'>Subscription</h1>
      <p className='flex justify-center my-2 italic text-black'>Cost-effective Plans for adopting animals.</p>
      <div className='flex justify-around my-2'>
        <div className='flex justify-around bg-slate-50 rounded-lg p-2 gap-2'>
          <p onClick={() => setBillMonthly(!billMonthly)} className={`${billMonthly ? '' : 'bg-slate-700 text-white rounded-lg'} py-2 px-4 text-black hover:cursor-pointer `}>Billed Monthly</p>
          <p onClick={() => setBillMonthly(!billMonthly)} className={`${!billMonthly ? '' : 'bg-slate-700 text-white rounded-lg'} py-2 px-4 text-black hover:cursor-pointer `}>Billed Yearly</p>
        </div>
      </div>

      {/* Changeable service according to bill time duration... */}
      <div className='flex justify-around'>
        <div className='border border-slate-200 text-white bg-slate-700 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-lg gap-y-3'>
          <p className='flex text-gray-50 text-yellow-500'>Free</p>
          <h1 className='flex text-gray-50 text-4xl my-4'>$00</h1>
          <p className='flex text-gray-200 mb-2'>Basic pet adoption information</p>
          <p className='flex text-gray-200 mb-2'>Search pets by type</p>
          <p className='flex text-gray-200 mb-2'>View pet profiles</p>
          <p className='flex text-gray-200 mb-2'>Access to adoption resources</p>
          <p className='flex text-gray-200 mb-2'>Limited customer support</p>
          <div className='my-4 flex text-gray-200'>
            <button className={`btn border-0 btn-md w-[200px] normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Current Plan</button>
          </div>
        </div>
        <div className='border border-slate-200 text-white bg-slate-700 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-lg gap-y-3'>
          <p className='flex text-gray-50 text-red-400'>Premium</p>
          <h1 className='flex text-gray-50 text-4xl my-4'>{billMonthly ? '$08' : '$10'} <span className='text-xl pt-3'>/month</span> </h1>
          <p className='flex text-gray-200 mb-2'>All Free Plan features</p>
          <p className='flex text-gray-200 mb-2'>Access to detailed pet profiles</p>
          <p className='flex text-gray-200 mb-2'>Priority adoption notifications</p>
          <p className='flex text-gray-200 mb-2'>Email support and chat</p>
          <p className='flex text-gray-200 mb-2'>Exclusive pet care resources</p>
          <div className='my-4 flex text-gray-200'>
            <button className={`btn border-0 btn-md w-[200px] normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Upgrade Now</button>
          </div>
        </div>
        <div className='border border-slate-200 text-white bg-slate-700 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 rounded-lg gap-y-3'>
          <p className='flex text-gray-50 font-bold'>Professional</p>
          <h1 className='flex text-gray-50 text-4xl my-4'>{billMonthly ? '$20' : '$25'} <span className='text-xl pt-3'>/month</span></h1>
          <p className='flex text-gray-200 mb-2'>All Premium Plan features</p>
          <p className='flex text-gray-200 mb-2'>Priority pet matching with adopters</p>
          <p className='flex text-gray-200 mb-2'>Dedicated 24/7 support</p>
          <p className='flex text-gray-200 mb-2'>Pet adoption consultancy services</p>
          <p className='flex text-gray-200 mb-2'>Customizable adoption plans</p>
          <div className='my-4 flex text-gray-200'>
            <button className={`btn border-0 btn-md w-[200px] normal-case ${CommunityComponentCSS.orderExtraItemButton}`}>Upgrade Now</button>
          </div>
        </div>
      </div>
      <QuestionsAndAnswers></QuestionsAndAnswers>
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