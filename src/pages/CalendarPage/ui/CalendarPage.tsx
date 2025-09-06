import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timeGrid';

import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetPersonalUserSpaces } from 'entities/Space';

import './styles.css';

const SELECT_LONG_PRESS_DELAY = 400;

export const CalendarPage = () => {
	const {
		data: events,
		mutate: mutateEvents,
		isLoading: isEventsLoading,
		error: eventError,
	} = useGetCalendarEvents();

	// const {
	// 	data: userSpaces,
	// 	isLoading: isUserSpacesLoading,
	// 	error: spacesError,
	// } = useGetPersonalUserSpaces();
	//
	// if (isEventsLoading || isUserSpacesLoading) return null;
	// if (!userSpaces?.length) return null;

	return (
		<FullCalendar
			events={events ?? []}
			selectLongPressDelay={SELECT_LONG_PRESS_DELAY}
			//
			plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
			// headerToolbar={{
			// 	left: 'prev,next',
			// 	right: 'timeGridWeek,timeGridDay',
			// }}
			headerToolbar={false}
			locale={ruLocale}
			firstDay={1}
			allDaySlot={false}
			expandRows
			dayMaxEventRows={3}
			// общие настройки
			selectable
			selectMirror
			height={'100%'}
			initialView="timeGridDay"
			// кастомизация
			dayHeaderContent={(arg) => {
				const d = arg.date;
				const isToday = d.toDateString() === new Date().toDateString();
				const dow = d.toLocaleDateString('ru', { weekday: 'short' }); // пн
				const day = d.toLocaleDateString('ru', { day: '2-digit' }); // 01

				return (
					<div className="dayhead">
						<span className="dow">{dow}</span>
						<span className={`day ${isToday ? 'is-today' : ''}`}>{day}</span>
					</div>
				);
			}}
			slotLabelContent={(arg) => {
				const h = arg.date.getHours().toString();
				const m = arg.date.getMinutes().toString();

				return (
					<div className="dayhead">
						<span className="dow">
							{h.length < 2 ? '0' + h : h}:{m.length < 2 ? '0' + m : m}
						</span>
					</div>
				);
			}}
			// обработчики
			select={(selectInfo) => console.log({ selectInfo })}
		/>
	);
};
