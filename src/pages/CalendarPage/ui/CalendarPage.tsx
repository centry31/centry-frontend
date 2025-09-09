import { useRef, useState } from 'react';
import type { DateSelectArg, DatesSetArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timeGrid';
import { Spinner, useDisclosure } from '@heroui/react';
import classNames from 'classnames';

import { CalendarToolbar } from 'widgets/CalendarToolbar';

import { ChangeCalendarEventModal, useUpdateCalendarEvent } from 'features/ChangeCalendarEvent';
import { CreateCalendarEventModal } from 'features/CreateCalendarEvent';

import type { CreateCalendarEvent, UpdateCalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetPersonalUserSpaces } from 'entities/Space';

import { getInitialDate, getInitialView, saveView, syncUrlParams } from 'shared/lib';

import './styles.css';

const SELECT_LONG_PRESS_DELAY = 400;

// TODO: decompose and fix naming
export const CalendarPage = () => {
	const [updateEventInitialFormValues, setUpdateEventInitialFormValues] =
		useState<UpdateCalendarEvent>();
	const [updateEventId, setUpdateEventId] = useState<string>('');

	const [createEventInitialFormValues, setCreateEventInitialFormValues] =
		useState<CreateCalendarEvent>();

	const { isOpen: isCreateEventModalOpen, onOpenChange: onOpenCreateEventChange } =
		useDisclosure();
	const { isOpen: isUpdateEventModalOpen, onOpenChange: onOpenUpdateEventChange } =
		useDisclosure();

	const calendarRef = useRef<FullCalendar | null>(null);
	const [currentView, setCurrentView] = useState(getInitialView());
	const [currentDate, setCurrentDate] = useState(getInitialDate());

	const api = calendarRef.current?.getApi();

	const onPrev = () => api?.prev();
	const onNext = () => api?.next();
	const onToday = () => api?.today();
	const onChangeView = (v: string) => {
		api?.changeView(v);
		setCurrentView(v);
		saveView(v);
	};

	const onDatesSet = (arg: DatesSetArg) => {
		setCurrentView(arg.view.type);
		setCurrentDate(arg.view.currentStart);
		syncUrlParams(arg.view.type, arg.view.currentStart);
	};

	const {
		data: events,
		mutate: mutateEvents,
		isLoading: isEventsLoading,
		error: eventError,
	} = useGetCalendarEvents();

	const {
		data: userSpaces,
		isLoading: isUserSpacesLoading,
		error: spacesError,
	} = useGetPersonalUserSpaces();

	const { request: updateEvent } = useUpdateCalendarEvent();

	const handleCreateEvent = (dateSelectArg: DateSelectArg) => {
		const event: CreateCalendarEvent = {
			start: dateSelectArg.startStr,
			end: dateSelectArg.endStr,
			title: '',
		};

		setCreateEventInitialFormValues(event);
		onOpenCreateEventChange();
	};

	const handleChangeEvent = (eventChangeArg: EventChangeArg) => {
		const { event } = eventChangeArg;

		const updatedEvent: UpdateCalendarEvent = {
			start: event.startStr,
			end: event.endStr,
			title: event.title,
		};

		updateEvent({ eventId: event.id, event: updatedEvent }).then((updatedEvent) => {
			mutateEvents(
				(events) => {
					if (!events || !updatedEvent) return;

					const filteredEvents = events.filter((event) => event.id !== updatedEvent.id);
					return [...filteredEvents, updatedEvent];
				},
				// TODO: fix (https://uniteam31.atlassian.net/browse/US-7)
				{ revalidate: false },
			);
		});
	};

	const handleOpenChangeEventModal = (eventClickArg: EventClickArg) => {
		const { event } = eventClickArg;

		const initialFormValues: UpdateCalendarEvent = {
			start: event.startStr,
			end: event.endStr,
			title: event.title,
			description: event.extendedProps.description,
		};

		setUpdateEventInitialFormValues(initialFormValues);
		setUpdateEventId(event.id);
		onOpenUpdateEventChange();
	};

	if (isEventsLoading || isUserSpacesLoading) return <Spinner />;

	if (!userSpaces?.length) return <div>У вас нет пространств</div>;

	return (
		<>
			{createEventInitialFormValues && (
				<CreateCalendarEventModal
					isOpen={isCreateEventModalOpen}
					onOpenChange={onOpenCreateEventChange}
					initialFormValues={createEventInitialFormValues}
				/>
			)}

			{updateEventInitialFormValues && (
				<ChangeCalendarEventModal
					isOpen={isUpdateEventModalOpen}
					onOpenChange={onOpenUpdateEventChange}
					eventId={updateEventId}
					initialFormValues={updateEventInitialFormValues}
				/>
			)}

			<CalendarToolbar
				view={currentView}
				date={currentDate}
				onPrev={onPrev}
				onNext={onNext}
				onToday={onToday}
				onChangeView={onChangeView}
			/>

			<FullCalendar
				ref={calendarRef}
				headerToolbar={false}
				initialView={currentView}
				initialDate={currentDate}
				datesSet={(arg) => onDatesSet(arg)} // синк в URL
				events={events || []}
				selectLongPressDelay={SELECT_LONG_PRESS_DELAY}
				//
				plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
				locale={ruLocale}
				firstDay={1}
				allDaySlot={false}
				expandRows
				dayMaxEventRows={3}
				// общие настройки
				selectable
				selectMirror
				editable
				height={'100%'}
				// contentHeight={"auto"}
				themeSystem="standard"
				slotLabelFormat={{ hour: '2-digit', minute: '2-digit' }} // метки времени 09:00
				eventClassNames={() => ['us-event']}
				// кастомизация
				dayHeaderContent={(arg) => {
					const d = arg.date;
					const isToday = d.toDateString() === new Date().toDateString();
					const dow = d.toLocaleDateString('ru', { weekday: 'short' }); // пн
					const day = d.toLocaleDateString('ru', { day: '2-digit' }); // 01

					const isMonthView = arg.view.type === 'dayGridMonth';

					return (
						<div className="dayhead">
							<span className="dow">{dow}</span>

							{!isMonthView && (
								<span className={classNames('day', isToday && 'is-today')}>
									{day}
								</span>
							)}
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
				select={handleCreateEvent}
				eventDrop={handleChangeEvent}
				eventResize={handleChangeEvent}
				eventClick={handleOpenChangeEventModal}
			/>
		</>
	);
};
