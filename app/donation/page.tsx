"use client"

import { baseURL } from '@/server-calling/variable';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handlePayment = async () => {
        const payload = {
            animal: name,
            orderBy: email,
            trxId: amount
        }
        const paymentAmount = parseFloat(amount);
        if (!name || !email || isNaN(paymentAmount) || paymentAmount <= 0) {
            setError('Please fill in all fields with valid information.');
            return;
        } else {
            try {
                const response = await fetch(`${baseURL}/add-pet-order`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                console.log(result);
                toast.success('Submitted successfully! ', {
                    autoClose: 2000,
                })
            } catch (error) {
                toast.error('Something went wrong!', {
                    autoClose: 2000,
                });
            }
        }
        setError('');

    };

    return (
        <div className="container mx-auto p-6 px-36">
            <h1 className="text-3xl font-bold mb-4">Make a Payment</h1>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="Enter your name"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="Enter your email"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Amount (USD)
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field"
                    placeholder="Enter amount"
                />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button className="btn-primary" onClick={handlePayment}>
                Pay Now
            </button>

            <style jsx>{`
        .btn-primary {
          background-color: #0070f3;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .btn-primary:hover {
          background-color: #005bb5;
        }
        .input-field {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default PaymentForm;