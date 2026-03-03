import { EventDetailsModal } from 'widgets/Calendar/EventDetails';

import type {
	CalendarEvent,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';

import { ChangeCalendarEventModal } from './ChangeCalendarEventModal';
import { ConfirmChangeEventModal } from './ConfirmChangeEventModal';
import { CreateCalendarEventModal } from './CreateCalendarEventModal';

type Props = {
	createDefaults: CreateCalendarEvent;
	isCreateOpen: boolean;
	onCreateOpenChange: () => void;

	eventDetails: CalendarEvent;
	isDetailsOpen: boolean;
	onDetailsOpenChange: () => void;
	onEditEvent: (event: CalendarEvent) => void;

	editDefaults: UpdateCalendarEvent & { eventId: string };
	isEditOpen: boolean;
	onEditOpenChange: () => void;

	isEditable: boolean;

	isConfirmOpen: boolean;
	onCancelChangeEvents: () => void;
	onUpdateOneEvent: () => void;
	onUpdateFutureEvents: () => void;
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

		isEditable,
		isConfirmOpen,
		isUpdatingEvent,

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
					isOpen={isDetailsOpen}
					onOpenChange={onDetailsOpenChange}
				/>
			)}

			{isEditOpen && (
				<ChangeCalendarEventModal
					isOpen={isEditOpen}
					onOpenChange={onEditOpenChange}
					eventId={editDefaults.eventId}
					defaultValues={editDefaults}
					onSuccess={onEditOpenChange}
				/>
			)}

			<ConfirmChangeEventModal
				isOpen={isConfirmOpen}
				onClose={onCancelChangeEvents}
				onUpdateOne={onUpdateOneEvent}
				onUpdateFuture={onUpdateFutureEvents}
				isUpdating={isUpdatingEvent}
			/>
		</>
	);
};
