import { EventDetailsModal } from 'widgets/Calendar/EventDetails';

import type {
	CalendarEvent,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';

import {
	ConfirmUpdateEventModal,
	type UpdateNotificationSettings,
} from './ConfirmUpdateEventModal';
import { CreateCalendarEventModal } from './CreateCalendarEventModal';
import { DeleteCalendarEventModal } from './DeleteCalendarEventModal';
import { UpdateCalendarEventModal } from './UpdateCalendarEventModal';

type Props = {
	createDefaults: CreateCalendarEvent;
	isCreateOpen: boolean;
	onCreateOpenChange: () => void;

	eventDetails: CalendarEvent;
	isDetailsOpen: boolean;
	onDetailsOpenChange: () => void;

	editDefaults: UpdateCalendarEvent & { eventId: string };
	isEditOpen: boolean;
	onEditOpenChange: () => void;
	onEditEvent: (event: CalendarEvent) => void;

	isDeleteOpen: boolean;
	onDeleteOpenChange: () => void;
	onDeleteEvent: () => void;

	isEditable: boolean;
	isSpaceHasTelegramChats: boolean;
	isRecurringUpdate: boolean;

	isConfirmOpen: boolean;
	onCancelChangeEvents: () => void;
	onUpdateOneEvent: (settings: UpdateNotificationSettings) => void;
	onUpdateFutureEvents: (settings: UpdateNotificationSettings) => void;
	isUpdatingEvent: boolean;
};

export const CalendarModals = (props: Props) => {
	const {
		createDefaults,
		isCreateOpen,
		onCreateOpenChange,

		eventDetails,
		isDetailsOpen,
		onDetailsOpenChange,

		onEditEvent,
		editDefaults,
		isEditOpen,
		onEditOpenChange,

		isDeleteOpen,
		onDeleteEvent,
		onDeleteOpenChange,

		isEditable,
		isConfirmOpen,
		isUpdatingEvent,
		isSpaceHasTelegramChats,
		isRecurringUpdate,

		onCancelChangeEvents,
		onUpdateOneEvent,
		onUpdateFutureEvents,
	} = props;

	return (
		<>
			{isCreateOpen && (
				<CreateCalendarEventModal
					defaultValues={createDefaults}
					onSuccess={onCreateOpenChange}
					isOpen={isCreateOpen}
					onOpenChange={onCreateOpenChange}
				/>
			)}

			{isDetailsOpen && (
				<EventDetailsModal
					isEditable={isEditable}
					event={eventDetails}
					onEdit={onEditEvent}
					onDelete={onDeleteEvent}
					isOpen={isDetailsOpen}
					onOpenChange={onDetailsOpenChange}
				/>
			)}

			{isEditOpen && (
				<UpdateCalendarEventModal
					isOpen={isEditOpen}
					onOpenChange={onEditOpenChange}
					eventId={editDefaults.eventId}
					defaultValues={editDefaults}
					onSuccess={onEditOpenChange}
				/>
			)}

			{isDeleteOpen && (
				<DeleteCalendarEventModal
					onSuccess={onDeleteOpenChange}
					eventId={eventDetails.id}
					eventStart={eventDetails.start}
					eventFrequency={eventDetails.frequency}
					isOpen={isDeleteOpen}
					onOpenChange={onDeleteOpenChange}
				/>
			)}

			<ConfirmUpdateEventModal
				isOpen={isConfirmOpen}
				onClose={onCancelChangeEvents}
				onUpdateOne={onUpdateOneEvent}
				onUpdateFuture={onUpdateFutureEvents}
				isUpdating={isUpdatingEvent}
				isSpaceHasTelegramChats={isSpaceHasTelegramChats}
				isRecurringEvent={isRecurringUpdate}
			/>
		</>
	);
};
