import { Modal, ModalContent } from '@heroui/react';

import {
	ChangeCalendarEventForm,
	useChangeCalendarEventForm,
} from 'features/Calendar/ChangeCalendarEvent';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

type Props = {
	eventId: string;

	defaultValues: UpdateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const ChangeCalendarEventModal = (props: Props) => {
	const { isOpen, onOpenChange, defaultValues, eventId, onSuccess } = props;

	const {
		title,
		description,

		start,
		end,
		frequency,
		until,

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
		onChangeFrequency,
		onChangeUntil,

		onUpdateCalendarEvent,
		onDeleteCalendarEvent,

		getReminderOffset,
	} = useChangeCalendarEventForm({ eventId, defaultValues, onSuccess });

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
					frequency={frequency}
					initialFrequency={defaultValues.frequency}
					until={until}
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
					onChangeFrequency={onChangeFrequency}
					onChangeUntil={onChangeUntil}
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
