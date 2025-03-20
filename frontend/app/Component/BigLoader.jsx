import React from "react";

export default function BigLoader() {
  return (
    <div className="w-full h-screen absolute bg-[#ffffff8f] left-0 z-[999]">
      <span className="loader2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]"></span>
    </div>
  );
}
