import React, { useState } from 'react';
import PropTypes from 'prop-types';

const today = new Date();
const initialMonth = today.getMonth();
const initialYear = today.getFullYear();

const months = {
  0: 'Styczeń',
  1: 'Luty',
  2: 'Marzec',
  3: 'Kwiecień',
  4: 'Maj',
  5: 'Czerwiec',
  6: 'Lipiec',
  7: 'Sierpień',
  8: 'Wrzesień',
  9: 'Październik',
  10: 'Listopad',
  11: 'Grudzień',
};

const days = {
  0: 'niedziela',
  1: 'poniedziałek',
  2: 'wtorek',
  3: 'środa',
  4: 'czwartek',
  5: 'piątek',
  6: 'sobota',
};

export function CalendarTable(props) {
  const {
    eventsByYears,
  } = props;

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

    return eventDayName;
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
          <div className='calendar__pagination'>
            <button
              type='button'
              onClick={handlePrevMonth}
            >
              {'<'}
            </button>
            <p className='text-center'>{months[selectedMonthId]}</p>
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
                            godz.
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
                                jako
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
          <h3 className='text-center'>Brak wydarzeń w danym miesiącu</h3>
        )}
    </div>
  );
}

CalendarTable.propTypes = {
  eventsByYears: PropTypes.object.isRequired,
};
