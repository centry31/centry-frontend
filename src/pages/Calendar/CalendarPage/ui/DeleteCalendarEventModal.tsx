import { Modal, ModalContent } from '@heroui/react';

import {
	DeleteCalendarEventForm,
	useDeleteCalendarEventForm,
} from 'features/Calendar/DeleteCalendarEvent';

import type { CalendarEventFrequency } from 'entities/CalendarEvent';

type Props = {
	onSuccess: () => void;

	eventId: string;
	eventStart: string;
	eventFrequency: CalendarEventFrequency;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const DeleteCalendarEventModal = (props: Props) => {
	const { onSuccess, eventId, eventStart, eventFrequency, isOpen, onOpenChange } = props;

	const {
		isSpaceHasTelegramChats,

		isNotifyMessage,
		onToggleIsNotifyMessage,

		notifyMessage,
		onChangeNotifyMessage,

		isDeleting,
		onDeleteCalendarEvent,
	} = useDeleteCalendarEventForm({ eventId, eventStart, eventFrequency, onSuccess });

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<DeleteCalendarEventForm
					isNotifyMessage={isNotifyMessage}
					notifyMessage={notifyMessage}
					//
					isSpaceHasTelegramChats={isSpaceHasTelegramChats}
					eventFrequency={eventFrequency}
					//
					onToggleIsNotifyMessage={onToggleIsNotifyMessage}
					onChangeNotifyMessage={onChangeNotifyMessage}
					//
					isDeleting={isDeleting}
					onDeleteCalendarEvent={onDeleteCalendarEvent}
				/>
			</ModalContent>
		</Modal>
	);
};
