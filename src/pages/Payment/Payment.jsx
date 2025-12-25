import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const contest = useLoaderData();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-neutral uppercase tracking-tight mb-2">
            Secure <span className="text-primary">Payment</span>
          </h2>
          <p className="text-gray-500">Complete your enrollment for</p>
          <p className="text-xl font-bold text-sky-600 italic">
            "{contest?.contestName}"
          </p>
        </div>

        {/* Checkout Card */}
        <div className="bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left Side: Summary */}
          <div className="md:w-1/3 bg-sky-600 p-8 text-white">
            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
              Order Summary
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Registration Fee:</span>
                <span className="font-bold">${contest?.contestPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Contest Type:</span>
                <span className="capitalize">{contest?.contestType}</span>
              </div>
              <div className="divider before:bg-white/20 after:bg-white/20"></div>
              <div className="flex justify-between text-lg font-black">
                <span>Total:</span>
                <span>${contest?.contestPrice}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Stripe Form */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h3 className="text-lg font-bold text-neutral mb-6">
              Card Information
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm contest={contest} />
            </Elements>

            <div className="mt-8 flex items-center gap-4 text-gray-400">
              <div className="flex gap-2 text-2xl">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-stripe"></i>
              </div>
              <p className="text-[10px] uppercase tracking-widest leading-tight">
                Your payment is secured with 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
