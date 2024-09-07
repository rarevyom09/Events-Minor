"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation'; // Import for handling not found pages
import { usePathname } from 'next/navigation'

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


const SingleEvent: React.FC<{ params: { slug: string } }> = (params) => {

  const [eventData, setEventData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const eventId = "66d147b4714591afca141db9";
  const pathname = usePathname();
  console.log(pathname);
  const eventId = pathname.split("/").pop();
  // console.log("slug: ", slug);

  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`/api/event/${eventId}`);
        const data = await response.json();
        console.log("Data: ",data.data[0])

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!eventData) {
    return <p>No event data available</p>;
  }


  return(
    <div className="event-details">
      <h1>{eventData.title}</h1>
      <img src={eventData.coverImg} alt={eventData.title} className="cover-img" />
      <p><strong>Date:</strong> {new Date(eventData.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {eventData.time}</p>
      <p><strong>Location:</strong> {eventData.location}</p>
      <p><strong>Description:</strong> {eventData.description}</p>
      <p><strong>Subtitle:</strong> {eventData.subtitle}</p>
      <p><strong>Fees:</strong> ₹{eventData.fees}</p>
      <p><strong>Number of Participants:</strong> {eventData.noOfParticipants}</p>
      <p><strong>Support File:</strong> <a href={eventData.supportFile} target="_blank" rel="noopener noreferrer">View Rules and Guidelines</a></p>
      <img src={eventData.detailImg} alt={`${eventData.title} Details`} className="detail-img" />
      {eventData.isAvailableToReg && <button>Register Now</button>}
    </div>
  )
};

export default SingleEvent;
