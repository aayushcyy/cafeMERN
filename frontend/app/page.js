"use client";

import React from "react";
import { Button } from "@heroui/react";
import MyNavbar from "./Component/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col px-24 bg-[#EDF4F2]">
      <MyNavbar />

      <div className="flex flex-col w-full pt-20 items-center gap-3 h-[85vh] text-[#1e2b23]">
        <Link
          href={"/"}
          className="bg-white px-3 py-1.5 shadow-[0_0_15px_3px_rgba(0,0,0,0.1)] rounded-lg mb-5"
        >
          Welcome to CafeZiq5
        </Link>
        <p className="text-6xl font-semibold text-center leading-[70px]">
          Your Space, Your Time <br /> Book a Cabin Now!
        </p>
        <p className="w-[37%] text-base text-[#000000c9] text-center">
          Get a quiet space for work, meetings, or just relaxation? Secure your
          private cabin in a few clicks
        </p>
        <p className="text-[#31473A] flex gap-3">
          Instant Online Booking <span className="text-black">|</span> ₹200/hour
          <span className="text-black"> | </span> Two Branches Available
        </p>
        <Button
          className="bg-[#2f4537] text-white custom-button rounded-xl py-2 px-4 mt-10 cursor-pointer"
          onClick={() => router.push("/book")}
        >
          Book Now
        </Button>
      </div>
    </main>
  );
}
