import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { EventChangeArg } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents, useUpdateCalendarEvent } from 'entities/CalendarEvent';

import { getEventDurationFromStartAndEnd, notifySuccess } from 'shared/lib';

type Props = {
	start: Date;
	end: Date;

	onOpenConfirm: () => void;
	onCloseConfirm: () => void;
};

export const useChangeCalendarEvent = (props: Props) => {
	const { start, end, onOpenConfirm, onCloseConfirm } = props;

	const { spaceId = '' } = useParams();

	const [updatedEvent, setUpdatedEvent] = useState<CalendarEvent>();
	const [revertChange, setRevertChange] = useState<(() => void) | undefined>();

	const { mutate: mutateEvents } = useGetCalendarEvents({ spaceId, start, end });
	const { request: updateEvent, isLoading: isEventUpdating } = useUpdateCalendarEvent();

	const onUpdateSuccess = useCallback(() => {
		mutateEvents();
		setUpdatedEvent(undefined);
		setRevertChange(undefined);
		onCloseConfirm();
	}, [mutateEvents, onCloseConfirm]);

	const rollbackEventChange = useCallback(() => {
		revertChange?.();
		setUpdatedEvent(undefined);
		setRevertChange(undefined);
	}, [revertChange]);

	const handleUpdateOneEvent = useCallback(async () => {
		if (!updatedEvent) return;
		const result = await updateEvent({
			...updatedEvent,
			scope: updatedEvent.recurrence.type === 'NONE' ? 'SERIES' : 'THIS',
			spaceId,
			eventId: updatedEvent.eventId,
		});
		if (result === undefined) return;
		onUpdateSuccess();
		notifySuccess('Событие обновлено');
	}, [onUpdateSuccess, spaceId, updateEvent, updatedEvent]);

	const handleUpdateFeatureEvents = useCallback(async () => {
		if (!updatedEvent) return;
		const result = await updateEvent({
			...updatedEvent,
			scope: 'THIS_AND_FUTURE',
			spaceId,
			eventId: updatedEvent.eventId,
		});
		if (result === undefined) return;
		onUpdateSuccess();
		notifySuccess('Событие обновлено');
	}, [onUpdateSuccess, spaceId, updateEvent, updatedEvent]);

	const handleChangeEvent = useCallback(
		(arg: EventChangeArg) => {
			const { event } = arg;
			const ext = event.extendedProps;

			const start = event.startStr;
			const end = event.endStr;
			const duration = getEventDurationFromStartAndEnd(start, end);

			const calendarEvent: CalendarEvent = {
				eventId: ext.eventId,
				occurrenceStart: ext.occurrenceStart,
				start,
				duration,
				title: event.title,
				description: ext.description,
				timeZone: ext.timeZone,
				recurrence: ext.recurrence,
				reminders: ext.reminders,
			};
			setUpdatedEvent(calendarEvent);
			setRevertChange(() => arg.revert);

			if (calendarEvent.recurrence.type === 'NONE') {
				updateEvent({
					...calendarEvent,
					scope: calendarEvent.recurrence.type === 'NONE' ? 'SERIES' : 'THIS',
					spaceId,
					eventId: calendarEvent.eventId,
				})
					.then((result) => {
						if (result === undefined) return;
						onUpdateSuccess();
						notifySuccess('Событие обновлено');
					});
				return;
			}
			onOpenConfirm();
		},
		[onOpenConfirm, onUpdateSuccess, spaceId, updateEvent],
	);

	const handleCancelChangeEvents = useCallback(() => {
		rollbackEventChange();
		onCloseConfirm();
	}, [onCloseConfirm, rollbackEventChange]);

	return {
		isEventUpdating,

		onChangeEvent: handleChangeEvent,
		onCancelChangeEvents: handleCancelChangeEvents,

		onUpdateOneEvent: handleUpdateOneEvent,
		onUpdateFeatureEvents: handleUpdateFeatureEvents,
	};
};
