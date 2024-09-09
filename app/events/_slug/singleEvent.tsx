"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation"; // Import for handling not found pages

// const event = {
//   _id: "66d0165246303cad142ea872",
//   title: "Rare",
//   subtitle: "By Vyom Padalia",
//   description: "Most epic design challenge, with new variants",
//   date: "2024-09-15T00:00:00.000Z",
//   location: "Nirma University Auditorium, Ahmedabad",
//   time: "10:00 AM - 1:00 PM",
//   fees: 200,
//   noOfParticipants: 150,
//   coverImg: "https://example.com/images/cubix_cover.jpg",
//   detailImg: "https://example.com/images/cubix_detail.jpg",
//   supportFile: "https://example.com/files/rules_and_guidelines.pdf",
//   visibility: true,
//   isAvailableToReg: true,
//   owner: "64e3c27f0e9b0c0012345678",
//   __v: 0,
// };

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

const images = ["/imgs/img1.jpg", "/imgs/img2.jpg", "/imgs/img3.jpg"];

const stages = [
  {
    date: "10 Aug 24",
    title: "Level 1.1: E-Commerce & Tech Quiz",
    description:
      "The Quiz will take place in three slots - 10th, 11th, and 12th of August. Participants will receive an email about their respective quiz date and time slot. Every participant will get a set of questions to be answered within 30 minutes. A team will be scored based on the average marks of all team members attempting the quiz round. Please note that it is mandatory for all team members to take the quiz. The quiz will be based on E-Commerce trivia (Reference: https://stories.flipkart.com) and Tech (Technology Awareness + Techstack & Computer Science Fundamentals).",
    start: "10 Aug 24, 12:00 PM IST",
    end: "12 Aug 24, 08:00 PM IST",
  },
  {
    date: "16 Aug 24",
    title: "Level 1.2: Qualifier Quiz",
    description:
      "All the qualifying teams from Level 1.1 will move to Level 1.2. Every participant will get a set of questions to be answered within 30 minutes. Participants will be scored based on Accuracy, Speed & Start Time. Please note that it is mandatory for all team members to take the Assessment. A team will be scored based on the average marks of all team members attempting the assessment. The Assessment will be based on E-Commerce trivia (Reference: https://stories.flipkart.com) and Tech (Technology Awareness + Techstack & Computer Science Fundamentals).",
    start: "16 Aug 24, 12:00 PM IST",
    end: "16 Aug 24, 08:00 PM IST",
  },
];

const details = [
  {
    title: "Eligibility & Team Rules",
    content:
      "This competition is open to students pursuing B.Tech/B.E./M.Tech/M.S or related Engineering Programs across ALL Engineering Colleges in India (Batch 2025,2026, 2027 & 2028). Students must register in teams of 1 to 3 members. Cross-Specialization teams are eligible. Teams can form across different academic years. Cross-campus teams are allowed. The batch of 2024 is not eligible to participate in this competition. The participating students can be from any specialization. One person cannot be a member of more than one team. Any deviation from the above will result in immediate disqualification of the entire team.",
  },
  {
    title: "Stages",
    content: `The Software Development Track will have 3 elimination levels to test your technical, analytical, and ideation skills before the National Finale where the Finalists will get to present their solutions to the Panel of Domain Experts at Flipkart.

    Level 1 - E-Commerce & Tech Quiz: All registered teams will have to take an online quiz. It is mandatory for all team members to attempt the quiz round. A team will be scored based on the average marks of the team members attempting the quiz round. All teams will be taking this quiz simultaneously during the quiz window. Every participant will be ranked on Accuracy + Speed (Time Taken) + Start Time i.e., if two teams have the same score, then the team that started and finished earlier will be ranked higher. Participating teams will move on to the next level based on their performance in this assessment. It will be based on E-Commerce Trivia (Reference: https://stories.flipkart.com) and Tech (Technology Awareness + Techstack & Computer Science Fundamentals).

    Level 2 - Submission Round: Shortlisted teams from Level 1 will have to participate in Level 2. Teams will have to submit solutions for their preferred problem statement. You'll be able to make submissions until the deadline for this level anytime during the challenge window. Participating teams in this level will move on to the next level based on their performance.

    Level 3 - Video Submission Round: Shortlisted teams will need to submit a video demonstration of their proposed solution.

    The National Finale: In the final level of the GRiD, finalists will be invited to showcase their solutions to the panel of domain experts at Flipkart.`,
  },
  {
    title: "Prizes and Rewards",
    content: `Attractive prizes to be won along with the opportunity to be a part of the hiring process for Tech Internships & Full-Time Roles (Internship Stipend: INR 1,00,000 per month; SDE-1 Role Compensation: INR 32 LPA).

    Winners get EGVs worth INR 1,00,000*.
    First Runners-Up Get EGVs worth INR 75,000*.
    Certificate of merit will be provided to the following: Level 1 qualifying teams, Finalists.

    Career Opportunities: Top teams who qualify for level 2 will get a chance to be a part of the hiring process for Internship and full-time tech roles at Flipkart. Teams who reach the finale get a PPI for a software tech role (Internship/full-time).`,
  },
];

const SingleEvent: React.FC = () => {
  const [eventData, setEventData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  console.log(pathname);
  const eventId = pathname.split("/").pop();
  console.log("slug: ", eventId);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`/api/event/${eventId}`);
        const data = await response.json();
        console.log("Data: ", data.data[0]);

        if (data.success) {
          setEventData(data.data[0]);
        } else {
          setError("Failed to load events");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const handleRegister = async (string: eventId) => {
    const userID = "user123";

    try {
      const url = `http://localhost:3000/api/event/register/${eventId}`;

      const requestBody = {
        "eventID": eventId,
        "userID": userID,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.status) {
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed:");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!eventData) {
    return <p>No event data available</p>;
  }

  return (
    <div className="container py-6 px-6">
      {/* Carousel Section */}
      <Carousel className=" mx-10">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt={`Event image ${index + 1}`}
                className="w-full h-60 object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </CarouselPrevious>
        <CarouselNext>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </CarouselNext>
      </Carousel>

      {/* Content Below Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          {/* Event Title and Details */}
          <h1 className="text-3xl font-bold">{eventData.title}</h1>
          <p className="text-lg text-gray-600">{eventData.subtitle}</p>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="flex items-center text-gray-600 mb-2">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{eventData.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{eventData.time}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{new Date(eventData.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-4">
            <p>{eventData.description}</p>
          </div>

          {/* Register Button */}
          {eventData.isAvailableToReg && (
            <div className="mt-6">
              {/* <Link href={`/register/${eventData._id}`}> */}
                <Button
                  className="w-full flex justify-center items-center text-white bg-black hover:bg-purple-700"
                  onClick={() => handleRegister(eventData._id)}
                >
                  Register Now
                </Button>
              {/* </Link> */}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Details about the event fees and participants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <DollarSignIcon className="h-5 w-5 mr-2" />
                <span>₹{eventData.fees}</span>
              </div>
              <div className="flex items-center mb-4">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>Registered: {eventData.noOfParticipants}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={eventData.supportFile}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Rules and Guidelines
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Stages & Timeline</h2>
        <Timeline>
          {stages.map((stage, index) => (
            <TimelineItem
              key={index}
              date={stage.date}
              title={stage.title}
              description={stage.description}
              start={stage.start}
              end={stage.end}
            />
          ))}
        </Timeline>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Details</h2>
        <Accordion type="single" collapsible>
          {details.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SingleEvent;

// interface Event {
//   _id: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   date: string;
//   location: string;
//   time: string;
//   fees: number;
//   noOfParticipants: number;
//   coverImg: string;
//   detailImg: string;
//   supportFile: string;
//   visibility: boolean;
//   isAvailableToReg: boolean;
// }

// const SingleEvent: React.FC<{ params: { slug: string } }> = (params) => {

//   const [eventData, setEventData] = useState<Event>();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   // const eventId = "66d147b4714591afca141db9";
//   const pathname = usePathname();
//   console.log(pathname);
//   const eventId = pathname.split("/").pop();
//   // console.log("slug: ", slug);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await fetch(`/api/event/${eventId}`);
//         const data = await response.json();
//         console.log("Data: ",data.data[0])

//         if (data.success) {
//           setEventData(data.data[0]);
//         } else {
//           setError("Failed to load events");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!eventData) {
//     return <p>No event data available</p>;
//   }

//   return(
//     <div className="event-details">
//       <h1>{eventData.title}</h1>
//       <img src={eventData.coverImg} alt={eventData.title} className="cover-img" />
//       <p><strong>Date:</strong> {new Date(eventData.date).toLocaleDateString()}</p>
//       <p><strong>Time:</strong> {eventData.time}</p>
//       <p><strong>Location:</strong> {eventData.location}</p>
//       <p><strong>Description:</strong> {eventData.description}</p>
//       <p><strong>Subtitle:</strong> {eventData.subtitle}</p>
//       <p><strong>Fees:</strong> ₹{eventData.fees}</p>
//       <p><strong>Number of Participants:</strong> {eventData.noOfParticipants}</p>
//       <p><strong>Support File:</strong> <a href={eventData.supportFile} target="_blank" rel="noopener noreferrer">View Rules and Guidelines</a></p>
//       <img src={eventData.detailImg} alt={`${eventData.title} Details`} className="detail-img" />
//       {eventData.isAvailableToReg && <button>Register Now</button>}
//     </div>
//   )
// };

// export default SingleEvent;
