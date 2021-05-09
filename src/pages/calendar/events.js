import React, { useCallback } from 'react';
import EventForm from 'src/components/EventForm';
import { events as eventsNew } from 'src/components/eventsNew';
import { CalendarTable } from 'src/components/CalendarTable';
import { Divider } from 'antd';

const initialValues = {
  eventStartDate: '',
  eventStartTime: '',
  eventEndDate: '',
  eventPlace: '',
  eventName: '',
  eventDescription: '',
  eventLink: '',
  eventRole: '',
};

export default function Events() {
  const editEvent = useCallback((id) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);

  const removeEvent = useCallback((id) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);
  return (
    <>
      <EventForm
        initialValues={initialValues}
      />

      <Divider />

      <CalendarTable
        eventsByYears={eventsNew}
        isEdited
        editEvent={editEvent}
        removeEvent={removeEvent}
      />
    </>
  );
}
