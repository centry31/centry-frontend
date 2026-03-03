import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDisclosure } from '@heroui/react';

import { CalendarToolbar } from 'widgets/Calendar/CalendarToolbar';

import { useCalendarViewStore } from 'entities/Calendar';
import { useGetSpace } from 'entities/Space';

import {
	DEFAULT_DAY_MAX_EVENT_ROWS,
	MOBILE_MONTH_DAY_MAX_EVENT_ROWS,
} from '../lib/calendar.constants';
import { isMonthLikeView } from '../lib/isMonthLikeView';
import { useCalendarEventsSync } from '../model/useCalendarEventsSync';
import { useCalendarFormModalState } from '../model/useCalendarFormModalState';
import { useCalendarViewController } from '../model/useCalendarViewController';
import { useChangeCalendarEvent } from '../model/useChangeCalendarEvent';
import { useDayViewScrollTime } from '../model/useDayViewScrollTime';
import { CalendarBoard } from './CalendarBoard';
import { CalendarModals } from './CalendarModals';
import { CalendarSidebar } from './CalendarSidebar';

import './styles.css';

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
	}, [setCurrentDate, view.currentEndDate, view.currentStartDate]);

	const {
		isOpen: isCreateOpen,
		onOpen: onCreateOpen,
		onOpenChange: onCreateOpenChange,
	} = useDisclosure();
	const {
		isOpen: isDetailsOpen,
		onOpen: onDetailsOpen,
		onClose: onDetailsClose,
		onOpenChange: onDetailsOpenChange,
	} = useDisclosure();
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onOpenChange: onEditOpenChange,
	} = useDisclosure();
	const {
		isOpen: isConfirmOpen,
		onOpen: onOpenConfirm,
		onClose: onCloseConfirm,
	} = useDisclosure();

	const formModals = useCalendarFormModalState({
		onOpenFormCreate: onCreateOpen,
		onOpenDetails: onDetailsOpen,
		onOpenFormEdit: onEditOpen,
		onCloseDetails: onDetailsClose,
	});

	const updateEvents = useChangeCalendarEvent({
		start: view.currentStartDate,
		end: view.currentEndDate,
		onOpenConfirm,
		onCloseConfirm,
	});

	const isCurrentViewMonthLike = isMonthLikeView(view.currentView);
	const dayMaxEventRows =
		view.isMobile && isCurrentViewMonthLike
			? MOBILE_MONTH_DAY_MAX_EVENT_ROWS
			: DEFAULT_DAY_MAX_EVENT_ROWS;

	const dayViewScrollTime = useDayViewScrollTime({
		calendarRef: view.calendarRef,
		currentView: view.currentView,
		currentDate: view.currentDate,
		events: events.events,
	});

	return (
		<div className="calendar-page flex h-full flex-col gap-3 p-2 sm:p-3">
			<CalendarModals
				createDefaults={formModals.createDefaults}
				isCreateOpen={isCreateOpen}
				onCreateOpenChange={onCreateOpenChange}
				//
				eventDetails={formModals.eventDetails}
				isDetailsOpen={isDetailsOpen}
				onDetailsOpenChange={onDetailsOpenChange}
				//
				onEditEvent={formModals.onEditEventModal}
				editDefaults={formModals.editDefaults}
				isEditOpen={isEditOpen}
				onEditOpenChange={onEditOpenChange}
				//
				isEditable={events.isEditable}
				isConfirmOpen={isConfirmOpen}
				isUpdatingEvent={updateEvents.isEventUpdating}
				//
				onCancelChangeEvents={updateEvents.onCancelChangeEvents}
				onUpdateOneEvent={updateEvents.onUpdateOneEvent}
				onUpdateFutureEvents={updateEvents.onUpdateFeatureEvents}
			/>

			<CalendarToolbar
				view={view.currentView}
				date={view.currentDate}
				//
				onPrev={view.onPrev}
				onNext={view.onNext}
				onToday={view.onToday}
				onChangeView={view.onChangeView}
				//
				onCreateEvent={onCreateOpen}
				spaceAccess={currentSpace?.access}
			/>

			<div className="calendar-layout flex h-full flex-1 items-start gap-3">
				<CalendarBoard
					calendarRef={view.calendarRef}
					currentView={view.currentView}
					currentDate={view.currentDate}
					plugins={view.plugins}
					events={events.events}
					isEditable={events.isEditable}
					dayMaxEventRows={dayMaxEventRows}
					dayViewScrollTime={dayViewScrollTime}
					//
					onDatesSet={view.onDatesSet}
					onSelectSlot={formModals.onSelectSlot}
					onChangeEvent={updateEvents.onChangeEvent}
					onClickEvent={formModals.onClickEvent}
					onDateClick={view.onDateClick}
					//
					dayHeaderContent={view.dayHeaderContent}
					slotLabelContent={view.slotLabelContent}
				/>

				{!view.isMobile && (
					<CalendarSidebar
						currentDate={view.currentDate}
						eventsCount={events.events.length}
						//
						onDateChange={view.onDateChange}
						isEditable={events.isEditable}
						isEventsLoading={events.isEventsLoading}
					/>
				)}
			</div>
		</div>
	);
};
