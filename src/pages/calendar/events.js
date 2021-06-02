import React, {
  useCallback, useContext, useState, useEffect,
} from 'react';
import axios from 'axios';
import { UserContext } from 'src/helpers/userContext';
import EventForm from 'src/components/EventForm';
import { events as eventsNew } from 'src/components/eventsNew';
import { CalendarTable } from 'src/components/CalendarTable';
import { Divider, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Modal } from 'src/components/modal/Modal';
import Error from 'src/components/Error';

const toastSuccess = ({ msg }) => {
  message.success(msg);
};

const toastError = ({ msg }) => {
  message.error(msg);
};

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
      axios('/api/get-events')
        .then((result) => {
          setEvents(result.data?.events);
          setLoading(false);
          setError(false);
        })
        .catch(() => {
          toastError({
            msg: 'Wystąpił błąd. Nie udało się pobrać wydarzeń',
          });
          setError(true);
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

    setLoading(true);
    axios.post('/api/create-event', addValues)
      .then((result) => {
        toastSuccess({
          msg: 'Dodano wydarzenie',
        });
        setEvents(result.data?.events);
        setLoading(false);
      })
      .catch(() => {
        toastError({
          msg: 'Wystąpił błąd. Nie udało się dodać wydarzenia',
        });
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
      error
        ? <Error />
        : (
          <>
            <EventForm
              initialValues={initialValues}
              handleSubmit={handleAddEvent}
            />

            <Divider />

            <CalendarTable
              eventsByYears={eventsNew}
              events={events || []}
              isEdited
              editEvent={editEvent}
              removeEvent={handleRemoveEvent}
            />

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
    )
  );
}
