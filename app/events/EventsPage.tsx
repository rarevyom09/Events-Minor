<<<<<<< Updated upstream

"use client";

import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  UserIcon,
  ArrowRightIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
=======
"use client"

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
>>>>>>> Stashed changes
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, MapPinIcon, ClockIcon, DollarSignIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  _id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  location: string;
  time: string;
  fees: number;
  noOfParticipants: number;
  coverImg: string;
  isAvailableToReg: boolean;
  clubName: string;
  eventType: string;
}

const clubCategories = [
  "Popular",
  "Technical",
  "Cultural",
  "Sports",
  "Academic",
  "Social",
  "Professional",
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <Image
          src={"/imgs/garba.jpg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-semibold mb-1 truncate">{event.title}</h3>
          <p className="text-sm opacity-80 mb-2 truncate">{event.subtitle}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
              <ClockIcon className="w-3 h-3 mr-1" />
              {event.time}
            </span>
            <span className="flex items-center bg-white bg-opacity-20 rounded px-2 py-1">
              <MapPinIcon className="w-3 h-3 mr-1" />
              {event.location}
            </span>
          </div>
        </div>
      </CardContent>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt={event.clubName} />
              <AvatarFallback>{event.clubName}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{event.clubName || "Rare Society of Cultural Events"}</span>
          </div>
          <Badge variant="secondary">{event.eventType}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-sm text-black">
              <DollarSignIcon className="w-4 h-4 mr-1 text-purple-500" />
              ₹{event.fees}
            </span>
            <span className="flex items-center text-sm text-black">
              <UserIcon className="w-4 h-4 mr-1 text-purple-500" />
              {event.noOfParticipants}
            </span>
          </div>
          {event.isAvailableToReg ? (
            <Link href={`/events/${event._id}`}>
              <Button variant="outline" size="sm" className=" text-white bg-purple-500 hover:text-white hover:bg-purple-700">
                Book Now
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Closed
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event");
        const data = await response.json();

        if (data.success) {
          setEvents(data.data);
        } else {
          setError("Failed to load events");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
<<<<<<< Updated upstream
    
    <section id="events" className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-500">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <Card
              key={event._id}
              className="shadow-xl relative overflow-hidden group transform hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              <CardHeader className="relative p-0">
                <Image
                  src="/imgs/img2.jpg"
                  alt="Event Image"
                  className="h-32 w-full object-cover"
                  width={200}
                  height={100}
                />
                <div className="absolute -top-2 bg-purple-200 bg-opacity-80 rounded-br-2xl p-1 z-50 flex items-center">
                  <CalendarIcon className="text-purple-500 h-4 w-4 mr-1" />
                  <span className="text-xs text-purple-500 font-semibold">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-2">
                  <p className="text-white text-xs font-semibold">
                    {event.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-2 flex-grow flex flex-col justify-between">
                <div>
                  <CardTitle className="text-sm text-gray-800">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {event.subtitle}
                  </CardDescription>
                  <div className="flex justify-between items-center text-gray-600 text-xs mt-2">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1 text-purple-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1 text-purple-500" />
                      {event.time}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="bg-purple-500 text-white px-2 py-1 rounded-full flex items-center">
                        <DollarSignIcon className="h-3 w-3 mr-1" />
                        <span className="text-xs">₹{event.fees}</span>
                      </div>
                      <div className="bg-purple-500 text-white px-2 py-1 rounded-full flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          {event.noOfParticipants}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {event.isAvailableToReg && (
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-3 w-full flex justify-center items-center text-white bg-black hover:bg-purple-700 px-4 py-2 rounded"
                  >
                    Register Now
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 transform hover:translate-x-1" />
                  </Link>
                )}
              </CardContent>
            </Card>
=======
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">College Events in Gandhinagar</h1>
      
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {clubCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
>>>>>>> Stashed changes
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;