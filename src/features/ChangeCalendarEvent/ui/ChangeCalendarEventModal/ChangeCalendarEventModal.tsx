import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

import { ChangeCalendarEventForm } from '../ChangeCalendarEventForm/ChangeCalendarEventForm';

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;

	eventId: string;
	initialFormValues: UpdateCalendarEvent;
};

export const ChangeCalendarEventModal = (props: Props) => {
	const { eventId, initialFormValues, isOpen, onOpenChange } = props;

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>Редактировать событие</ModalHeader>

				<ModalBody>
					<ChangeCalendarEventForm
						eventId={eventId}
						initialFormValues={initialFormValues}
						onOpenModalChange={onOpenChange}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
