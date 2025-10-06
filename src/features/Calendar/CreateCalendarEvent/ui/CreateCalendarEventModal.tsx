import { Modal, ModalContent } from '@heroui/react';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

import { CreateCalendarEventForm } from './CreateCalendarEventForm';

type Props = {
	initialFormValues: UpdateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const CreateCalendarEventModal = (props: Props) => {
	const { initialFormValues, onSuccess, isOpen, onOpenChange } = props;

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<CreateCalendarEventForm
					initialFormValues={initialFormValues}
					onSuccess={onSuccess}
				/>
			</ModalContent>
		</Modal>
	);
};
