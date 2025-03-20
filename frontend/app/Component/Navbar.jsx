"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useStore } from "../Store/authStore.js";
import {
  PencilIcon,
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function MyNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const sliderRef = useRef();

  dayjs.extend(customParseFormat);

  const { user, logout } = useStore();

  const handleDrawer = () => {
    setOpenDrawer(true);
  };

  function hasTimePassed(dateStr, timeStr) {
    const day = dateStr.slice(0, 2);
    const month = dateStr.slice(2, 5).toLowerCase();
    const monthFormatted = month.charAt(0).toUpperCase() + month.slice(1);
    const year = "20" + dateStr.slice(5, 7);
    const startTime = timeStr.split(" - ")[0];

    // Corrected Date Parsing
    const dateTimeStr = `${day} ${monthFormatted} ${year} ${startTime}`;
    const eventDate = dayjs(dateTimeStr, "DD MMM YYYY hA");

    const now = dayjs();

    return eventDate.isValid() ? eventDate.isBefore(now) : false;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        setOpenDrawer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <Navbar
        shouldHideOnScroll
        className="flex  justify-between py-3 items-center text-[#1e2b23]"
      >
        <NavbarBrand className="w-[25%]">
          <Link
            className="font-bold text-lg text-[#3a5c47] font-montserrat"
            href="/"
          >
            CafeZiq5
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-16 group" justify="center">
          <NavbarItem className="group-hover:opacity-50 hover:!opacity-100 transition-opacity duration-200">
            <Link color="foreground" href="#">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem className="group-hover:opacity-50 hover:!opacity-100 transition-opacity duration-200">
            <Link aria-current="page" href="#">
              Feedback
            </Link>
          </NavbarItem>
          <NavbarItem className="group-hover:opacity-50 hover:!opacity-100 transition-opacity duration-200">
            <Link color="foreground" href="#">
              Menu
            </Link>
          </NavbarItem>
        </NavbarContent>

        {user ? (
          <NavbarContent
            justify="end"
            className="gap-10 w-[25%] flex justify-end items-center"
          >
            <NavbarItem>
              <Button className="bg-[#3b5645] px-4 py-1.5 cursor-pointer text-white rounded-full">
                Book Now
              </Button>
            </NavbarItem>

            <NavbarItem onClick={handleDrawer}>
              <UserCircleIcon className="size-11 cursor-pointer  text-[#162a1d]" />
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent
            justify="end"
            className="gap-10 w-[25%] flex justify-end"
          >
            <NavbarItem>
              <Link
                href="/login"
                className="border-[2px] border-[#dadada63] px-4 py-1.5 rounded-full"
              >
                Login
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Button className="bg-[#3b5645] px-4 py-1.5 cursor-pointer text-white rounded-full">
                Book Now
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
      </Navbar>
      {openDrawer && (
        <div className="drawer w-full bg-[#00000038] h-screen absolute top-0 right-0 flex justify-end z-20 text-green-950">
          <motion.div
            ref={sliderRef}
            className="w-[30%] bg-gray-200 px-6 py-5 flex flex-col gap-2"
          >
            <div className="flex w-full gap-3 bg-white p-3 rounded-lg">
              <div className="px-3.5 bg-green-950 text-white py-3.5 text-center text-3xl rounded-full">
                AC
              </div>
              <div className="flex flex-col ">
                <p className="text-2xl font-semibold">
                  {user?.user.name ?? "NA"}
                </p>
                <p className="font-semibold text-[#696969]">
                  +91 {user?.user.phone ?? "NA"}
                </p>
              </div>
              <div className="pt-2">
                <PencilIcon className="size-5 stroke-2 pt-1 cursor-pointer text-[#3B5645]" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-3 bg-white p-3 rounded-lg overflow-y-scroll h-[65vh]">
              <p>Booking Details</p>
              <div className="flex flex-col gap-1">
                {user.user.bookings.map((booking) => (
                  <div
                    className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center"
                    key={booking.bookingId}
                  >
                    <div className="flex gap-3 items-center">
                      <div>
                        <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="flex flex-col">
                          <p className="text-xs font-[500] text-green-600">
                            {booking.bookingId}
                          </p>
                          <p className="text-xs font-semibold">
                            {booking.bookingDate.replace(
                              /(\d{2})([a-z])(\w{2})(\d{2})/,
                              (_, d, m, rest, y) =>
                                `${d} ${m.toUpperCase()}${rest} ${y}`
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-xs font-[500]">
                            {booking.branch.includes("samta")
                              ? "Samta Colony, Raipur"
                              : "Kota Chowk, Raipur"}
                          </p>
                          <p className="text-xs font-semibold">
                            {booking.slot}
                          </p>
                        </div>
                      </div>
                    </div>
                    {booking.bookingDate &&
                      booking.slot &&
                      !hasTimePassed(booking.bookingDate, booking.slot) && (
                        <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                          Upcoming
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center text-red-500 mt-12 cursor-pointer">
              <ArrowLeftStartOnRectangleIcon className="size-6 pt-1  text-[#162a1d]" />
              <p className="hover:underline" onClick={() => logout()}>
                Logout
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
