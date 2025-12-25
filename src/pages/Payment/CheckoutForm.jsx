import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ contest }) => {
  const {
    contestPrice,
    email: contestCreatorMail,
    contestName,
    priceMoney,
    _id,
  } = contest;
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (contestPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: contestPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, contestPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || processing) return;

    const card = elements.getElement(CardElement);
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: { email: user?.email, name: user?.displayName },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        contestId: _id,
        contestName,
        participantEmail: user?.email,
        transactionId: paymentIntent.id,
        price: contestPrice,
        date: new Date(),
        status: "paid",
      };

      // Save payment and increment participant count
      await axiosSecure.post("/payments", paymentInfo);
      await axiosSecure.patch(`/participation/${_id}`);

      Swal.fire("Success", "Payment Successful!", "success");
      navigate("/dashboard/my-participated-contests");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <button
        className="btn btn-primary mt-4 w-full"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay $${contestPrice}`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
