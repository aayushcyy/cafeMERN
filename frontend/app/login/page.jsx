"use client";

import React from "react";
import Link from "next/link";
import { Form, Input, Button } from "@heroui/react";

export default function page() {
  const [action, setAction] = React.useState(null);
  return (
    <div className="flex min-h-screen flex-col px-24 bg-[#EDF4F2]">
      {/* Navbar */}
      <div className="flex  justify-between py-4.5 items-center text-[#1e2b23]">
        <Link
          className="font-bold text-lg text-[#3a5c47] font-montserrat"
          href="/"
        >
          CafeZiq5
        </Link>
      </div>
      <div className="w-full h-auto justify-center flex bg-pink-300">
        <div className="bg-violet-300">
          <p className="text-3xl pb-10">Login</p>
          <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onReset={() => setAction("reset")}
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));

              setAction(`submit ${JSON.stringify(data)}`);
            }}
          >
            <Input
              isRequired
              errorMessage="Please enter a valid username"
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Enter your username"
              type="text"
            />

            <Input
              isRequired
              errorMessage="Please enter a valid email"
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <div className="flex gap-2">
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button type="reset" variant="flat">
                Reset
              </Button>
            </div>
            {action && (
              <div className="text-small text-default-500">
                Action: <code>{action}</code>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
