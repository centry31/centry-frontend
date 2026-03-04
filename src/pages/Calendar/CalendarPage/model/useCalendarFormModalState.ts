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
const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const DEFAULT_FREQUENCY = 'NEVER';

type EditEventDefaults = UpdateCalendarEvent & {
	eventId: string;
};

const getDurationFromClickedEvent = (arg: EventClickArg) => {
	const { event } = arg;

	if (Number.isFinite(event.extendedProps.duration)) {
		return normalizeEventDurationMinutes(event.extendedProps.duration);
	}

	return getEventDurationFromStartAndEnd(event.startStr, event.endStr);
};

const DEFAULT_EVENT_DATA: CalendarEvent = {
	id: '',
	title: '',
	description: '',
	start: new Date().toISOString(),
	duration: DEFAULT_EVENT_DURATION_MINUTES,
	timeZone: DEFAULT_TIME_ZONE,
	frequency: DEFAULT_FREQUENCY,
	reminders: [],
};

const DEFAULT_EVENT_CREATE: CreateCalendarEvent = {
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	timeZone: DEFAULT_TIME_ZONE,
	frequency: DEFAULT_FREQUENCY,
	reminders: [],
};

const DEFAULT_EVENT_UPDATE: EditEventDefaults = {
	eventId: '',
	title: '',
	description: '',
	start: new Date().toISOString(),
	end: new Date().toISOString(),
	timeZone: DEFAULT_TIME_ZONE,
	frequency: DEFAULT_FREQUENCY,
	reminders: [],
};

type Props = {
	onOpenFormCreate: () => void;
	onOpenFormEdit: () => void;
	onOpenFormDelete: () => void;

	onOpenDetails: () => void;
	onCloseDetails: () => void;
};

export const useCalendarFormModalState = (props: Props) => {
	const { onOpenFormCreate, onOpenDetails, onOpenFormEdit, onOpenFormDelete, onCloseDetails } =
		props;

	const [eventDetails, setEventDetails] = useState<CalendarEvent>(DEFAULT_EVENT_DATA);
	const [createDefaults, setCreateDefaults] = useState<CreateCalendarEvent>(DEFAULT_EVENT_CREATE);
	const [editDefaults, setEditDefaults] = useState<EditEventDefaults>(DEFAULT_EVENT_UPDATE);

	const handleSelectSlot = useCallback(
		(arg: DateSelectArg) => {
			setCreateDefaults({
				title: '',
				description: '',
				start: arg.startStr,
				end: arg.endStr,
				timeZone: DEFAULT_TIME_ZONE,
				frequency: DEFAULT_FREQUENCY,
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
				id: event.extendedProps.id,
				title: event.title,
				description: event.extendedProps.description,
				start: event.startStr,
				duration: durationMinutes,
				timeZone: event.extendedProps.timeZone,
				frequency: event.extendedProps.frequency || DEFAULT_FREQUENCY,
				until: event.extendedProps.until,
				reminders: event.extendedProps.reminders,
			});

			onOpenDetails();
		},
		[onOpenDetails],
	);

	const handleEditEventModal = useCallback(
		(event: CalendarEvent) => {
			setEditDefaults({
				eventId: event.id,
				title: event.title,
				description: event.description,
				start: event.start,
				end: getEventEndFromStartAndDuration(event.start, event.duration),
				timeZone: event.timeZone,
				frequency: event.frequency,
				until: event.until,
				reminders: event.reminders,
			});

			onOpenFormEdit();
			onCloseDetails();
		},
		[onCloseDetails, onOpenFormEdit],
	);

	const handleDeleteEventModal = useCallback(() => {
		onOpenFormDelete();
		onCloseDetails();
	}, [onCloseDetails, onOpenFormDelete]);

	return {
		eventDetails,
		createDefaults,
		editDefaults,

		onSelectSlot: handleSelectSlot,
		onClickEvent: handleClickEvent,
		onEditEventModal: handleEditEventModal,
		onDeleteEventModal: handleDeleteEventModal,
	};
};
