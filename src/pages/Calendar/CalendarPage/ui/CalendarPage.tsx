import { useCallback, useMemo, useRef, useState } from 'react';
import type { DateSelectArg, DatesSetArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timeGrid';
import { Spinner, useDisclosure } from '@heroui/react';
import classNames from 'classnames';

import { CalendarToolbar } from 'widgets/Calendar/CalendarToolbar';
import { EventDetailsModal } from 'widgets/Calendar/EventDetails';

import {
	ChangeCalendarEventModal,
	useUpdateCalendarEvent,
} from 'features/Calendar/ChangeCalendarEvent';
import { CreateCalendarEventModal } from 'features/Calendar/CreateCalendarEvent';

import type {
	CalendarEvent,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace, useGetUserSpaces } from 'entities/Space';

import {
	CurrentSpaceIdController,
	getInitialDate,
	getInitialView,
	saveView,
	syncUrlParams,
} from 'shared/lib';

import { useIsMobile } from '../lib/useIsMobile';

import './styles.css';

const SELECT_LONG_PRESS_DELAY = 400;

const DEFAULT_EVENT_DATA = {
	id: '',
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	reminders: [],
};

export const CalendarPage = () => {
	const [eventDetails, setEventDetails] = useState<CalendarEvent>();
	const [createDefaults, setCreateDefaults] = useState<CreateCalendarEvent>();
	const [editDefaults, setEditDefaults] = useState<CalendarEvent>();

	const { isOpen: isCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure();
	const { isOpen: isDetailsOpen, onOpenChange: onDetailsOpenChange } = useDisclosure();
	const { isOpen: isEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId();
	const { data: currentSpace } = useGetSpace({ spaceId: currentSpaceId || '' });

	const calendarRef = useRef<FullCalendar | null>(null);
	const [currentView, setCurrentView] = useState(getInitialView());
	const [currentDate, setCurrentDate] = useState(getInitialDate());

	const {
		data: events,
		mutate: mutateEvents,
		isLoading: isEventsLoading,
	} = useGetCalendarEvents();

	const { data: userSpaces, isLoading: isSpacesLoading } = useGetUserSpaces();

	const { request: updateEvent } = useUpdateCalendarEvent();

	const isMobile = useIsMobile();

	// ------------ helpers ------------
	const calendarApi = () => calendarRef.current?.getApi();

	const handlePrev = useCallback(() => calendarApi()?.prev(), []);
	const handleNext = useCallback(() => calendarApi()?.next(), []);
	const handleToday = useCallback(() => calendarApi()?.today(), []);
	const handleChangeView = useCallback((v: string) => {
		const api = calendarApi();
		api?.changeView(v);
		setCurrentView(v);
		saveView(v);
	}, []);

	const onDatesSet = useCallback((arg: DatesSetArg) => {
		setCurrentView(arg.view.type);
		setCurrentDate(arg.view.currentStart);
		syncUrlParams(arg.view.type, arg.view.currentStart);
	}, []);

	// ------------ handlers ------------
	const onSelectSlot = useCallback((arg: DateSelectArg) => {
		setCreateDefaults({
			title: '',
			description: '',
			start: arg.startStr,
			end: arg.endStr,
			reminders: [],
		});
		onCreateOpenChange();
	}, []);

	const handleDateClick = useCallback(
		(arg: { date: Date; dateStr: string; view: any }) => {
			// если мобильный и сейчас month — не создаём событие, а переходим к дню
			if (isMobile && arg.view?.type === 'dayGridMonth') {
				calendarApi()?.changeView('timeGridDay', arg.date);
				return;
			}
		},
		[isMobile, onCreateOpenChange],
	);

	const patchEventsList = useCallback(
		(updated: CalendarEvent | undefined) =>
			mutateEvents(
				(prev) => {
					if (!prev || !updated) return prev;

					const idx = prev.findIndex((e) => e.id === updated.id);
					if (idx === -1) return [...prev, updated];

					const next = prev.slice();
					next[idx] = updated;

					return next;
				},
				{ revalidate: false },
			),
		[mutateEvents],
	);

	const handleChangeEvent = useCallback(
		(arg: EventChangeArg) => {
			const { event } = arg;
			const ext = event.extendedProps;

			const dto: UpdateCalendarEvent = {
				start: event.startStr,
				end: event.endStr,
				title: event.title,
				description: ext.description,
				reminders: ext.reminders,
			};

			updateEvent({ eventId: event.id, event: dto }).then(patchEventsList);
		},
		[patchEventsList, updateEvent],
	);

	const handleClickEvent = useCallback(
		(arg: EventClickArg) => {
			const e = arg.event;

			setEventDetails({
				id: e.id,
				start: e.startStr,
				end: e.endStr,
				title: e.title,
				description: e.extendedProps.description,
				reminders: e.extendedProps.reminders,
			});

			onDetailsOpenChange();
		},
		[onDetailsOpenChange],
	);

	const handleEditEventModal = (event: CalendarEvent) => {
		setEditDefaults(event);

		onEditOpenChange();
		onDetailsOpenChange();
	};

	const dayHeaderContent = useCallback((arg: any) => {
		const d: Date = arg.date;
		const isToday = d.toDateString() === new Date().toDateString();
		const dow = d.toLocaleDateString('ru', { weekday: 'short' });
		const day = d.toLocaleDateString('ru', { day: '2-digit' });
		const isMonthView = arg.view.type === 'dayGridMonth';

		return (
			<div className="dayhead">
				<span className="dow">{dow}</span>
				{!isMonthView && (
					<span className={classNames('day', isToday && 'is-today')}>{day}</span>
				)}
			</div>
		);
	}, []);

	const slotLabelContent = useCallback((arg: any) => {
		const h = String(arg.date.getHours()).padStart(2, '0');
		const m = String(arg.date.getMinutes()).padStart(2, '0');
		return (
			<div className="dayhead">
				<span className="dow">
					{h}:{m}
				</span>
			</div>
		);
	}, []);

	const plugins = useMemo(
		() => [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
		[],
	);

	const isEditable = currentSpace?.access === 'owner';

	if (isEventsLoading || isSpacesLoading) return <Spinner />;
	if (!userSpaces?.length) return <div>У вас нет пространств</div>;

	return (
		<div className="flex h-full flex-col">
			<CreateCalendarEventModal
				initialFormValues={createDefaults ?? DEFAULT_EVENT_DATA}
				onSuccess={onCreateOpenChange}
				isOpen={isCreateOpen}
				onOpenChange={onCreateOpenChange}
			/>

			<EventDetailsModal
				isEditable={isEditable}
				event={eventDetails ?? DEFAULT_EVENT_DATA}
				onEdit={handleEditEventModal}
				isOpen={isDetailsOpen}
				onOpenChange={onDetailsOpenChange}
			/>

			<ChangeCalendarEventModal
				isOpen={isEditOpen}
				onOpenChange={onEditOpenChange}
				eventId={editDefaults?.id ?? ''}
				initialFormValues={editDefaults ?? DEFAULT_EVENT_DATA}
				onSuccess={onEditOpenChange}
			/>

			<CalendarToolbar
				view={currentView}
				date={currentDate}
				onPrev={handlePrev}
				onNext={handleNext}
				onToday={handleToday}
				onChangeView={handleChangeView}
				onCreateEvent={onCreateOpenChange}
			/>

			<FullCalendar
				ref={calendarRef}
				initialView={currentView}
				initialDate={currentDate}
				datesSet={onDatesSet}
				events={events ?? []}
				plugins={plugins}
				locale={ruLocale}
				firstDay={1}
				dayMaxEventRows={3}
				// settings
				selectLongPressDelay={SELECT_LONG_PRESS_DELAY}
				editable={isEditable}
				selectable={isEditable}
				expandRows={true}
				allDaySlot={false}
				selectMirror={true}
				headerToolbar={false}
				// styles
				height="100%"
				themeSystem="standard"
				slotLabelFormat={{ hour: '2-digit', minute: '2-digit' }}
				eventClassNames={() => ['us-event']}
				dayHeaderContent={dayHeaderContent}
				slotLabelContent={slotLabelContent}
				// handlers
				select={onSelectSlot}
				eventDrop={handleChangeEvent}
				eventResize={handleChangeEvent}
				eventClick={handleClickEvent}
				dateClick={handleDateClick}
			/>
		</div>
	);
};
