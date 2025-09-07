import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

import { CreateCalendarEventForm } from '../CreateCalendarEventForm/CreateCalendarEventForm';

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;

	initialFormValues: UpdateCalendarEvent;
};

export const CreateCalendarEventModal = (props: Props) => {
	const { initialFormValues, isOpen, onOpenChange } = props;

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>Создать событие</ModalHeader>

				<ModalBody>
					<CreateCalendarEventForm
						initialFormValues={initialFormValues}
						onOpenModalChange={onOpenChange}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
