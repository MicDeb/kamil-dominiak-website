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
import { confirmModal } from 'src/components/modal/confirmModal';
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

  useEffect(() => {
    if (loading && !user) return;
    if (!events) {
      axios('/api/get-events').then((result) => {
        if (result.status !== 200) {
          setError(true);
          return;
        }
        setEvents(result.data);
        setLoading(false);
      });
    }
  }, [events, user, loading]);

  const toggleModal = () => setOpenEditModal((prevOpen) => !prevOpen);

  const editEvent = useCallback(() => {
    toggleModal();
  }, []);

  const {
    Title,
  } = Typography;

  const { t } = useTranslation();

  // eslint-disable-next-line no-console
  console.log('events', events);

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

        {!error && (
          <CalendarTable
            eventsByYears={eventsNew}
            isEdited
            editEvent={editEvent}
            removeEvent={confirmModal}
          />
        )}

        <Modal
          isModalVisible={openEditModal}
          handleOk={toggleModal}
          handleCancel={toggleModal}
        >
          <EventForm
            initialValues={initialValues}
          />
        </Modal>
      </>
    )
  );
}
