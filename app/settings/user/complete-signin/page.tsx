"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Fetch Clerk user details
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from 'lucide-react';

const CompleteSignIn = () => {
  const { user } = useUser();
  const router = useRouter();

  // State to store form details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    mobileNo: '',
  });

  // UseEffect to update formData once the user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.fullName || '',
        email: user?.emailAddresses[0]?.emailAddress || '',
        username: user?.username || '',
        mobileNo: '',
      });
    }
  }, [user]);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User Data:', formData);

    // Redirect to events page after submission
    router.push('/events');
  };

  return (
    <div className="w-full lg:grid lg:min-h-[300px] lg:grid-cols-2 xl:min-h-[300px]">
      {/* Left Column with the SignIn Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Complete Sign In</h1>
            <p className="text-muted-foreground">Fill in the details to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Name Field */}
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                disabled
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly
                className="mt-1 block w-full"
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className="mt-1 block w-full"
              />
            </div>

            {/* Username Field */}
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input
                disabled
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
                className="mt-1 block w-full"
              />
            </div>

            {/* Mobile Number Field */}
            <div className="grid gap-1">
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>

            {/* Proceed Button */}
            <Button type="submit" className="flex w-full mt-3 items-center">
                Proceed
                    <MoveRight className='ml-2'/>
            </Button>
          </form>

          {/* <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">Login</Link>
          </div> */}
        </div>
      </div>

      {/* Right Column with the Image */}
      <div className="hidden bg-muted lg:block">
        
        <span className='absolute text-white font-light text-9xl top-[40%] ml-5'>Atomi<span className=' font-bold'>City</span></span>
        <Image
          src="/imgs/img5.jpg" // Path to your image
          alt="Cover Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default CompleteSignIn;
