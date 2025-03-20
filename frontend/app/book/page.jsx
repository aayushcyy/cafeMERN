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
  {
    key: "new",
    label: "Samta Colony, Raipur",
  },
  {
    key: "copy",
    label: "Kota Chowk, Raipur",
  },
];
const dateItems = [
  {
    key: "today",
    label: "Today",
  },
  {
    key: "tomorrow",
    label: dayjs().add(1, "day").format("ddd, D MMM YY"),
  },
  {
    key: "after tommorow",
    label: dayjs().add(2, "day").format("ddd, D MMM YY"),
  },
];

export default function page() {
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [uniqueId, setUniqueId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anotherLoading, setAnotherLoading] = useState(false);
  const router = useRouter();

  const { user, setBookingDetail } = useStore();

  //fetching slots
  useEffect(() => {
    if (!date || !location) {
      return console.log("Please fill date and location");
    }

    const shortDate =
      date === "Today"
        ? dayjs().format("ddd, D MMM YY").substring(5).replace(/\s/g, "")
        : date.substring(5).replace(/\s/g, "");

    console.log(shortDate);

    const shortBranch = location.includes("Samta") ? "samta" : "kota";

    const getSlots = async () => {
      try {
        setLoading(true);
        setSlots(null);
        const response = await fetch("http://localhost:4000/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: shortDate, branch: shortBranch }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const allSlots = await response.json();
        if (allSlots) {
          setSlots(allSlots.doc.slots);
          console.log(slots);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setErrorMsg(
          "Error getting the slots availability! Please try after sometimes."
        );
      }
      setLoading(false);
    };
    getSlots();
  }, [location, date]);

  const clickHandler = async (slot) => {
    setAnotherLoading(true);
    const isLoggedIn = !!(await user);
    if (isLoggedIn) {
      if (date !== null) {
        setBookingDetail({
          date: date === "Today" ? dayjs().format("DMMMYY") : date,
          slot: slot,
          branch: location,
        });
        const day =
          date === "Today" ? dayjs().format("D") : date?.split(", ")[1];
        const din = day?.split(" ")[0];
        const hr = slot.slice(0, 2);
        const branch = location.slice(0, 1);
        const uniqueId = `${hr}${din}${branch}`;
        router.push(`/book/${uniqueId}`);
      }
    } else {
      router.push(`/login`);
    }
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
                  "Please Select the Branch and Date to see the available slots"
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
