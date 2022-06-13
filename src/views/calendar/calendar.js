import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export const Calendar = ({ events }) => {
    return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />;
};
