import React, { useCallback, useContext, useState } from 'react';
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
  const user = useContext(UserContext);

  const toggleModal = () => setOpenEditModal((prevOpen) => !prevOpen);

  const editEvent = useCallback(() => {
    toggleModal();
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
          removeEvent={confirmModal}
        />

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
