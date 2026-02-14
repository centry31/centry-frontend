import { useCallback } from 'react';
import type { EventChangeArg } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents, useUpdateCalendarEvent } from 'entities/CalendarEvent';
import { useGetSpace, useGetUserSpaces } from 'entities/Space';

import { CurrentSpaceIdController } from 'shared/lib';

export const useCalendarEventsSync = () => {
	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';

	const { data: currentSpace } = useGetSpace({ spaceId: currentSpaceId });
	const { data: userSpaces, isLoading: isSpacesLoading } = useGetUserSpaces();
	const {
		data: events,
		mutate: mutateEvents,
		isLoading: isEventsLoading,
	} = useGetCalendarEvents();
	const { request: updateEvent } = useUpdateCalendarEvent();

	const patchEventsList = useCallback(
		(updated: CalendarEvent | undefined) =>
			mutateEvents(
				(prev) => {
					if (!prev || !updated) return prev;

					const idx = prev.findIndex((event) => event.id === updated.id);
					if (idx === -1) return [...prev, updated];

					const next = prev.slice();
					next[idx] = updated;
					return next;
				},
				{ revalidate: false },
			),
		[mutateEvents],
	);

	const handleChangeEvent = useCallback(
		(arg: EventChangeArg) => {
			const { event } = arg;
			const ext = event.extendedProps;

			updateEvent({
				id: event.id,
				start: event.startStr,
				end: event.endStr,
				title: event.title,
				description: ext.description,
				reminders: ext.reminders,
			}).then(patchEventsList);
		},
		[patchEventsList, updateEvent],
	);

	return {
		events,

		isEditable: currentSpace?.access === 'owner',
		hasUserSpaces: Boolean(userSpaces?.length),

		isEventsLoading,
		isSpacesLoading,

		onChangeEvent: handleChangeEvent,
	};
};
