/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import IdentityModal, { useIdentityContext }
  from "react-netlify-identity-widget";

import "react-netlify-identity-widget/styles.css";
import { CalendarTable } from 'src/components/CalendarTable';
import { events as eventsNew } from 'src/components/eventsNew';

export default function Calendar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState(null);

  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);
  const name =
    (identity && identity.user && identity.user.user_metadata &&
     identity.user.user_metadata.full_name) || "Untitled";
  const isLoggedIn = identity && identity.isLoggedIn;

  useEffect(() => {
    if (!loading) return;
    axios('/api/get-events').then((result) => {
      if (result.status !== 200) {
        setError(true)
        return;
      }
      setEvents(result.data.events);
      setLoading(false);
    });
  }, []);

  console.log('events', events);

  return (
    <section className='section'>
      <CalendarTable
        eventsByYears={eventsNew}
      />

      {
        identity && identity.isLoggedIn ? (
          <div className="auth-btn-grp">
            <button
              onClick={handleShow}>Create Testimonial
            </button>
            { ' '}
            <button
              className="login-btn"
              onClick={() => setDialog(true)}>
              {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
            </button>
          </div>
        ) : (
          <div className="auth-btn-grp">
            <button
              className="login-btn"
              onClick={() => setDialog(true)}>
              {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
            </button>
          </div>
        )
      }

      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
      />

    </section>
  );
}
