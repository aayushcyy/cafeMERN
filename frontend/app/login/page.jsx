"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useStore } from "../Store/authStore";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, setUser } = useStore();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!phone || !password) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    // login(phone, password);
    const loginFnc = async (phone, password) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, password }),
          }
        );

        if (!response.ok) {
          setErrorMessage("User doesn't exists! Please register.");
          throw new Error("Invalid credentials");
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setUser(data.user);
        router.refresh();
        router.push("/book");
        setLoading(false);
      } catch (error) {
        console.error("Login failed: ", error);
      }
    };
    loginFnc(phone, password);
    // router.refresh();
    // router.push("/book");
    setLoading(false);

    // setPhone("");
    // setPassword("");
    // setErrorMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col px-24 bg-[#EDF4F2] text-[#1e2b23]">
      {/* Navbar */}
      <div className="flex justify-between py-4.5 items-center text-[#1e2b23]">
        <Link
          className="font-bold text-lg text-[#3a5c47] font-montserrat"
          href="/"
        >
          CafeZiq5
        </Link>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[20%] flex flex-col gap-5">
          <p className="text-3xl mt-2 font-semibold">Login</p>
          <p>
            Don't have an account?{" "}
            <Link href={"/register"} className="underline text-green-700">
              Register
            </Link>
          </p>

          <form className="flex flex-col gap-3 mt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone">Mobile No.</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your mobile no"
                className="bg-[#E4E4E7] outline-none pl-3 pr-1 py-2 text-sm rounded-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="bg-[#E4E4E7] outline-none pl-3 pr-1 py-2 text-sm rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
            {loading ? (
              <span class="loader"></span>
            ) : (
              <Button
                color="primary"
                className="w-full mt-3 bg-green-950 text-white rounded-lg py-1 text-lg cursor-pointer"
                type="submit"
              >
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
