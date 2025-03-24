import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useStore } from "../Store/authStore";

export default function PaymentBtn() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user, bookingDetail } = useStore();
  const router = useRouter();

  useEffect(() => {
    // Dynamically add Razorpay script to the page
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const startPayment = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/payment/now", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: 100 }),
    });

    const order = await res.json();

    if (!order.id) {
      setLoading(false);
      return alert("Order creation failed!");
    }

    if (typeof window !== "undefined" && window.Razorpay) {
      // Initialize razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Cafe Ziq",
        description: "Test transaction",
        order_id: order.id,
        handler: async (response) => {
          // verify payment
          const verifyRes = await fetch(
            `http://localhost:4000/payment/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: id,
              }),
            }
          );

          const verifyData = await verifyRes.json();
          alert(verifyData.success ? "Payment Successful!" : "Payment Failed!");
          if (verifyData.success) {
            router.push("/book");
          }

          // remove booking here
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `process.env.NEXT_PUBLIC_API_URL/book/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: user.user.name,
              phone: user.user.phone,
              branch: bookingDetail.branch,
              date: bookingDetail.dateForDb,
              slot: bookingDetail.slot,
            }),
          }
        );

        if (!response.ok)
          throw new Error("Invalid credentials, response: ", response);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Booking failed ", error);
      }
    } else {
      alert("Razorpay SDK failed to load. Are you online?");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
