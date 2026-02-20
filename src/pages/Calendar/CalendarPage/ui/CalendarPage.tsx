import { useEffect } from 'react';
import ruLocale from '@fullcalendar/core/locales/ru';
import FullCalendar from '@fullcalendar/react';
import { Spinner, useDisclosure } from '@heroui/react';

import { CalendarToolbar } from 'widgets/Calendar/CalendarToolbar';
import { EventDetailsModal } from 'widgets/Calendar/EventDetails';

import { useCalendarViewStore } from 'entities/Calendar';

import { useCalendarEventsSync } from '../model/useCalendarEventsSync';
import { useCalendarModalState } from '../model/useCalendarModalState';
import { useCalendarViewController } from '../model/useCalendarViewController';
import { ChangeCalendarEventModal } from './ChangeCalendarEventModal';
import { CreateCalendarEventModal } from './CreateCalendarEventModal';

import './styles.css';

const SELECT_LONG_PRESS_DELAY = 400;

export const CalendarPage = () => {
	const view = useCalendarViewController();
	const events = useCalendarEventsSync({
		start: view.currentStartDate,
		end: view.currentEndDate,
	});

	const { setCurrentDate } = useCalendarViewStore();

	useEffect(() => {
		setCurrentDate({
			start: view.currentStartDate,
			end: view.currentEndDate,
		});
	}, [view.currentStartDate, view.currentEndDate, setCurrentDate]);

	const { isOpen: isCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure();
	const { isOpen: isDetailsOpen, onOpenChange: onDetailsOpenChange } = useDisclosure();
	const { isOpen: isEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();

	const modals = useCalendarModalState({
		onOpenCreate: onCreateOpenChange,
		onOpenDetails: onDetailsOpenChange,
		onOpenEdit: onEditOpenChange,
		onCloseDetails: onDetailsOpenChange,
	});

	if (events.isEventsLoading || events.isSpacesLoading) return <Spinner />;
	if (!events.hasUserSpaces) return <div>У вас нет пространств</div>;

	return (
		<div className="flex h-full flex-col">
			{isCreateOpen && (
				<CreateCalendarEventModal
					defaultValues={modals.createDefaults}
					onSuccess={onCreateOpenChange}
					isOpen={isCreateOpen}
					onOpenChange={onCreateOpenChange}
				/>
			)}

			{isDetailsOpen && (
				<EventDetailsModal
					isEditable={events.isEditable}
					event={modals.eventDetails}
					onEdit={modals.onEditEventModal}
					isOpen={isDetailsOpen}
					onOpenChange={onDetailsOpenChange}
				/>
			)}

			{isEditOpen && (
				<ChangeCalendarEventModal
					isOpen={isEditOpen}
					onOpenChange={onEditOpenChange}
					eventId={modals.editDefaults.id}
					eventOrderIndex={modals.eventDetails.orderIndex}
					defaultValues={modals.editDefaults}
					onSuccess={onEditOpenChange}
				/>
			)}

			<CalendarToolbar
				view={view.currentView}
				date={view.currentDate}
				onPrev={view.onPrev}
				onNext={view.onNext}
				onToday={view.onToday}
				onChangeView={view.onChangeView}
				onCreateEvent={onCreateOpenChange}
			/>

			<FullCalendar
				ref={view.calendarRef}
				initialView={view.currentView}
				initialDate={view.currentDate}
				datesSet={view.onDatesSet}
				events={events.events ?? []}
				plugins={view.plugins}
				//
				locale={ruLocale}
				firstDay={1}
				dayMaxEventRows={3}
				// settings
				selectLongPressDelay={SELECT_LONG_PRESS_DELAY}
				editable={events.isEditable}
				selectable={events.isEditable}
				expandRows={true}
				allDaySlot={false}
				selectMirror={true}
				headerToolbar={false}
				// styles
				height="100%"
				themeSystem="standard"
				slotLabelFormat={{ hour: '2-digit', minute: '2-digit' }}
				eventClassNames={() => ['us-event']}
				dayHeaderContent={view.dayHeaderContent}
				slotLabelContent={view.slotLabelContent}
				// handlers
				select={modals.onSelectSlot}
				eventDrop={events.onChangeEvent}
				eventResize={events.onChangeEvent}
				eventClick={modals.onClickEvent}
				dateClick={view.onDateClick}
			/>
		</div>
	);
};
