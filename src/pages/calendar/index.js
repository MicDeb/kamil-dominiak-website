import React from 'react';
import { CalendarTable } from 'src/components/CalendarTable';
import { events } from 'src/components/eventsNew';

export default function Calendar() {
  return (
    <section className='section'>
      <h1>Calendar</h1>
      <CalendarTable
        eventsByYears={events}
      />
    </section>
  );
}
