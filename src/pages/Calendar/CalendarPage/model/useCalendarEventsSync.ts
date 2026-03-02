import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { EventInput } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { getEventEndFromStartAndDuration } from 'shared/lib';

const prepareEvents = (events: CalendarEvent[]) => {
	return events.map((event) => {
		const id = `${event.id}:${event.start}`;
		const fullCalendarEvent: EventInput = {
			id,
			title: event.title,

			start: event.start,
			end: getEventEndFromStartAndDuration(event.start, event.duration),

			// TODO: типизировать
			extendedProps: {
				id: event.id,
				description: event.description,
				duration: event.duration,
				reminders: event.reminders,
				frequency: event.frequency,
				until: event.until,
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

	const { spaceId = '' } = useParams();

	const { data: currentSpace } = useGetSpace({ spaceId });
	const { data: events = [], isLoading: isEventsLoading } = useGetCalendarEvents({
		spaceId,
		start,
		end,
	});

	const preparedEvents = useMemo(() => prepareEvents(events), [events]);

	return {
		events: preparedEvents,

		isEditable: currentSpace?.access === 'owner',
		isEventsLoading,
	};
};
