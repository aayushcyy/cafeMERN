"use client";

import React, { useState, useEffect } from "react";
import MyNavbar from "../Component/Navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import SlotDiv from "../Component/SlotsDiv";
import { useRouter } from "next/navigation";
import { useStore } from "../Store/authStore.js";
import BigLoader from "../Component/BigLoader";

const locationItems = [
  { key: "new", label: "Samta Colony, Raipur" },
  { key: "copy", label: "Kota Chowk, Raipur" },
];

const dateItems = [
  { key: "today", label: "Today" },
  { key: "tomorrow", label: dayjs().add(1, "day").format("ddd, D MMM YY") },
  {
    key: "after_tomorrow",
    label: dayjs().add(2, "day").format("ddd, D MMM YY"),
  },
];

export default function Page() {
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [anotherLoading, setAnotherLoading] = useState(false);
  const router = useRouter();

  const { user, setBookingDetail } = useStore();

  const fetchSlots = async () => {
    if (!date || !location) return console.log("Please fill date and location");

    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("API URL is not defined in environment variables.");
      return;
    }

    const shortDate =
      date === "Today"
        ? dayjs().format("ddd, D MMM YY").substring(5).replace(/\s/g, "")
        : date.substring(5).replace(/\s/g, "");

    const shortBranch = location.includes("Samta") ? "samta" : "kota";

    try {
      setLoading(true);
      setSlots(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: shortDate, branch: shortBranch }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const allSlots = await response.json();
      setSlots(allSlots?.doc?.slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setErrorMsg("Error getting the slots! Try Again.");
      setShowTryAgain(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [location, date]);

  const clickHandler = async (slot) => {
    setAnotherLoading(true);

    if (!user) {
      router.push(`/login`);
      setAnotherLoading(false);
      return;
    }

    if (!date) return;

    let dateToSend;
    if (date === "Today") {
      dateToSend = dayjs().format("DMMMYY");
    } else {
      const dateArr = date.slice(5, 14).split(" ");
      dateToSend = `${dateArr[0]}${dateArr[1]}${dateArr[2]}`.toLowerCase();
    }

    setBookingDetail({
      date: date === "Today" ? dayjs().format("DMMMYY") : date,
      slot: slot,
      branch: location.includes("Samta") ? "samta" : "kota",
      dateForDb: dateToSend,
    });

    const day = date === "Today" ? dayjs().format("D") : date?.split(", ")[1];
    const din = day?.split(" ")[0];
    const hr = slot.slice(0, 2);
    const branch = location.slice(0, 1);
    const uniqueId = `${hr}${din}${branch}`;

    router.push(`/book/${uniqueId}`);
    setAnotherLoading(false);
  };

  return (
    <div className="flex h-screen flex-col px-24 bg-[#EDF4F2] text-[#1e2b23]">
      <MyNavbar />
      {anotherLoading && <BigLoader />}
      <div className="w-full flex pt-5 justify-center gap-10">
        {/* Input Div */}
        <div className="flex flex-col gap-5 w-1/2 pl-[20%]">
          {/* Location Selector */}
          <div className="flex flex-col gap-1 w-60">
            <p className="text-[#1e2b236f]">Location</p>
            <Dropdown className="w-60">
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="relative overflow-hidden cursor-pointer flex bg-white py-2 rounded-lg gap-1 justify-between"
                >
                  {location === null ? "Select Location" : location}
                  <ChevronDownIcon className="size-6 pt-1 text-[#3B5645]" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dynamic Actions"
                items={locationItems}
                className="bg-white w-60 overflow-hidden px-2 py-1 rounded-lg"
              >
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    className="hover:bg-[#0000000f] rounded-lg"
                    onClick={() => setLocation(item.label)}
                  >
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Date Selector */}
          <div className="flex flex-col gap-1 w-40 relative">
            <p className="text-[#1e2b236f]">Date</p>
            <Dropdown className="w-40">
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="relative overflow-hidden cursor-pointer flex bg-white py-2 rounded-lg gap-1 justify-between"
                >
                  {date === null ? "Select Date" : date.slice(0, 11)}
                  <ChevronDownIcon className="size-6 pt-1 text-[#3B5645]" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dynamic Actions"
                items={dateItems}
                className="bg-white overflow-hidden px-2 py-1 rounded-lg"
              >
                {(item) => (
                  /// look here

                  <DropdownItem
                    key={item.key}
                    className="hover:bg-[#0000000f] rounded-lg"
                    onClick={() =>
                      item.label === "Today"
                        ? setDate("Today")
                        : setDate(item.label)
                    }
                  >
                    {item.label.slice(0, 11)}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className=" flex w-1/2">
          <div className="">
            <div className="flex flex-col gap-2 pt-1">
              {slots === null ? (
                loading ? (
                  <span className="loader absolute left-52 top-48"></span>
                ) : errorMsg ? (
                  errorMsg
                ) : (
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p>
                      Please Select the Branch and Date to see the available
                      slots.
                    </p>
                    {showTryAgain && (
                      <Button
                        className="px-3 py-2 text-xs font-semibold cursor-pointer bg-green-950 text-white rounded-lg"
                        onClick={() => fetchSlots()}
                      >
                        Try Again
                      </Button>
                    )}
                  </div>
                )
              ) : (
                slots.map((slot) => (
                  <div key={slot._id} onClick={() => clickHandler(slot.time)}>
                    <SlotDiv slot={slot.time} available={slot.isBooked} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div>
          <p className="text-xs">Made with 💗 by Aayush Chuadhary</p>
        </div> */}
    </div>
  );
}
