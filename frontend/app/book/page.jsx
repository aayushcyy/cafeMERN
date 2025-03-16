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

  useEffect(() => {
    if (!date || !location) {
      return console.log("Please fill date and location");
    }

    const shortDate = date.substring(5).replace(/\s/g, "");
    const shortBranch = location.includes("Samta") ? "samta" : "kota";

    const getSlots = async () => {
      try {
        const response = await fetch("http://localhost:4000/slots", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: shortDate, branch: shortBranch }),
        });
        const allSlots = await response.json();
        setSlots(allSlots);
        console.log(slots);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    getSlots();
  }, [location, date]);

  return (
    <div className="flex min-h-screen flex-col px-24 bg-[#EDF4F2] text-[#1e2b23]">
      <MyNavbar />
      <div className="w-full flex pt-5 justify-center gap-20">
        {/* Input Div */}
        <div className="flex flex-col gap-5">
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
                  <DropdownItem
                    key={item.key}
                    className="hover:bg-[#0000000f] rounded-lg"
                    onClick={() => setDate(item.label)}
                  >
                    {item.label.slice(0, 11)}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="h-screen flex">
          <div className="">
            <div className="flex flex-col gap-2 pt-1">
              <SlotDiv slot="1PM - 2PM" />
              <SlotDiv />
              <SlotDiv available={false} />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
              <SlotDiv />
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
