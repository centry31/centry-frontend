import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ruLocale from '@fullcalendar/core/locales/ru';
import FullCalendar from '@fullcalendar/react';
import { Calendar, Spinner, useDisclosure } from '@heroui/react';

import { CalendarToolbar } from 'widgets/Calendar/CalendarToolbar';
import { EventDetailsModal } from 'widgets/Calendar/EventDetails';

import { useCalendarViewStore } from 'entities/Calendar';
import { useGetSpace } from 'entities/Space';

import { safeParseAbsoluteToLocal } from 'shared/lib';

import { useCalendarEventsSync } from '../model/useCalendarEventsSync';
import { useCalendarFormModalState } from '../model/useCalendarFormModalState';
import { useCalendarViewController } from '../model/useCalendarViewController';
import { useChangeCalendarEvent } from '../model/useChangeCalendarEvent';
import { ChangeCalendarEventModal } from './ChangeCalendarEventModal';
import { ConfirmChangeEventModal } from './ConfirmChangeEventModal';
import { CreateCalendarEventModal } from './CreateCalendarEventModal';

import './styles.css';

const SELECT_LONG_PRESS_DELAY = 400;

export const CalendarPage = () => {
	const view = useCalendarViewController();
	const events = useCalendarEventsSync({
		start: view.currentStartDate,
		end: view.currentEndDate,
	});

	const { spaceId = '' } = useParams();

	const { setCurrentDate } = useCalendarViewStore();
	const { data: currentSpace } = useGetSpace({ spaceId });

	useEffect(() => {
		setCurrentDate({
			start: view.currentStartDate,
			end: view.currentEndDate,
		});
	}, [view.currentStartDate, view.currentEndDate, setCurrentDate]);

	const { isOpen: isCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure();
	const { isOpen: isDetailsOpen, onOpenChange: onDetailsOpenChange } = useDisclosure();
	const { isOpen: isEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
	const {
		isOpen: isConfirmOpen,
		onOpen: onOpenConfirm,
		onClose: onCloseConfirm,
	} = useDisclosure();

	const formModals = useCalendarFormModalState({
		onOpenFormCreate: onCreateOpenChange,
		onOpenDetails: onDetailsOpenChange,
		onOpenFormEdit: onEditOpenChange,
		onCloseDetails: onDetailsOpenChange,
	});

	const updateEvents = useChangeCalendarEvent({
		start: view.currentStartDate,
		end: view.currentEndDate,
		onOpenConfirm,
		onCloseConfirm,
	});

	if (events.isEventsLoading) return <Spinner />;

	return (
		<div className="flex h-full flex-col">
			{isCreateOpen && (
				<CreateCalendarEventModal
					defaultValues={formModals.createDefaults}
					onSuccess={onCreateOpenChange}
					isOpen={isCreateOpen}
					onOpenChange={onCreateOpenChange}
				/>
			)}

			{isDetailsOpen && (
				<EventDetailsModal
					isEditable={events.isEditable}
					event={formModals.eventDetails}
					onEdit={formModals.onEditEventModal}
					isOpen={isDetailsOpen}
					onOpenChange={onDetailsOpenChange}
				/>
			)}

			{isEditOpen && (
				<ChangeCalendarEventModal
					isOpen={isEditOpen}
					onOpenChange={onEditOpenChange}
					eventId={formModals.editDefaults.eventId}
					occurrenceStart={formModals.editDefaults.occurrenceStart}
					defaultValues={formModals.editDefaults}
					onSuccess={onEditOpenChange}
				/>
			)}

			<ConfirmChangeEventModal
				isOpen={isConfirmOpen}
				onClose={updateEvents.onCancelChangeEvents}
				onUpdateOne={updateEvents.onUpdateOneEvent}
				onUpdateFuture={updateEvents.onUpdateFeatureEvents}
				isUpdating={updateEvents.isEventUpdating}
			/>

			<CalendarToolbar
				view={view.currentView}
				date={view.currentDate}
				onPrev={view.onPrev}
				onNext={view.onNext}
				onToday={view.onToday}
				onChangeView={view.onChangeView}
				spaceAccess={currentSpace?.access}
				onCreateEvent={onCreateOpenChange}
			/>

			<div className={'flex h-full gap-2 items-start'}>
				<div className={'flex-1 h-full'}>
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
						select={formModals.onSelectSlot}
						eventDrop={updateEvents.onChangeEvent}
						eventResize={updateEvents.onChangeEvent}
						eventClick={formModals.onClickEvent}
						dateClick={view.onDateClick}
					/>
				</div>

				{!view.isMobile && view.currentView === 'timeGridDay' && (
					<Calendar
						classNames={{ base: 'border-none shadow-none' }}
						className={'bg-white'}
						value={safeParseAbsoluteToLocal(view.currentDate.toISOString())}
						onChange={view.onDateChange}
					/>
				)}
			</div>
		</div>
	);
};
