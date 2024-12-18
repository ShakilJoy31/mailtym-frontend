"use client";

import { baseURL } from "@/server-calling/variable";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationSchedule, setDonationSchedule] = useState("One Time");

  // Contact Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [coverFees, setCoverFees] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    const paymentAmount = parseFloat(customAmount || amount);
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      isNaN(paymentAmount) ||
      paymentAmount <= 0
    ) {
      setError("Please fill in all fields with valid information.");
      return;
    }
    setError("");

    // Payload
    const payload = {
      amount: paymentAmount,
      schedule: donationSchedule,
      firstName,
      lastName,
      email,
      address,
      address2,
      city,
      state,
      zip,
      country,
      coverFees,
    };

    try {
      const response = await fetch(`${baseURL}/add-pet-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      toast.success("Donation submitted successfully!", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Donation</h1>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="block font-bold mb-2">Amount *</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="100"
              checked={amount === "100"}
              onChange={(e) => setAmount(e.target.value)}
              className="mr-2"
            />
           BDT 100
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="50"
              checked={amount === "50"}
              onChange={(e) => setAmount(e.target.value)}
              className="mr-2"
            />
           BDT 50
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="25"
              checked={amount === "25"}
              onChange={(e) => setAmount(e.target.value)}
              className="mr-2"
            />
           BDT 25
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="custom"
              checked={amount === "custom"}
              onChange={(e) => setAmount("custom")}
              className="mr-2"
            />
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter custom amount"
              className="border rounded p-2 ml-2 w-32"
            />
          </label>
        </div>
      </div>

      {/* Donation Schedule */}
      <div className="mb-6">
        <label className="block font-bold mb-2">Donation Schedule</label>
        <select
          value={donationSchedule}
          onChange={(e) => setDonationSchedule(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="One Time">One Time</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      {/* Contact Information */}
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="First Name *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Last Name *"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <input
        type="email"
        placeholder="Email *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 border rounded p-2"
      />
      <input
        type="text"
        placeholder="Address Line 1 *"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full mb-2 border rounded p-2"
      />
      <input
        type="text"
        placeholder="Address Line 2"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
        className="w-full mb-4 border rounded p-2"
      />
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="State/Province"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="ZIP/Postal Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full mb-6 border rounded p-2"
      />

      {/* Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={coverFees}
          onChange={(e) => setCoverFees(e.target.checked)}
          className="mr-2"
        />
        <label>Add 3% to my total amount to help cover the payment processing fees</label>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Submit Button */}
      <button
        onClick={handlePayment}
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Upload Payment Information
      </button>
      <ToastContainer />
    </div>
  );
};

export default PaymentForm;
