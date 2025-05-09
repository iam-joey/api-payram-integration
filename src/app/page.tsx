"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import Toast from './Toast';

export default function Home() {
  const [customerId, setCustomerId] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{message: string; type?: 'error' | 'success'}|null>(null);

  useEffect(() => {
    const generateCustomerId = () => {
      const id = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setCustomerId(id);
    };

    generateCustomerId();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setToast(null);

    // Frontend validation
    if (!email || !customerId || !amount) {
      setToast({ message: 'All fields are required', type: 'error' });
      return;
    }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum < 0.5) {
      setToast({ message: 'Amount must be a number and at least 0.5', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: email,
          customerId,
          amountInUSD: amountNum
        })
      });
      const data = await res.json();
      console.log('Payment initiation response:', data);
      if (!res.ok) {
        setToast({ message: data.error || 'Payment initiation failed', type: 'error' });
      } else {
        setToast({ message: 'Payment initiated! Redirecting...', type: 'success' });
        // Optionally open the payment URL in a new tab
        if (data.url) {
          setTimeout(() => window.open(data.url, '_blank'), 1200);
        }
      }
    } catch (err: any) {
      setToast({ message: err?.message || 'Something went wrong', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f2f6fd] to-[#f7fafd]">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Payment Form</h1>
        <p className="text-lg text-gray-600">Enter payment details below</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-blue-100">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="customerId" className="block font-bold text-sm text-gray-800 mb-1">Customer ID</label>
            <input
              type="text"
              id="customerId"
              className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-200 bg-gray-50 text-gray-700 font-medium text-base focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400 outline-none"
              value={customerId}
              readOnly
              disabled={isLoading}
            />
            <div className="text-xs text-gray-500 mt-1">Auto-generated ID for this customer</div>
          </div>
          <div>
            <label htmlFor="amount" className="block font-bold text-sm text-gray-800 mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-200 bg-white text-gray-700 font-medium text-base focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400 outline-none"
              placeholder="100.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor=" email" className="block font-bold text-sm text-gray-800 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 px-4 py-2 block w-full rounded-md border border-gray-200 bg-white text-gray-700 font-medium text-base focus:border-blue-400 focus:ring-blue-400 placeholder-gray-400 outline-none"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-[#11182c] px-4 py-2 text-base font-bold text-white shadow-sm hover:bg-[#212b44] transition-colors focus:outline-none focus:ring-2 focus:ring-[#11182c] focus:ring-offset-2 disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Processing...</span>
              ) : (
                'Pay'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
