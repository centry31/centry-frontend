import { useCallback, useState } from 'react';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';

import type {
	CalendarEvent,
	CalendarEventRecurrence,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';

import {
	getEventDurationFromStartAndEnd,
	getEventEndFromStartAndDuration,
	normalizeEventDurationMinutes,
} from 'shared/lib';

const DEFAULT_EVENT_DURATION_MINUTES = normalizeEventDurationMinutes();
const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const DEFAULT_RECURRENCE: CalendarEventRecurrence = { type: 'NONE' };

type EditEventDefaults = UpdateCalendarEvent & {
	eventId: string;
	occurrenceStart: string;
};

const getDurationFromClickedEvent = (arg: EventClickArg) => {
	const { event } = arg;

	if (Number.isFinite(event.extendedProps.duration)) {
		return normalizeEventDurationMinutes(event.extendedProps.duration);
	}

	return getEventDurationFromStartAndEnd(event.startStr, event.endStr);
};

const DEFAULT_EVENT_DATA: CalendarEvent = {
	eventId: '',
	occurrenceStart: new Date().toISOString(),
	title: '',
	description: '',
	start: new Date().toISOString(),
	duration: DEFAULT_EVENT_DURATION_MINUTES,
	timeZone: DEFAULT_TIME_ZONE,
	recurrence: DEFAULT_RECURRENCE,
	reminders: [],
};

const DEFAULT_EVENT_CREATE: CreateCalendarEvent = {
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	timeZone: DEFAULT_TIME_ZONE,
	recurrence: DEFAULT_RECURRENCE,
	reminders: [],
};

const DEFAULT_EVENT_UPDATE: EditEventDefaults = {
	eventId: '',
	occurrenceStart: new Date().toISOString(),
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	timeZone: DEFAULT_TIME_ZONE,
	recurrence: DEFAULT_RECURRENCE,
	reminders: [],
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
				timeZone: DEFAULT_TIME_ZONE,
				recurrence: DEFAULT_RECURRENCE,
				reminders: [],
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
				eventId: event.extendedProps.eventId,
				occurrenceStart: event.extendedProps.occurrenceStart,
				title: event.title,
				description: event.extendedProps.description,
				start: event.startStr,
				duration: durationMinutes,
				timeZone: event.extendedProps.timeZone,
				recurrence: event.extendedProps.recurrence,
				reminders: event.extendedProps.reminders,
			});

			onOpenDetails();
		},
		[onOpenDetails],
	);

	const handleEditEventModal = useCallback(
		(event: CalendarEvent) => {
			setEditDefaults({
				eventId: event.eventId,
				occurrenceStart: event.occurrenceStart,
				title: event.title,
				description: event.description,
				start: event.start,
				end: getEventEndFromStartAndDuration(event.start, event.duration),
				timeZone: event.timeZone,
				recurrence: event.recurrence,
				reminders: event.reminders,
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
