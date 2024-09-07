// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   CalendarIcon,
//   MapPinIcon,
//   ClockIcon,
//   DollarSignIcon,
//   UserIcon,
//   ArrowRightIcon,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// interface Event {
//   _id: string;
//   title: string;
//   subtitle: string;
//   date: string;
//   description:string;
//   location: string;
//   time: string;
//   fees: number;
//   noOfParticipants: number;
//   coverImg: string;
//   isAvailableToReg: boolean;
// }

// const EventsPage: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("/api/event");
//         const data = await response.json();

//         if (data.success) {
//           setEvents(data.data);
//         } else {
//           setError("Failed to load events");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading) {
//     return (
//       <section id="events" className="py-6">
//         <div className="container mx-auto px-4">
//           <Skeleton className="h-10 w-3/4 mb-6 mx-auto" />
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//             {[...Array(8)].map((_, index) => (
//               <Skeleton key={index} className="h-40 w-full rounded-lg" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <section id="events" className="py-6">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold mb-8 text-center text-purple-500">
//           Upcoming Events
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           {events.map((event) => (
//             <Card
//               key={event._id}
//               className="shadow-xl relative overflow-hidden group transform hover:scale-105 transition-transform duration-300 flex flex-col"
//             >
//               <CardHeader className="relative p-0"> {/* Remove padding */}
//                 <Image
//                   src="/imgs/img2.jpg"
//                   alt="Event Image"
//                   className="h-32 w-full object-cover" // Edge-to-edge
//                   width={200}
//                   height={100}
//                 />
//                 <div className="absolute -top-2 bg-purple-200 bg-opacity-80 rounded-br-2xl p-1 z-50 flex items-center">
//                   <CalendarIcon className="text-purple-500 h-4 w-4 mr-1" />
//                   <span className="text-xs text-purple-500 font-semibold">
//                     {new Date(event.date).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-2">
//                   <p className="text-white text-xs font-semibold">
//                     {event.description}
//                   </p>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-2 flex-grow flex flex-col justify-between">
//                 <div>
//                   <CardTitle className="text-sm text-gray-800">{event.title}</CardTitle>
//                   <CardDescription className="text-xs">{event.subtitle}</CardDescription>
//                   <div className="flex justify-between items-center text-gray-600 text-xs mt-2">
//                     <div className="flex items-center">
//                       <MapPinIcon className="h-4 w-4 mr-1 text-purple-500" />
//                       {event.location}
//                     </div>
//                     <div className="flex items-center">
//                       <ClockIcon className="h-4 w-4 mr-1 text-purple-500" />
//                       {event.time}
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-2">
//                     <div className="flex items-center space-x-2">
//                       <div className="bg-purple-500 text-white px-2 py-1 rounded-full flex items-center">
//                         <DollarSignIcon className="h-3 w-3 mr-1" />
//                         <span className="text-xs">₹{event.fees}</span>
//                       </div>

//                       <div className="bg-purple-500 text-white px-2 py-1 rounded-full flex items-center">
//                         <UserIcon className="h-3 w-3 mr-1" />
//                         <span className="text-xs">{event.noOfParticipants}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {event.isAvailableToReg && (
//                   <Link 
//                     href={/events/${event._id}} 
//                     className="mt-3 w-full flex justify-center items-center text-white bg-black hover:bg-purple-700 px-4 py-2 rounded"
//                   >
//                     Register Now
//                     <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 transform hover:translate-x-1" />
//                   </Link>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventsPage;
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

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
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

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

  const handleRegisterClick = (eventId: string) => {
    // Navigate to the event registration page
    console.log("clicked with id: ",eventId);
    // redirect("ok");
    // redirect(`/${eventId}`);
    router.push(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <section id="events" className="py-6">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-3/4 mb-6 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="events" className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="shadow-lg">
              <CardHeader>
                <img
                  src={event.coverImg}
                  alt={event.title}
                  className="rounded-t-lg h-48 w-full object-cover"
                />
                <CardTitle className="mt-4">{event.title}</CardTitle>
                <CardDescription>{event.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{event.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()} <br />
                    <strong>Location:</strong> {event.location} <br />
                    <strong>Time:</strong> {event.time} <br />
                    <strong>Fees:</strong> ₹{event.fees} <br />
                    <strong>Participants:</strong> {event.noOfParticipants}
                  </p>
                  <a
                    href={event.supportFile}
                    className="text-blue-500 mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Rules and Guidelines
                  </a>
                  {event.isAvailableToReg && (
                    <Button
                      className="mt-4 w-full"
                      onClick={() => handleRegisterClick(event._id)}
                    >
                      Register Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
