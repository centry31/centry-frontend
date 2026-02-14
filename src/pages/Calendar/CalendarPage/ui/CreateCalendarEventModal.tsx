import { Modal, ModalContent } from '@heroui/react';

import {
	CreateCalendarEventForm,
	useCreateCalendarEventForm,
} from 'features/Calendar/CreateCalendarEvent';

import type { CreateCalendarEvent } from 'entities/CalendarEvent';

type Props = {
	defaultValues: CreateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const CreateCalendarEventModal = (props: Props) => {
	const { defaultValues, onSuccess, isOpen, onOpenChange } = props;

	const {
		title,
		description,
		start,
		end,

		reminderFields,
		isRemindersActive,
		isCreating,

		onChangeTitle,
		onChangeDescription,
		onChangeStart,
		onChangeEnd,
		onAddReminder,
		onRemoveReminder,
		onCreateCalendarEvent,

		getReminderOffset,
		parseDateValue,
	} = useCreateCalendarEventForm({ defaultValues });

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<CreateCalendarEventForm
					title={title}
					description={description}
					start={start}
					end={end}
					//
					reminderFields={reminderFields}
					isRemindersActive={isRemindersActive}
					isCreating={isCreating}
					//
					onChangeTitle={onChangeTitle}
					onChangeDescription={onChangeDescription}
					onAddReminder={onAddReminder}
					onRemoveReminder={onRemoveReminder}
					onCreateCalendarEvent={onCreateCalendarEvent}
					onChangeStart={onChangeStart}
					onChangeEnd={onChangeEnd}
					//
					getReminderOffset={getReminderOffset}
					parseDateValue={parseDateValue}
				/>
			</ModalContent>
		</Modal>
	);
};
