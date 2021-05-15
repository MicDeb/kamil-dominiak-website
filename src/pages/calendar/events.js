import React, { useCallback, useContext } from 'react';
import { UserContext } from 'src/helpers/userContext';
import EventForm from 'src/components/EventForm';
import { events as eventsNew } from 'src/components/eventsNew';
import { CalendarTable } from 'src/components/CalendarTable';
import { Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

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
  const user = useContext(UserContext);

  // eslint-disable-next-line no-console
  console.log('user', user);

  const editEvent = useCallback((id) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);

  const removeEvent = useCallback((id) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);

  const {
    Title,
  } = Typography;

  const { t } = useTranslation();

  return (
    !user ? (
      <Typography>
        <Title level={3}>
          {t('calendar.log_in_to_add_events')}
        </Title>
      </Typography>
    ) : (
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
    )
  );
}
