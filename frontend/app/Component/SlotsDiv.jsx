import { Card, CardBody } from "@heroui/react";

export default function SlotDiv({
  slot = "11AM - 12PM",
  price = "Rs.200",
  available = true,
}) {
  return (
    <div
      className={
        available
          ? "bg-white  border-[1px] border-[#1e2b2332] text-[#1e2b23] flex flex-col items-center w-96 rounded-lg gap-1 overflow-hidden cursor-pointer"
          : "bg-white border-[1px] border-[#1e2b2332]  text-[#1e2b23] flex flex-col items-center w-96 rounded-lg gap-1 overflow-hidden cursor-none"
      }
    >
      <div className="flex items-center gap-13 px-2 w-full text-sm pt-0.5">
        <p className="w-28">{slot}</p>
        <p className="mr-6">{price}</p>
        <p>{available ? "Available" : "NA"}</p>
      </div>
      <div
        className={
          available
            ? "bg-green-400 w-full text-center text-[8px] font-semibold leading-0.55"
            : "bg-red-500 w-full text-center text-[8px] font-semibold"
        }
      >
        {available ? "Click to book" : "Not Available"}
      </div>
    </div>
  );
}
