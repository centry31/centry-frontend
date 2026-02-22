import { useCallback, useState } from 'react';
import type { EventChangeArg } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents, useUpdateCalendarEvent } from 'entities/CalendarEvent';

import { getEventDurationFromStartAndEnd } from 'shared/lib';

type Props = {
	start: Date;
	end: Date;

	onOpenConfirm: () => void;
	onCloseConfirm: () => void;
};

export const useChangeCalendarEvent = (props: Props) => {
	const { start, end, onOpenConfirm, onCloseConfirm } = props;

	const [updatedEvent, setUpdatedEvent] = useState<CalendarEvent>();
	const [revertChange, setRevertChange] = useState<(() => void) | undefined>();

	const { mutate: mutateEvents } = useGetCalendarEvents({ start, end });
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
		await updateEvent({
			...updatedEvent,
			scope: updatedEvent.recurrence.type === 'NONE' ? 'SERIES' : 'THIS',
			eventId: updatedEvent.eventId,
		});
		onUpdateSuccess();
	}, [onUpdateSuccess, updateEvent, updatedEvent]);

	const handleUpdateFeatureEvents = useCallback(async () => {
		if (!updatedEvent) return;
		await updateEvent({
			...updatedEvent,
			scope: 'THIS_AND_FUTURE',
			eventId: updatedEvent.eventId,
		});
		onUpdateSuccess();
	}, [onUpdateSuccess, rollbackEventChange, updateEvent, updatedEvent]);

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
				handleUpdateOneEvent();
				return;
			}
			onOpenConfirm();
		},
		[handleUpdateOneEvent, onOpenConfirm],
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
