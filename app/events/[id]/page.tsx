"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  DownloadIcon,
  EyeIcon,
  ShareIcon,
  HeartIcon,
  CircleUserIcon,
  StarIcon,
  ArrowLeftIcon,
  CheckIcon,
  CopyIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toast } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';

interface Event {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  time: string;
  fees: number;
  noOfParticipants: number;
  coverImg: string;
  detailImg: string;
  supportFile: string;
  visibility: boolean;
  isAvailableToReg: boolean;
  views: number;
  recentRegistrations: { name: string; avatar: string }[];
}

const event: Event = {
  _id: "66d0165246303cad142ea872",
  title: "Nirma University Garba Mahotsav",
  subtitle: "Garba Night",
  description: "Join us for a night of traditional Garba dancing and festivities!",
  date: "2024-09-15T00:00:00.000Z",
  location: "Dome Ground, Nirma University, Ahmedabad",
  time: "7:00 PM Onwards",
  fees: 200,
  noOfParticipants: 1500,
  coverImg: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  detailImg: "/imgs/img5.jpg",
  supportFile: "https://example.com/files/rules_and_guidelines.pdf",
  visibility: true,
  isAvailableToReg: true,
  views: 4520,
  recentRegistrations: [
    { name: "John Doe", avatar: "https://github.com/shadcn.png" },
    { name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
    { name: "Alice Johnson", avatar: "https://github.com/shadcn.png" },
    { name: "Bob Brown", avatar: "https://github.com/shadcn.png" },
    { name: "Charlie Davis", avatar: "https://github.com/shadcn.png" },
  ],
};

const ShareCard: React.FC<{ event: Event }> = ({ event }) => {
  const [copied, setCopied] = useState(false);
  const eventUrl = `https://atomicity.vercel.app/events/${event._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(eventUrl).then(() => {
      setCopied(true);
      toast({
        title: "URL Copied",
        description: "Event link has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-[300px]">
      <CardHeader className="p-0">
        <Image
          src={event.coverImg}
          alt={event.title}
          width={300}
          height={150}
          className="w-full h-[150px] object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm mb-2">Share this event:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={eventUrl}
              readOnly
              className="flex-1 px-2 py-1 text-sm border rounded"
            />
            <Button size="sm" onClick={copyToClipboard}>
              {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EventPage: React.FC = () => {
  const [showTicketBanner, setShowTicketBanner] = useState(false);
  const [isDrawerOpen,setIsDrawerOpen] = useState(false);
  const coverImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (coverImageRef.current) {
        const rect = coverImageRef.current.getBoundingClientRect();
        const threshold = window.innerHeight * 0.4; // 20% of viewport height
        setShowTicketBanner(rect.bottom <= threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegister = () => {
    setIsDrawerOpen(true);
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Sticky Ticket Banner */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out ${
          showTicketBanner ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/events">
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <Image
              src="/imgs/logo.png"
              alt="Rare Vyom Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">Nirma University Garba Mahotsav</h2>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>7-11 Oct, 2024</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="flex items-center">
              <StarIcon className="h-4 w-4 mr-1" />
              I am Interested
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <ShareIcon className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button className="bg-black hover:bg-purple-800 text-white" onClick={handleRegister}>
              Register Now
            </Button>
          </div>
        </div>
      </div>

      {/* Top Section with Image and Main Details */}
      <div className="relative mb-8" ref={coverImageRef}>
        <Image
          src={event.coverImg}
          alt={event.title}
          width={1200}
          height={600}
          className="w-full h-[600px] object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-lg" />
        <Link href="/events">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 bg-white/85 hover:bg-white/100 text-black"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Events
          </Button>
        </Link>
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-white text-6xl font-bold mb-2">{event.title}</h1>
          <p className="text-white text-2xl mb-4">{event.subtitle}</p>
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Event Details */}
        <div className="col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="organizer">Organizer</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About the Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-purple-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                      <span>Capacity: {event.noOfParticipants}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="organizer">
              <Card>
                <CardHeader>
                  <CardTitle>Organizer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/imgs/logo.png" alt="Organizer" />
                      <AvatarFallback>NU</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">Rare Society of Cultural Events</h3>
                      <p className="text-sm text-gray-500">Event Organizer</p>
                    </div>
                  </div>
                  <p className="mt-4">
                    Rare Society is committed to providing high-quality education and memorable experiences for students.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Additional Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Dress Code</span>
                  <Badge>Traditional Garba Attire</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Age Restriction</span>
                  <Badge variant="outline">All Ages Welcome</Badge>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rules and Guidelines</h3>
                  <a
                    href={event.supportFile}
                    className="flex items-center text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon className="h-5 w-5 mr-2" />
                    Download Rules and Guidelines
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Registration and Stats */}
        <div className="space-y-8">
          {/* Registration Card */}
          <Card className="bg-purple-50">
            <CardHeader>
              <CardTitle>Register for the Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Registration Fee</span>
                  <span className="font-bold">₹{event.fees}</span>
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-700" onClick={handleRegister}>
                  Register Now
                </Button>
                <div className="text-center text-sm text-gray-500">
                  {event.noOfParticipants} people are attending
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Event Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <EyeIcon className="h-5 w-5 mr-2 text-purple-600" />
                    <span>Views</span>
                  </div>
                  <span className="font-bold">{event.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                    <span>Attendees</span>
                  </div>
                  <span className="font-bold">{event.noOfParticipants}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap -space-x-4">
                {event.recentRegistrations.map((user, index) => (
                  <Avatar key={index} className="h-10 w-10 border-2 border-white rounded-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Share and Favorite */}
          <div className="flex space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <ShareIcon className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ShareCard event={event} />
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="flex-1">
              <HeartIcon className="h-5 w-5 mr-2" />
              Favorite
            </Button>
          </div>

          {/* Drawer for Fancy Ticket Booking */}
          <Sheet open={isDrawerOpen} onOpenChange={handleCloseDrawer}>
            <SheetContent className="bg-white p-8 rounded-t-3xl items-center" side="bottom">
              <SheetHeader className="flex items-center justify-between">
                <SheetTitle className='mx-auto'>Your Ticket Details</SheetTitle>
                  <SheetClose onClick={handleCloseDrawer} className="cursor-pointer"/>
              </SheetHeader>
              <div className="flex flex-col items-center p-2">
                <div className="flex items-center gap-4 mb-4 bg-white text-black p-6 rounded-lg border-[1px] border-black w-full text-center">
                  <div>
                    <Image
                      src={event.coverImg}
                      height={200}
                      width={250}
                      alt='cover img'
                      className="rounded-lg"
                    />
                  </div>
                  <div className='text-justify'>
                    <h2 className="text-2xl font-bold mb-2">Nirma University Garba Mahotsav</h2>
                    <p>Garba Night | 15th October 2024 | 7:00 PM</p>
                    <p>Dome Ground, Nirma University</p>
                    <p className="mt-4">Ticket Price: ₹{event.fees}</p>
                  </div>
                </div>
                <Button
                  className="bg-purple-500 hover:bg-purple-800 w-full text-white py-3 text-lg"
                >
                  Bang On !!
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
