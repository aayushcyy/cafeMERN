"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

export default function MyNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:4000/auth/me");
    } catch (error) {}
  };

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

        <NavbarContent
          justify="end"
          className="gap-10 w-[25%] flex justify-end"
        >
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/login"
              className="border-[2px] border-[#dadada63] px-4 py-1.5 rounded-full"
            >
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              className="bg-[#3b5645] px-4 py-1.5 cursor-pointer text-white rounded-full"
              variant="shadow"
            >
              Book Now
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
