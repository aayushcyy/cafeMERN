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
    <Navbar
      shouldHideOnScroll
      className="flex w-full justify-between py-3 items-center"
    >
      <NavbarBrand>
        <p className="font-bold text-inherit text-lg">CafeZiq5</p>
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

      <NavbarContent justify="end" className="gap-16">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="bg-orange-500 px-4 py-1.5 cursor-pointer text-white rounded-lg"
            variant="shadow"
          >
            Book
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
