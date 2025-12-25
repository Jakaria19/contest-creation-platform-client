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
    participantCount,
    contestType,
    taskInstruction,
    _id,
  } = contest;

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (contestPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: contestPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Payment Intent Error:", err));
    }
  }, [axiosSecure, contestPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const paymentInfo = {
          contestCreatorMail,
          contestParticipateMail: user?.email,
          transactionId: paymentIntent.id,
          contestId: _id,
          contestName,
          prize: priceMoney,
          contestType,
          taskInstruction,
          amount: contestPrice,
          paidStatus: "paid",
          date: new Date(),
        };

        try {
          const res = await axiosSecure.post("/payments", paymentInfo);

          const updateRes = await axiosSecure.patch(`/participation/${_id}`, {
            participantCount: participantCount + 1,
          });

          if (updateRes.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: `Transaction ID: ${paymentIntent.id}`,
              confirmButtonColor: "#0284c7",
            });
            navigate("/dashboard/participatedContest");
          }
        } catch (err) {
          console.error("Database Update Error:", err);
          setError(
            "Payment succeeded but database update failed. Contact support."
          );
        }
      }
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-inner border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border rounded-xl bg-slate-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1e293b",
                  "::placeholder": { color: "#94a3b8" },
                },
                invalid: { color: "#e11d48" },
              },
            }}
          />
        </div>

        <button
          type="submit"
          className={`btn w-full text-white font-bold rounded-xl transition-all ${
            processing || !stripe || !clientSecret
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-200"
          }`}
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            `Pay $${contestPrice}`
          )}
        </button>

        {error && (
          <p className="text-sm text-red-500 font-medium text-center italic">
            {error}
          </p>
        )}
      </form>

      {transactionId && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-xs text-center">
            Success! Transaction ID:{" "}
            <span className="font-mono font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
