import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { toastMsgs } from 'src/helpers/toastMsgs';
import { CalendarTable } from 'src/components/CalendarTable';
import Error from 'src/components/Error';

const toastError = ({ msg }) => {
  message.error(msg);
};

export default function Calendar() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getEvents = useCallback(() => (
    axios('/api/get-events')
      .then((result) => {
        setEvents(result.data?.events);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        toastError({
          msg: toastMsgs.events.getError,
        });
        setError(true);
      })
  ), []);

  useEffect(() => {
    if (!events) {
      getEvents();
    }
  }, [events, loading, getEvents]);

  return (
    <section className='section'>
      {error
        ? <Error />
        : (
          <CalendarTable
            events={events || []}
          />
        )}
    </section>
  );
}
