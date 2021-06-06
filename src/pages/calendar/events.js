import React, {
  useCallback, useContext, useState, useEffect,
} from 'react';
import axios from 'axios';
import { UserContext } from 'src/helpers/userContext';
import EventForm from 'src/components/EventForm';
import { CalendarTable } from 'src/components/CalendarTable';
import { Divider, Typography, message } from 'antd';
import { useTranslation } from 'react-i18next';
import Error from 'src/components/Error';
import { toastMsgs } from 'src/helpers/toastMsgs';
import moment from 'moment';
import omit from 'lodash/omit';
import { Modal } from '../../components/modal/Modal';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [events, setEvents] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState(initialValues);

  const user = useContext(UserContext);
  const {
    Title,
  } = Typography;
  const { t } = useTranslation();

  const toggleEditEventModal = (eventValues) => {
    setEditInitialValues(eventValues);
    setIsEditModalVisible((prevIsVisible) => !prevIsVisible);
  };

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
    if (loading && !user) return;
    if (!events) {
      getEvents();
    }
  }, [events, user, loading, getEvents]);

  const getCorrectDatesValues = useCallback((formValues) => {
    const {
      eventStartDate,
      eventStartTime,
      eventEndDate,
    } = formValues;
    return ({
      eventStartDate: moment.isMoment(eventStartDate)
        ? eventStartDate.format() : eventStartDate,
      eventStartTime: moment.isMoment(eventStartTime)
        ? eventStartTime.format() : eventStartTime,
      eventEndDate: moment.isMoment(eventEndDate)
        ? eventEndDate.format() : eventEndDate,
    });
  }, []);

  const handleAddEvent = useCallback((formValues, resetForm) => {
    const datesValues = getCorrectDatesValues(formValues);
    const addValues = {
      ...formValues,
      ...datesValues,
    };

    axios.post('/api/create-event', addValues)
      .then(() => {
        toastSuccess({
          msg: toastMsgs.events.addSuccess,
        });
        getEvents();
        resetForm();
      })
      .catch(() => {
        toastError({
          msg: toastMsgs.events.addError,
        });
      });
  }, [getCorrectDatesValues, getEvents]);

  const handleEditEvent = useCallback((formValues) => {
    const datesValues = getCorrectDatesValues(formValues);
    const editValues = {
      // eslint-disable-next-line no-underscore-dangle
      id: formValues._id,
      ...omit(formValues, '_id'),
      ...datesValues,

    };

    axios.post('/api/update-event', editValues)
      .then(() => {
        toastSuccess({
          msg: toastMsgs.events.updateSuccess,
        });
        getEvents();
        toggleEditEventModal(initialValues);
      })
      .catch(() => {
        toastError({
          msg: toastMsgs.events.updateError,
        });
      });
  }, [getCorrectDatesValues, getEvents]);

  const handleRemoveEvent = useCallback((eventId) => {
    axios.post('/api/delete-event', { id: eventId })
      .then(() => {
        toastSuccess({
          msg: toastMsgs.events.deleteSuccess,
        });
        getEvents();
      })
      .catch(() => {
        toastError({
          msg: toastMsgs.events.deleteError,
        });
      });
  }, [getEvents]);

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
              events={events || []}
              isEdited
              toggleEditEventModal={(eventValues) => toggleEditEventModal(eventValues)}
              removeEvent={handleRemoveEvent}
            />

            <Modal
              isModalVisible={isEditModalVisible}
              handleCancel={() => toggleEditEventModal(initialValues)}
              footer={null}
              title={` 
                Edytuj wydarzenie: 
                ${ editInitialValues?.eventName } 
                (${ moment(editInitialValues?.eventStartDate).format('DD-MM-YYYY') }, 
                ${ editInitialValues?.eventStartTime ? moment(editInitialValues?.eventStartTime).format('HH:mm') : '' }) 
              `}
            >
              <EventForm
                initialValues={editInitialValues}
                handleSubmit={handleEditEvent}
                submitButtonText='Edytuj wydarzenie'
              />
            </Modal>
          </>
        )
    )
  );
}
