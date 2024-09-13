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