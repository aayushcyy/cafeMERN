"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useStore } from "../Store/authStore.js";

export default function MyNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const { user, logout } = useStore();

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
          {user ? (
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-[#3b5645] text-white px-4 py-1.5 rounded-full">
                  {user.name || "Profile"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="bg-black">
                <DropdownItem>
                  <span className="font-bold text-white">{user.name}</span>
                </DropdownItem>
                <DropdownItem>
                  <span className="text-white">{user.phone}</span>
                </DropdownItem>
                <DropdownItem onClick={logout} className="text-red-500">
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Link
                href="/login"
                className="border-[2px] border-[#dadada63] px-4 py-1.5 rounded-full"
              >
                Login
              </Link>
            </NavbarItem>
          )}
          <NavbarItem>
            <Button className="bg-[#3b5645] px-4 py-1.5 cursor-pointer text-white rounded-full">
              Book Now
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
