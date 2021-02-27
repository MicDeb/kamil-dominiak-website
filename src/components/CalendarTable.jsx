import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const today = new Date();
const initialMonth = today.getMonth();
const initialYear = today.getFullYear();

const months = {
  0: 'january',
  1: 'february',
  2: 'march',
  3: 'april',
  4: 'may',
  5: 'june',
  6: 'july',
  7: 'august',
  8: 'september',
  9: 'october',
  10: 'november',
  11: 'december',
};

const days = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

export function CalendarTable(props) {
  const {
    eventsByYears,
  } = props;

  const { t } = useTranslation();

  const [selectedMonthId, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

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

  const selectedEvents = eventsByYears[selectedYear] && eventsByYears[selectedYear][selectedMonthId]
    ? eventsByYears[selectedYear][selectedMonthId]
    : [];

  const getEventDayName = (year, month, day) => {
    const eventDay = new Date(year, month, day).getDay();

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
    <div className='calendar container-fluid'>
      <div className='row'>

        <div className='col-xs-12'>
          <div className='calendar__year'>{selectedYear}</div>
        </div>

        <div className='col-xs-12'>
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
        </div>

      </div>

      {selectedEvents.length > 0
        ? (
          <>
            {selectedEvents.map((event) => (
              <div
                className='row calendar__single-event'
                key={event.day}
              >
                <div
                  className='col-xs-12 calendar__single-event--day'
                >
                  <span className='day-date'>{getCustomDateFormat(event.day, selectedMonthId)}</span>
                  <span className='day-name'>{getEventDayName(selectedYear, selectedMonthId, event.day)}</span>
                </div>

                {event.dayEvents.map((dayEvent, index) => {
                  const hasSeparator = getSeparator(event, index);
                  return (
                    <div
                      key={event.day + dayEvent.time}
                      className='day-events'
                    >
                      <div className='row'>
                        <div className='col-xs-2'>
                          <span className='event-hour'>
                            {t('at')}
                            {' '}
                            {dayEvent.time}
                          </span>
                        </div>
                        <div
                          className={`col-xs-6 ${ hasSeparator ? 'separate' : '' }`}
                        >
                          <p className='event-title'>{dayEvent.title}</p>
                          {dayEvent.role
                            && (
                              <div className='text-center'>
                                {t('as')}
                                {' '}
                                {dayEvent.role}
                              </div>
                            )}
                        </div>
                        <div
                          className={`col-xs-4 ${ hasSeparator ? 'separate' : '' }`}
                        >
                          <a
                            href={dayEvent.tickets}
                            className='event-place text-center'
                          >
                            {dayEvent.place}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )
        : (
          <h3 className='text-center'>{t('calendar.no_events')}</h3>
        )}
    </div>
  );
}

CalendarTable.propTypes = {
  eventsByYears: PropTypes.object.isRequired,
};
