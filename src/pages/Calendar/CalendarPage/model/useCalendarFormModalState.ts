import { useCallback, useState } from 'react';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';

import type {
	CalendarEvent,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';

import {
	getEventDurationFromStartAndEnd,
	getEventEndFromStartAndDuration,
	normalizeEventDurationMinutes,
} from 'shared/lib';

const DEFAULT_EVENT_DURATION_MINUTES = normalizeEventDurationMinutes();

type EditEventDefaults = UpdateCalendarEvent & { id: string };

const getDurationFromClickedEvent = (arg: EventClickArg) => {
	const { event } = arg;

	if (Number.isFinite(event.extendedProps.duration)) {
		return normalizeEventDurationMinutes(event.extendedProps.duration);
	}

	return getEventDurationFromStartAndEnd(event.startStr, event.endStr);
};

const DEFAULT_EVENT_DATA: CalendarEvent = {
	id: '',
	orderIndex: 0,
	title: '',
	description: '',
	start: new Date().toISOString(),
	duration: DEFAULT_EVENT_DURATION_MINUTES,
	reminders: [],
	frequency: 'NEVER',
};

const DEFAULT_EVENT_CREATE: CreateCalendarEvent = {
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	reminders: [],
	frequency: 'NEVER',
};

const DEFAULT_EVENT_UPDATE: EditEventDefaults = {
	id: '',
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	reminders: [],
	frequency: 'NEVER',
};

type Props = {
	onOpenFormCreate: () => void;
	onOpenFormEdit: () => void;

	onOpenDetails: () => void;
	onCloseDetails: () => void;
};

export const useCalendarFormModalState = (props: Props) => {
	const { onOpenFormCreate, onOpenDetails, onOpenFormEdit, onCloseDetails } = props;

	const [eventDetails, setEventDetails] = useState<CalendarEvent>(DEFAULT_EVENT_DATA);
	const [createDefaults, setCreateDefaults] = useState<CreateCalendarEvent>(DEFAULT_EVENT_CREATE);
	const [editDefaults, setEditDefaults] = useState<EditEventDefaults>(DEFAULT_EVENT_UPDATE);

	const handleSelectSlot = useCallback(
		(arg: DateSelectArg) => {
			const end = getEventEndFromStartAndDuration(arg.startStr);
			setCreateDefaults({
				title: '',
				description: '',
				start: arg.startStr,
				end,
				reminders: [],
				frequency: 'NEVER',
			});
			onOpenFormCreate();
		},
		[onOpenFormCreate],
	);

	const handleClickEvent = useCallback(
		(arg: EventClickArg) => {
			const event = arg.event;
			const durationMinutes = getDurationFromClickedEvent(arg);

			setEventDetails({
				id: event.extendedProps.eventId,
				orderIndex: event.extendedProps.orderIndex,
				title: event.title,
				description: event.extendedProps.description,
				start: event.startStr,
				duration: durationMinutes,
				reminders: event.extendedProps.reminders,
				frequency: event.extendedProps.frequency,
				repeatUntil: event.extendedProps.repeatUntil,
			});

			onOpenDetails();
		},
		[onOpenDetails],
	);

	const handleEditEventModal = useCallback(
		(event: CalendarEvent) => {
			setEditDefaults({
				id: event.id,
				title: event.title,
				description: event.description,
				start: event.start,
				end: getEventEndFromStartAndDuration(event.start, event.duration),
				reminders: event.reminders,
				frequency: event.frequency,
				repeatUntil: event.repeatUntil,
			});

			onOpenFormEdit();
			onCloseDetails();
		},
		[onCloseDetails, onOpenFormEdit],
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
