import React, { useCallback, useEffect } from 'react';
import EventForm from 'src/components/EventForm';
import { events as eventsNew } from 'src/components/eventsNew';
import { CalendarTable } from 'src/components/CalendarTable';
import { Divider } from 'antd';
import netlifyIdentity from 'netlify-identity-widget';

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
  useEffect(() => {
    netlifyIdentity.init({});
  }, []);
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
      <button
        type='button'
        className='login-btn'
        onClick={() => netlifyIdentity.open()}
      >
        LOG IN
      </button>

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
