"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event');
        const data = await response.json();

        if (data.success) {
          setEvents(data.data);
        } else {
          setError('Failed to load events');
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
          {events.map(event => (
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
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()} <br />
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
                    <Button className="mt-4 w-full">
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
