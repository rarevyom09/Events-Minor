// import Image from "next/image";

import EventList from "./_components/EventList";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import TestimonialSection from "./_components/TestimonialSection";

export default function Home() {
  return (
    <div className="main-home-page">
      <Navbar/>
      <Hero/>
      <EventList/>
      <TestimonialSection/>
    </div>
  );
}
