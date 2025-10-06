import { Modal, ModalContent } from '@heroui/react';

import type { CalendarEvent } from 'entities/CalendarEvent';

import { EventDetails } from './EventDetails';

type Props = {
	event: CalendarEvent;
	isEditable: boolean;

	onEdit: (event: CalendarEvent) => void;

	isOpen: boolean;
	onOpenChange: () => void;
};

export const EventDetailsModal = (props: Props) => {
	const { event, isEditable, onEdit, isOpen, onOpenChange } = props;

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<EventDetails isEditable={isEditable} event={event} onEdit={onEdit} />
			</ModalContent>
		</Modal>
	);
};
