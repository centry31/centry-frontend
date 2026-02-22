import { useMemo } from 'react';
import type { EventInput } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace, useGetUserSpaces } from 'entities/Space';

import { CurrentSpaceIdController, getEventEndFromStartAndDuration } from 'shared/lib';

const prepareEvents = (events: CalendarEvent[]) => {
	return events.map((event) => {
		const id = `${event.eventId}:${event.occurrenceStart}`;
		const fullCalendarEvent: EventInput = {
			id,
			title: event.title,

			start: event.start,
			end: getEventEndFromStartAndDuration(event.start, event.duration),

			// TODO: типизировать
			extendedProps: {
				eventId: event.eventId,
				occurrenceStart: event.occurrenceStart,
				description: event.description,
				duration: event.duration,
				reminders: event.reminders,
				recurrence: event.recurrence,
				timeZone: event.timeZone,
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
	const { data: events = [], isLoading: isEventsLoading } = useGetCalendarEvents({ start, end });

	const preparedEvents = useMemo(() => prepareEvents(events), [events]);

	return {
		events: preparedEvents,

		isEditable: currentSpace?.access === 'owner',
		hasUserSpaces: Boolean(userSpaces?.length),

		isEventsLoading,
		isSpacesLoading,
	};
};
