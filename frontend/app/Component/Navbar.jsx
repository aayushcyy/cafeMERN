import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

export default function MyNavbar() {
  return (
    <div className="w-full flex justify-center pt-5">
      <Navbar
        shouldHideOnScroll
        className="flex  justify-between py-3 items-center text-[#1e2b23] shadow-[0_0_15px_3px_rgba(0,0,0,0.1)] bg-[#ffffffba] px-8 rounded-xl w-[85%]"
      >
        <NavbarBrand className="w-[25%]">
          <p className="font-bold text-lg text-[#3a5c47]">CafeZiq5</p>
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
              href="#"
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
