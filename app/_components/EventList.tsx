import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const events = [
  { id: 1, name: 'Event One', date: '2024-09-01', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', imgSrc: '/imgs/img1.jpg' },
  { id: 2, name: 'Event Two', date: '2024-09-05', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', imgSrc: '/imgs/img2.jpg' },
  { id: 3, name: 'Event Three', date: '2024-09-10', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', imgSrc: '/imgs/img3.jpg' },
];

const EventList = () => {
  return (
    <section id="events" className="flex py-6 w-2/3 items-center justify-center ml-auto mr-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
        <Carousel>
          <CarouselContent>
            {events.map(event => (
              <CarouselItem key={event.id} className="relative h-56 sm:h-64 lg:h-72 xl:h-80">
                <div className="relative w-full h-full">
                  <Image
                    src={event.imgSrc}
                    alt={event.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full rounded-b-lg flex justify-between items-center">
                    <div className='w-1/2'>
                      <h3 className="text-3xl font-semibold">{event.name}</h3>
                      <p className="text-gray-300 text-sm">{event.date}</p>
                    </div>

                    <div className='w-1/2'>
                      <p className=' font-serif text-sm text-justify'>{event.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default EventList;
