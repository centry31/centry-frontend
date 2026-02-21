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
		frequency,
		repeatUntil,

		reminderFields,
		isSpaceHasTelegramChats,
		isCreating,

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
		onChangeRepeatUntil,

		onCreateCalendarEvent,

		getReminderOffset,
	} = useCreateCalendarEventForm({ defaultValues, onSuccess });

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			shouldBlockScroll={false}
			scrollBehavior={'outside'}
		>
			<ModalContent>
				<CreateCalendarEventForm
					title={title}
					description={description}
					//
					start={start}
					end={end}
					frequency={frequency}
					repeatUntil={repeatUntil}
					//
					reminderFields={reminderFields}
					isSpaceHasTelegramChats={isSpaceHasTelegramChats}
					isCreating={isCreating}
					//
					isNotifyMessage={isNotifyMessage}
					onToggleIsNotifyMessage={onToggleIsNotifyMessage}
					notifyMessage={notifyMessage}
					onChangeNotifyMessage={onChangeNotifyMessage}
					//
					onChangeTitle={onChangeTitle}
					onChangeDescription={onChangeDescription}
					onAddReminder={onAddReminder}
					onRemoveReminder={onRemoveReminder}
					onCreateCalendarEvent={onCreateCalendarEvent}
					onChangeStart={onChangeStart}
					onChangeEnd={onChangeEnd}
					onChangeFrequency={onChangeFrequency}
					onChangeRepeatUntil={onChangeRepeatUntil}
					//
					getReminderOffset={getReminderOffset}
				/>
			</ModalContent>
		</Modal>
	);
};
