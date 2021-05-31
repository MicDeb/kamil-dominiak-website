import React, {
  useCallback, useContext, useState, useEffect,
} from 'react';
import axios from 'axios';
import { UserContext } from 'src/helpers/userContext';
import EventForm from 'src/components/EventForm';
import { events as eventsNew } from 'src/components/eventsNew';
import { CalendarTable } from 'src/components/CalendarTable';
import { Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Modal } from 'src/components/modal/Modal';

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
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState(null);
  const user = useContext(UserContext);
  const {
    Title,
  } = Typography;
  const { t } = useTranslation();

  useEffect(() => {
    if (loading && !user) return;
    if (!events) {
      axios('/api/get-events').then((result) => {
        if (result.status !== 200) {
          setError(true);
          return;
        }
        setEvents(result.data?.events);
        setLoading(false);
      });
    }
  }, [events, user, loading]);

  const toggleModal = () => setOpenEditModal((prevOpen) => !prevOpen);

  const editEvent = useCallback(() => {
    toggleModal();
  }, []);

  const handleAddEvent = useCallback((formValues) => {
    const addValues = {
      ...formValues,
      eventStartDate: formValues.eventEndDate.format('YYYY-MM-DD'),
      eventStartTime: formValues.eventEndDate.format('HH:mm'),
      eventEndDate: formValues.eventEndDate.format('YYYY-MM-DD'),
    };
    // eslint-disable-next-line no-console
    console.log('formValues', addValues);

    setLoading(true);
    axios.post('/api/create-event', addValues)
      .then((result) => {
        if (result.status !== 200) {
          setError(true);
          return;
        }
        setEvents(result.data?.events);
        setLoading(false);
      });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleEditEvent = useCallback((formValues) => {
    // eslint-disable-next-line no-console
    console.log('formValues', formValues);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleRemoveEvent = useCallback((eventId) => {
    // eslint-disable-next-line no-console
    console.log('eventId', eventId);
  }, []);

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
          handleSubmit={handleAddEvent}
        />

        <Divider />

        {!error && (
          <CalendarTable
            eventsByYears={eventsNew}
            events={events || []}
            isEdited
            editEvent={editEvent}
            removeEvent={handleRemoveEvent}
          />
        )}

        <Modal
          isModalVisible={openEditModal}
          handleOk={toggleModal}
          handleCancel={toggleModal}
        >
          <EventForm
            initialValues={initialValues}
            handleSubmit={handleAddEvent}
          />
        </Modal>
      </>
    )
  );
}
