import { useCallback, useState } from 'react';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';

import type { CalendarEvent, UpdateCalendarEvent } from 'entities/CalendarEvent';

const DEFAULT_EVENT_DATA: CalendarEvent = {
	id: '',
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	reminders: [],
};

const DEFAULT_EVENT_DRAFT: UpdateCalendarEvent = {
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	reminders: [],
};

type Props = {
	onOpenCreate: () => void;
	onOpenDetails: () => void;
	onOpenEdit: () => void;
	onCloseDetails: () => void;
};

export const useCalendarModalState = (props: Props) => {
	const { onOpenCreate, onOpenDetails, onOpenEdit, onCloseDetails } = props;

	const [eventDetails, setEventDetails] = useState<CalendarEvent>(DEFAULT_EVENT_DATA);
	const [createDefaults, setCreateDefaults] = useState<UpdateCalendarEvent>(DEFAULT_EVENT_DRAFT);
	const [editDefaults, setEditDefaults] = useState<CalendarEvent>(DEFAULT_EVENT_DATA);

	const handleSelectSlot = useCallback(
		(arg: DateSelectArg) => {
			setCreateDefaults({
				title: '',
				description: '',
				start: arg.startStr,
				end: arg.endStr,
				reminders: [],
			});
			onOpenCreate();
		},
		[onOpenCreate],
	);

	const handleClickEvent = useCallback(
		(arg: EventClickArg) => {
			const event = arg.event;

			setEventDetails({
				id: event.id,
				start: event.startStr,
				end: event.endStr,
				title: event.title,
				description: event.extendedProps.description,
				reminders: event.extendedProps.reminders,
			});

			onOpenDetails();
		},
		[onOpenDetails],
	);

	const handleEditEventModal = useCallback(
		(event: CalendarEvent) => {
			setEditDefaults(event);
			onOpenEdit();
			onCloseDetails();
		},
		[onCloseDetails, onOpenEdit],
	);

	return {
		eventDetails,
		createDefaults,
		editDefaults,

		onSelectSlot: handleSelectSlot,
		onClickEvent: handleClickEvent,
		onEditEventModal: handleEditEventModal,
	};
};
