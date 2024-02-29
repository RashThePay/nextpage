import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Icon from "@/components/Icon"
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"



export default function RoyaNavbar() {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: session } = useSession()
  return (
    <Navbar>
      <NavbarBrand>
      <Link href="/">
      <Image src="/assets/logo-final.svg" width={30} height={30} alt="logo" className="ml-2"/>
        <p className="font-bold text-default-foreground">رویا.<span className="text-primary-700">آ</span>.یی</p>
      </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem> 
          <Link color={(currentPath=="/create") ? 'primary' : 'foreground'} href="/create">
            <Icon name="sparkles"/>
           رویاباف
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color={(currentPath=="/gallery") ? 'primary' : 'foreground'} href="/gallery">
            <Icon name="rectangles-mixed" />
            گالری
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color={(currentPath=="/profile") ? 'primary' : 'foreground'} href="/profile">
            <Icon name="square-user" />
            پروفایل
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {
          session ? (<>
            <Link className="mx-2" variant="faded" onClick={()=>signOut({redirect: false, callbackUrl: "/"})}>خروج</Link>
          <Button as={Link} color="primary" href="/profile" variant="flat">
          {session.user.name}
        </Button>
        </>): (<Button as={Link} color="primary" onClick={signIn} variant="flat">
          ورود
        </Button>)
          }
          
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
