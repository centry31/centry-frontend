import { Modal, ModalContent } from '@heroui/react';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';

import { ChangeCalendarEventForm } from './ChangeCalendarEventForm';

type Props = {
	eventId: string;
	initialFormValues: UpdateCalendarEvent;
	onSuccess: () => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const ChangeCalendarEventModal = (props: Props) => {
	const { isOpen, onOpenChange, eventId, initialFormValues, onSuccess } = props;

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<ChangeCalendarEventForm
					eventId={eventId}
					initialFormValues={initialFormValues}
					onSuccess={onSuccess}
				/>
			</ModalContent>
		</Modal>
	);
};
