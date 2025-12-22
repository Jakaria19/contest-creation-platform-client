import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ contest }) => {
  console.log(contest);
  const {
    contestPrice,
    email,
    contestName,
    priceMoney,
    participantCount,
    contestType,
    taskInstruction,
    _id,
  } = contest;
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const price = contestPrice;

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      setError("");
    }

    // confirm payment
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
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id:", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        //payment info inert collection
        const paymentInfo = {
          contestCreatorMail: email,
          contestParticipateMail: user?.email,
          transactionId: paymentIntent.id,
          contestId: _id,
          contestName: contestName,
          prize: priceMoney,
          contestType: contestType,
          taskInstruction: taskInstruction,
          amount: contestPrice,
          paidStatus: "paid",
        };
        const res = await axiosSecure.post("/payments", paymentInfo);
        console.log(res.data);

        //participation update
        const updateParticipate = {
          participantCount: participantCount + 1,
        };

        const update = await axiosSecure.patch(
          `/participation/${_id}`,
          updateParticipate
        );
        if (update.data.modifiedCount > 0) {
          console.log("payment successfully");
          // reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(update.data);
        navigate("/dashboard/participatedContest");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-sm bg-sky-600 text-white my-4"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
      </form>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </div>
  );
};

export default CheckoutForm;
