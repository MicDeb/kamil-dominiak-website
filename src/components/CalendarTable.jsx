import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import moment from 'moment';
import {
  Col, Row, Button, Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { confirmModal } from 'src/components/modal/confirmModal';
import { months, days } from 'src/helpers/calendarHelpers';

const initialMonth = moment().get('month');
const initialYear = moment().get('year');

export function CalendarTable(props) {
  const {
    isEdited,
    toggleEditEventModal,
    removeEvent,
    events,
  } = props;
  const [selectedMonthId, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const { t } = useTranslation();

  const selectedMonthEvents = useMemo(() => (
    filter(events, (event) => moment(event.eventStartDate, 'YYYY-MM')
      .isSame(moment(`${ selectedYear }-${ selectedMonthId + 1 }`, 'YYYY-MM')))
  ), [events, selectedMonthId, selectedYear]);

  const selectedMonthDays = useMemo(() => (
    uniq(map(selectedMonthEvents, (event) => moment(event.eventStartDate, 'YYYY-MM-DD').date()))
  ), [selectedMonthEvents]);

  const selectedEventsByDay = useMemo(() => (
    map(selectedMonthDays, (day) => ({
      day,
      dayEvents: filter(selectedMonthEvents, (event) => (
        moment(event.eventStartDate, 'YYYY-MM-DD').date() === day
      )),
    }))
  ), [selectedMonthDays, selectedMonthEvents]);

  const handleNextMonth = () => {
    const counter = selectedMonthId === 11 ? 0 : selectedMonthId + 1;
    setSelectedMonth(counter);
    if (counter === 0) {
      setSelectedYear((year) => year + 1);
    }
  };

  const handlePrevMonth = () => {
    const counter = selectedMonthId === 0 ? 11 : selectedMonthId - 1;
    setSelectedMonth(counter);
    if (counter === 11) {
      setSelectedYear((year) => year - 1);
    }
  };

  const getEventDayName = (date) => {
    const eventDay = moment(date, 'YYYY-MM-DD').get('day');

    const eventDayName = days[eventDay];

    return t(`days.${ eventDayName }`);
  };

  const getCustomDateFormat = (day, month) => {
    const dayFormat = day < 10 ? `0${ day }` : day;
    const monthFormat = month < 9 ? `0${ month + 1 }` : month + 1;

    return `${ dayFormat }.${ monthFormat }`;
  };

  const getSeparator = (event, index) => (
    event.dayEvents.length > 1 && index < event.dayEvents.length - 1
  );

  return (
    <div className='calendar'>
      <Row>
        <Col xs={24}>
          <div className='calendar__year'>{selectedYear}</div>
        </Col>

        <Col xs={24}>
          <div className='calendar__pagination'>
            <button
              type='button'
              onClick={handlePrevMonth}
            >
              {'<'}
            </button>
            <p className='text-center'>{t(`months.${ months[selectedMonthId] }`)}</p>
            <button
              type='button'
              onClick={handleNextMonth}
            >
              {'>'}
            </button>
          </div>
        </Col>
      </Row>

      {selectedEventsByDay.length
        ? (
          <>
            {selectedEventsByDay.map((event) => (
              <Row
                className='calendar__single-event'
                key={event.day}
              >
                <Col
                  xs={24}
                  className='calendar__single-event--day'
                >
                  <span className='day-date'>{getCustomDateFormat(event.day, selectedMonthId)}</span>
                  <span className='day-name'>{getEventDayName(`${ selectedYear }-${ selectedMonthId + 1 }-${ event.day }`)}</span>
                </Col>

                {map(event.dayEvents, (dayEvent, index) => {
                  const hasSeparator = getSeparator(event, index);
                  return (
                    <Col
                      xs={24}
                      /* eslint-disable-next-line no-underscore-dangle */
                      key={dayEvent._id}
                      className='day-events'
                    >
                      <Row>
                        <Col xs={4}>
                          <span className='event-hour'>
                            {t('at')}
                            {' '}
                            {dayEvent.eventStartTime
                              ? moment(dayEvent.eventStartTime).format('HH:mm')
                              : '-'}
                          </span>
                        </Col>
                        <Col
                          xs={isEdited ? 10 : 12}
                          className={`${ hasSeparator ? 'separate' : '' }`}
                        >
                          <p className='event-title'>{dayEvent.eventName}</p>
                          {dayEvent.eventRole
                            && (
                              <div className='text-center event-role'>
                                {t('as')}
                                {' '}
                                {dayEvent.eventRole}
                              </div>
                            )}
                        </Col>
                        <Col
                          xs={isEdited ? 6 : 8}
                          className={`${ hasSeparator ? 'separate' : '' }`}
                        >
                          <a
                            href={dayEvent.eventLink}
                            className='event-place text-center'
                          >
                            {dayEvent.eventPlace}
                          </a>
                        </Col>
                        {isEdited && (
                          <Col xs={4}>
                            <div className='calendar__actions'>
                              <Tooltip title='Edytuj'>
                                <Button
                                  type='primary'
                                  shape='circle'
                                  icon={<EditOutlined />}
                                  onClick={() => toggleEditEventModal(dayEvent)}
                                />
                              </Tooltip>
                              <Tooltip title='Usuń'>
                                <Button
                                  type='primary'
                                  shape='circle'
                                  icon={<DeleteOutlined />}
                                  onClick={() => confirmModal({
                                    title: 'Czy na pewno chcesz usunąć wydarzenie',
                                    /* eslint-disable-next-line no-underscore-dangle */
                                    onOk: () => removeEvent(dayEvent._id),
                                  })}
                                />
                              </Tooltip>
                            </div>
                          </Col>
                        )}

                        {dayEvent.eventDescription && (
                          <Col
                            xs={24}
                            className={`${ hasSeparator ? 'separate' : '' }`}
                          >
                            <div className='event-description'>
                              {t('about_event')}
                              :
                              {' '}
                              {dayEvent.eventDescription}
                            </div>
                          </Col>
                        )}
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            ))}
          </>
        )
        : (
          <h3 className='text-center'>{t('calendar.no_events')}</h3>
        )}
    </div>
  );
}

CalendarTable.defaultProps = {
  isEdited: false,
  toggleEditEventModal: () => null,
  removeEvent: () => null,
};

CalendarTable.propTypes = {
  events: PropTypes.array.isRequired,
  toggleEditEventModal: PropTypes.func,
  isEdited: PropTypes.bool,
  removeEvent: PropTypes.func,
};
