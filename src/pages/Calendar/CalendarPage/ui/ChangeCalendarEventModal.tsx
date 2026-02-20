import { Modal, ModalContent } from '@heroui/react';

import {
	ChangeCalendarEventForm,
	useChangeCalendarEventForm,
} from 'features/Calendar/ChangeCalendarEvent';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

type Props = {
	eventId: string;
	eventOrderIndex: number;

	defaultValues: UpdateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const ChangeCalendarEventModal = (props: Props) => {
	const { isOpen, onOpenChange, defaultValues, eventId, eventOrderIndex, onSuccess } = props;

	const {
		title,
		description,

		start,
		end,
		frequency,

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

		onUpdateCalendarEvent,
		onDeleteCalendarEvent,

		getReminderOffset,
		parseDateValue,
	} = useChangeCalendarEventForm({ eventId, eventOrderIndex, defaultValues, onSuccess });

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<ChangeCalendarEventForm
					title={title}
					description={description}
					//
					start={start}
					end={end}
					frequency={frequency}
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
					//
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
