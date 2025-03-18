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
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";

export default function MyNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const sliderRef = useRef();

  const { user, logout } = useStore();

  const handleDrawer = () => {
    setOpenDrawer(true);
  };

  // not working
  useEffect(() => {
    if (!user === null) {
      setLoggedIn(true);
      console.log("user is logged in: user: ", user);
      console.log("loggedIn value is ", loggedIn);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

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
            className="gap-10 w-[25%] flex justify-end"
          >
            <NavbarItem>
              <Button className="bg-[#3b5645] px-4 py-1.5 cursor-pointer text-white rounded-full">
                Book Now
              </Button>
            </NavbarItem>

            <NavbarItem>
              <div
                className="bg-[#3b5645] text-white px-4 py-1.5 rounded-[50%]"
                onClick={handleDrawer}
              >
                {user.name || "Profile"}
              </div>
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
            className="w-[30%] bg-pink-100 px-6 py-5 flex flex-col gap-2"
          >
            <div className="flex w-full gap-3 bg-white p-3 rounded-lg">
              <div className="px-3.5 bg-green-950 text-white py-3.5 text-center text-3xl rounded-full">
                AC
              </div>
              <div className="flex flex-col ">
                <p className="text-2xl font-semibold">{"Aayush Chaudhary"}</p>
                <p className="font-semibold text-[#696969]">+91 8889629371</p>
              </div>
              <div className="pt-2">
                <PencilIcon className="size-5 stroke-2 pt-1 cursor-pointer text-[#3B5645]" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-3 bg-white p-3 rounded-lg overflow-y-scroll max-h-[65vh]">
              <p>Booking Details</p>
              <div className="flex flex-col gap-1">
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
                <div className="flex rounded-lg border-[1px] border-[#62626245] py-1 px-2 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div>
                      <div className="border-[1px] border-[#62626269] w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#032e15dc]"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">5P20S</p>
                        <p className="text-xs font-semibold">20 Mar 25</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xs font-[500]">
                          Samta Colony, Raipur
                        </p>
                        <p className="text-xs font-semibold">4PM - 5PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[9px] text-green-500 border-[1px] border-[#62626269] py-0.5 px-1.5 rounded-lg">
                    Upcoming
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-red-500 mt-12 cursor-pointer">
              <ArrowLeftStartOnRectangleIcon className="size-6 pt-1  text-[#162a1d]" />
              <p className="hover:underline">Logout</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
