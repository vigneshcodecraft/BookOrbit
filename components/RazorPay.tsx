"use client";

import { useState } from "react";
import Script from "next/script";
import { createOrder } from "@/lib/actions";
import { useRouter } from "next/navigation";

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
}

export default function AppointmentBooking({
  customer,
  redirectUrl,
  amount,
}: {
  amount: number;
  customer: ICustomer;
  redirectUrl: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    setIsLoading(true);
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsLoading(false);
      return;
    }

    try {
      const result = await createOrder(amount, "INR", "receipt_" + Date.now(), {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      });

      if (result.success && result.order) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: result.order.amount,
          currency: result.order.currency,
          name: "Library Management System",
          description: "Appointment Booking",
          order_id: result.order.id,
          handler: function (response: any) {
            // Handle successful payment
            console.log(response);
            router.push(redirectUrl);
            // Redirect to Calendly
          },
          prefill: {
            name: customer.name,
            email: customer.email,
            contact: customer.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      } else {
        console.error("Error creating order");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handleBooking}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
      >
        {isLoading ? "Processing..." : "Book Appointment"}
      </button>
    </>
  );
}
