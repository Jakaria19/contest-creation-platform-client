import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const contest = useLoaderData();

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full mb-4">
            <FaShieldAlt /> Secure Checkout
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral tracking-tighter uppercase mb-3">
            Finalize <span className="text-indigo-600">Entry</span>
          </h2>
          <p className="text-gray-400 font-medium italic underline decoration-indigo-200 decoration-4">
            "{contest?.contestName}"
          </p>
        </div>

        <div className="bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-neutral p-10 text-white">
            <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4 uppercase tracking-widest">
              Invoice
            </h3>
            <div className="space-y-5 text-sm">
              <div className="flex justify-between opacity-70 font-medium">
                <span>Entry Fee</span>
                <span className="font-bold text-white">
                  ${contest?.contestPrice}
                </span>
              </div>
              <div className="flex justify-between opacity-70 font-medium">
                <span>Service Fee</span>
                <span className="font-bold text-white">$0.00</span>
              </div>
              <div className="divider before:bg-white/5 after:bg-white/5"></div>
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase opacity-50 font-black tracking-widest">
                  Total Payable
                </span>
                <span className="text-3xl font-black text-indigo-500">
                  ${contest?.contestPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-10 md:p-16">
            <h3 className="text-xl font-black text-neutral mb-8 uppercase tracking-tight">
              Payment Details
            </h3>
            <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Elements stripe={stripePromise}>
                <CheckoutForm contest={contest} />
              </Elements>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-4 grayscale opacity-40">
                <img
                  className="h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                />
                <img
                  className="h-6"
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                />
              </div>
              <p className="text-[9px] uppercase font-black text-gray-400 tracking-[0.2em] text-center sm:text-right">
                Military Grade SSL Encryption <br /> Transaction Protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
