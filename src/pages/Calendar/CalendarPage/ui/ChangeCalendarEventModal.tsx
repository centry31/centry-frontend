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
		onUpdateCalendarEvent,
		onDeleteCalendarEvent,

		getReminderOffset,
		parseDateValue,
	} = useChangeCalendarEventForm({ eventId, defaultValues, onSuccess });

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<ChangeCalendarEventForm
					title={title}
					description={description}
					//
					start={start}
					end={end}
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
					onUpdateCalendarEvent={onUpdateCalendarEvent}
					onDeleteCalendarEvent={onDeleteCalendarEvent}
					//
					getReminderOffset={getReminderOffset}
					parseDateValue={parseDateValue}
				/>
			</ModalContent>
		</Modal>
	);
};
