import { Modal, ModalContent } from '@heroui/react';

import {
	ChangeCalendarEventForm,
	useChangeCalendarEventForm,
} from 'features/Calendar/ChangeCalendarEvent';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

type Props = {
	eventId: string;
	occurrenceStart: string;

	defaultValues: UpdateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const ChangeCalendarEventModal = (props: Props) => {
	const { isOpen, onOpenChange, defaultValues, eventId, occurrenceStart, onSuccess } = props;

	const {
		title,
		description,

		start,
		end,
		recurrenceType,
		recurrenceUntil,

		reminderFields,
		isRemindersActive,

		isUpdating,
		isDeleting,

		onChangeTitle,
		onChangeDescription,
		onChangeStart,
		onChangeEnd,
		onAddReminder,
		onRemoveReminder,
		onChangeRecurrenceType,
		onChangeRecurrenceUntil,

		onUpdateCalendarEvent,
		onDeleteCalendarEvent,

		getReminderOffset,
	} = useChangeCalendarEventForm({ eventId, occurrenceStart, defaultValues, onSuccess });

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			shouldBlockScroll={false}
			scrollBehavior={'outside'}
		>
			<ModalContent>
				<ChangeCalendarEventForm
					title={title}
					description={description}
					//
					start={start}
					end={end}
					recurrenceType={recurrenceType}
					initialRecurrenceType={defaultValues.recurrence.type}
					recurrenceUntil={recurrenceUntil}
					//
					reminderFields={reminderFields}
					isRemindersActive={isRemindersActive}
					//
					isUpdating={isUpdating}
					isDeleting={isDeleting}
					//
					onChangeTitle={onChangeTitle}
					onChangeDescription={onChangeDescription}
					onChangeStart={onChangeStart}
					onChangeEnd={onChangeEnd}
					onAddReminder={onAddReminder}
					onRemoveReminder={onRemoveReminder}
					onChangeRecurrenceType={onChangeRecurrenceType}
					onChangeRecurrenceUntil={onChangeRecurrenceUntil}
					//
					onUpdateCalendarEvent={onUpdateCalendarEvent}
					onDeleteCalendarEvent={onDeleteCalendarEvent}
					//
					getReminderOffset={getReminderOffset}
				/>
			</ModalContent>
		</Modal>
	);
};
