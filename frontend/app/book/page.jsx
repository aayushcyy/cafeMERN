"use client";

import React, { useState } from "react";
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
  return (
    <div className="flex min-h-screen flex-col px-24 bg-[#EDF4F2] text-[#1e2b23]">
      <MyNavbar />
      <div className="w-full">
        <div>
          <div className="">
            <p>Location</p>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="relative overflow-hidden cursor-pointer flex bg-white py-2 rounded-lg gap-1"
                >
                  {location === null ? "Select Location" : location}
                  <ChevronDownIcon className="size-6 pt-1 text-[#3B5645]" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dynamic Actions"
                items={locationItems}
                className="bg-white w-48 overflow-hidden px-2 py-1 rounded-lg"
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
          <div className="">
            <p>Location</p>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="relative overflow-hidden cursor-pointer flex bg-white py-2 rounded-lg gap-1"
                >
                  {date === null ? "Select Date" : date}
                  <ChevronDownIcon className="size-6 pt-1 text-[#3B5645]" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dynamic Actions"
                items={dateItems}
                className="bg-white w-48 overflow-hidden px-2 py-1 rounded-lg"
              >
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    className="hover:bg-[#0000000f] rounded-lg"
                    onClick={() => setDate(item.label.slice(0, 11))}
                  >
                    {item.label.slice(0, 11)}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div></div>
      </div>
      {/* <div>
        <p className="text-xs">Made with 💗 by Aayush Chuadhary</p>
      </div> */}
    </div>
  );
}
