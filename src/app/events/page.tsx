import React from 'react';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import EventsComponent from '../../../components/home/events/events';

const EventsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen pt-20">
        <h1 className="text-4xl font-bold text-center mb-8">Events</h1>
        <EventsComponent />
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
