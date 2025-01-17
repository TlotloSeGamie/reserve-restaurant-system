import React from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ selectedDate, onDayPress }) => {
  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={selectedDate ? { [selectedDate]: { selected: true, marked: true } } : {}}
    />
  );
};

export default CalendarComponent;
