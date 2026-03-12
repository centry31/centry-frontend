import { Modal, ModalContent } from '@heroui/react';

import {
	UpdateCalendarEventForm,
	useChangeCalendarEventForm,
} from 'features/Calendar/UpdateCalendarEvent';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

type Props = {
	eventId: string;

	defaultValues: UpdateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const UpdateCalendarEventModal = (props: Props) => {
	const { isOpen, onOpenChange, defaultValues, eventId, onSuccess } = props;

	const {
		title,
		description,

		start,
		end,
		frequency,
		until,

		reminderFields,
		isSpaceHasTelegramChats,

		isUpdating,

		isNotifyMessage,
		onToggleIsNotifyMessage,

		notifyMessage,
		onChangeNotifyMessage,

		onChangeTitle,
		onChangeDescription,
		onChangeStart,
		onChangeEnd,
		onAddReminder,
		onRemoveReminder,
		onChangeFrequency,
		onChangeUntil,

		onUpdateCalendarEvent,

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
				<UpdateCalendarEventForm
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
					isSpaceHasTelegramChats={isSpaceHasTelegramChats}
					//
					isUpdating={isUpdating}
					//
					isNotifyMessage={isNotifyMessage}
					onToggleIsNotifyMessage={onToggleIsNotifyMessage}
					notifyMessage={notifyMessage}
					onChangeNotifyMessage={onChangeNotifyMessage}
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
					//
					getReminderOffset={getReminderOffset}
				/>
			</ModalContent>
		</Modal>
	);
};
