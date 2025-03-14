"use client";

import React from "react";
import { Button } from "@heroui/react";
import MyNavbar from "./Component/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-24">
      <MyNavbar />
    </main>
  );
}
