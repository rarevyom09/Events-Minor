import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <section id="home" className="bg-purple-200 py-20 rounded-b-full">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          Welcome to Our Event Management System
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Manage all your events efficiently and effectively with our platform.
        </p>
        <Button size="lg" className="px-8 py-3">
          <Link href='/events'>View Events</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
