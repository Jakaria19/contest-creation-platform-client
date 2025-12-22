import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const contest = useLoaderData();
  console.log(contest);
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-center mb-8 mt-8 text-blue-500">
        Payment
      </h2>
      <div className="w-1/2 mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm contest={contest}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
