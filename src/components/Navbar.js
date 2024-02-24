import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Icon from "@/components/Icon"
import Image from "next/image";

export default function myNavbar() {
  return (
    <Navbar>
      <NavbarBrand>
      <Image src="/assets/logo-final.svg" width={30} height={30} className="ml-2"/>
        <p className="font-bold text-inherit">رویا.<span className="text-primary-400">آ</span>.یی</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/create">
            <Icon name="palette"/>
           رویاباف
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/gallery" aria-current="page">
            <Icon name="rectangles-mixed" />
            گالری
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/profile">
            <Icon name="square-user" />
            پروفایل
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">ورود</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            ثبت‌نام
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
