"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsFloating(scrollPosition > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Card className={`w-full border-b-transparent transition-all duration-300 ${
      isFloating ? "fixed top-0 left-0 right-0 z-50 shadow-md bg-opacity-90 backdrop-blur-sm" : ""
    }`}>
      <CardContent className="flex justify-between items-center p-4">
        <div className="logo">
          <span className="text-2xl font-light">
            Atomi<span className="font-bold">City</span>
          </span>
          {/* <span className=" text-xs underline font-light ">
            admin @ Atomi<span className="font-bold">City</span>
          </span> */}
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Events
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-full p-6 lg:w-[500px] rounded-md shadow-lg bg-white">
                  <div className="flex items-center justify-between space-x-4 p-4 bg-gradient-to-b from-muted/50 to-muted rounded-md">
                    <div className="flex flex-col items-center text-center">
                      <Image 
                        src='/imgs/atomicity_logo.png'
                        height={60}
                        width={60}
                        alt="logo"
                        className="mb-3"
                      />
                      <div className="text-lg text-gray-800">
                        Atomi<span className="font-bold">City</span>
                        <span className="block italic font-light text-sm text-gray-500">
                          @Admin
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center text-left">
                      <p className="text-md leading-snug font-extralight text-gray-700">
                        Join as an admin and shape the future of event management! Lead teams, manage events, and create impactful experiences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Link href='https://admin.atomicity.vercel.app/' className=" w-full" target="_blank">
                      <Button className="w-full ">
                        Apply for Admin
                      </Button>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="auth-btns flex gap-x-3">
          <ClerkLoaded>
            <SignedOut>
              <Button variant="ghost" className="text-primary">
                <SignInButton mode="modal" fallbackRedirectUrl={'/events'}/>
              </Button>
              <Button variant="default">
                <SignUpButton mode="modal" fallbackRedirectUrl={'/settings/user/complete-signin'}/>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </ClerkLoaded>
          <ClerkLoading>
            <Button variant="ghost" disabled>
              Sign in
            </Button>
            <Button variant="default" disabled>
              Sign up
            </Button>
          </ClerkLoading>
        </div>
      </CardContent>
    </Card>
  );
};

export default Navbar;