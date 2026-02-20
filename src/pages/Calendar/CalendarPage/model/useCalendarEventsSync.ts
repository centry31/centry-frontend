import { useCallback, useMemo } from 'react';
import type { EventChangeArg, EventInput } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents, useUpdateCalendarEvent } from 'entities/CalendarEvent';
import { useGetSpace, useGetUserSpaces } from 'entities/Space';

import {
	CurrentSpaceIdController,
	getEventDurationFromStartAndEnd,
	getEventEndFromStartAndDuration,
	normalizeEventDurationMinutes,
} from 'shared/lib';

const prepareEvents = (events: CalendarEvent[]) => {
	return events.map((event) => {
		const id = `${event.id}.${event.orderIndex}`;
		const fullCalendarEvent: EventInput = {
			id,
			title: event.title,

			start: event.start,
			duration: event.duration,

			extendedProps: {
				eventId: event.id,
				description: event.description,
				reminders: event.reminders,
				frequency: event.frequency,
				orderIndex: event.orderIndex,
			},
		};
		return fullCalendarEvent;
	});
};

type Props = {
	start: Date;
	end: Date;
};

export const useCalendarEventsSync = (props: Props) => {
	const { start, end } = props;

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';

	const { data: currentSpace } = useGetSpace({ spaceId: currentSpaceId });
	const { data: userSpaces, isLoading: isSpacesLoading } = useGetUserSpaces();
	const {
		data: events = [],
		mutate: mutateEvents,
		isLoading: isEventsLoading,
	} = useGetCalendarEvents({ start, end });
	const { request: updateEvent } = useUpdateCalendarEvent();

	const handleChangeEvent = useCallback(
		(arg: EventChangeArg) => {
			const { event } = arg;
			const ext = event.extendedProps;
			const start = event.startStr || event.start?.toISOString() || new Date().toISOString();
			const fallbackDuration = normalizeEventDurationMinutes(ext.duration);
			const end = getEventEndFromStartAndDuration(start, fallbackDuration);
			const duration = getEventDurationFromStartAndEnd(start, end, fallbackDuration);

			// TODO: типизировать extendedProps
			updateEvent({
				id: ext.eventId,
				orderIndex: event.extendedProps.orderIndex,
				start,
				duration,
				title: event.title,
				description: ext.description,
				reminders: ext.reminders,
				frequency: ext.frequency,
				updateType: 'ONE',
			}).then(() => mutateEvents());
		},
		[updateEvent],
	);

	const preparedEvents = useMemo(() => prepareEvents(events), [events]);

	return {
		events: preparedEvents,

		isEditable: currentSpace?.access === 'owner',
		hasUserSpaces: Boolean(userSpaces?.length),

		isEventsLoading,
		isSpacesLoading,

		onChangeEvent: handleChangeEvent,
	};
};
