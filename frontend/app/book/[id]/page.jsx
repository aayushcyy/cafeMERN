"use client";

import MyNavbar from "../../Component/Navbar";
import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { useStore } from "../../Store/authStore.js";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Confetti from "../../Component/Confetti";

export default function page() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { bookingDetail } = useStore();
  const router = useRouter();

  const { id } = useParams();
  const { user } = useStore();

  const handleClick = async () => {
    // console.log(user);
    // console.log(bookingDetail);
    if (user && bookingDetail) {
      setLoading(true);
      console.log("1 user", user.user);
      console.log("2 booking detail from zustand", bookingDetail);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:4000/book/${id}`, {
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
        });

        if (!response.ok)
          throw new Error("Invalid credentials, response: ", response);
        const data = await response.json();
        setMsg("Booking Successful!");
        setTimeout(() => {
          router.push("/book");
        }, 2500);
        console.log(data);
      } catch (error) {
        console.error("Booking failed ", error);
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen flex-col px-24 bg-[#EDF4F2] text-[#1e2b23] relative w-full">
      <MyNavbar />
      <div className="w-full">
        <div>
          <div className="py-10">
            <div className="w-auto h-[70vh] px-1 py-1 flex flex-col items-center">
              <div className="flex flex-col w-[28%] bg-white">
                <div className="px-5 py-3">
                  <p className="uppercase text-green-700">Booking Summary</p>
                  <p className="italic text-green-800 font-medium">{id}</p>
                  <p className="text-green-950">
                    Name: <span className="italic">{user.user.name}</span>
                  </p>
                  <p className="text-green-950">
                    Phone: <span className="italic">+91 {user.user.phone}</span>
                  </p>
                  <p className="text-green-950">
                    Branch:{" "}
                    <span className="italic">
                      {bookingDetail?.branch ?? "N/A"}
                    </span>
                  </p>
                  <p className="text-green-950">
                    Date:{" "}
                    <span className="italic">
                      {bookingDetail?.date ?? "N/A"}
                    </span>
                  </p>
                  <div className="flex justify-between">
                    <p className="text-green-950">
                      Slot:{" "}
                      <span className="italic">
                        {bookingDetail?.slot ?? "N/A"}(1hr)
                      </span>
                    </p>
                    <p>₹200</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#929292]">Convenience fee</p>
                    <p>₹13</p>
                  </div>
                  <div className="flex items-center overflow-hidden text-[#d8d8d8]">
                    ...................................................................................................................................................................................................................................................................................
                  </div>
                  <div className="flex justify-between">
                    <p>Sub Total</p>
                    <p>₹213</p>
                  </div>
                </div>
                <div className="w-full bg-green-200 flex justify-between px-5 py-2 text-lg">
                  <p>Amount Payable</p>
                  <p>₹213</p>
                </div>
              </div>
              <div className="flex items-center mr-3 mt-6">
                <InformationCircleIcon className="size-5 pt-1 text-[#3B5645]" />
                <p className="text-xs">
                  By proceeding, I express my consent to complete this
                  transaction.
                </p>
              </div>
              {msg ? (
                <div className="w-full items-center justify-center flex relative py-6 text-sm font-semibold">
                  <Confetti />
                </div>
              ) : loading ? (
                <div className="w-full items-center justify-center flex relative py-6">
                  <span className="loader3 absolute left-0 top-0"></span>
                </div>
              ) : (
                <Button
                  className="text-xl py-2 text-center w-[373px] rounded-lg mt-2 bg-[#2f4637] text-white cursor-pointer"
                  onClick={handleClick}
                >
                  Proceed to Pay
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
