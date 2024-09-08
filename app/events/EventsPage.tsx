"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  UserIcon,
  PlusCircle,
  Radio,
  Clock,
  ListMusic,
  Music,
  User,
  BarChart2,
  Search,
  Home,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
          src={event.coverImg}
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
            <span className="text-sm font-medium">Rare Society of Cultural Events</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-sm text-muted-foreground">
              <DollarSignIcon className="w-4 h-4 mr-1" />
              ₹{event.fees}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <UserIcon className="w-4 h-4 mr-1" />
              {event.noOfParticipants}
            </span>
          </div>
          {event.isAvailableToReg ? (
            <Link href={`/events/${event._id}`}>
              <Button variant="outline" size="sm">
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
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className="w-64 border-r p-4 overflow-y-auto"
        style={{ height: "calc(100vh - 16px)" }}
      >
        <h2 className="text-xl font-semibold mb-4">College Events</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" /> Upcoming Events
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart2 className="mr-2 h-4 w-4" /> Browse
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Radio className="mr-2 h-4 w-4" /> Live Events
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">My Events</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <ListMusic className="mr-2 h-4 w-4" /> Registered
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Music className="mr-2 h-4 w-4" /> Favorites
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" /> My Club Events
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Categories</h3>
            <ul className="space-y-2">
              {clubCategories.map((category) => (
                <li key={category}>
                  <Button
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Tabs defaultValue="events">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="clubs">Clubs</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="pl-8"
                  type="text"
                  placeholder="Search events"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link href={'/'}>
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />Home
                </Button>
              </Link>
              <Link href={'/create'}>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className=" flex ml-5 text-3xl font-semibold">
          {selectedCategory}
        </div>
        <ScrollArea className="flex px-4 space-y-2 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default EventsPage;
