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

		const response = await updateEvent({ ...updatedEvent, updateType: 'ONE' });
		if (!response) {
			rollbackEventChange();
			onCloseConfirm();
			return;
		}

		onUpdateSuccess();
	}, [onCloseConfirm, onUpdateSuccess, rollbackEventChange, updateEvent, updatedEvent]);

	const handleUpdateFeatureEvents = useCallback(async () => {
		if (!updatedEvent) return;

		const response = await updateEvent({ ...updatedEvent, updateType: 'FUTURE' });
		if (!response) {
			rollbackEventChange();
			onCloseConfirm();
			return;
		}

		onUpdateSuccess();
	}, [onCloseConfirm, onUpdateSuccess, rollbackEventChange, updateEvent, updatedEvent]);

	const handleChangeEvent = useCallback(
		(arg: EventChangeArg) => {
			const { event } = arg;
			const ext = event.extendedProps;

			const start = event.startStr;
			const end = event.endStr;
			const duration = getEventDurationFromStartAndEnd(start, end);

			const calendarEvent: CalendarEvent = {
				id: ext.eventId,
				orderIndex: event.extendedProps.orderIndex,
				start,
				duration,
				title: event.title,
				description: ext.description,
				reminders: ext.reminders,
				frequency: ext.frequency,
			};
			setUpdatedEvent(calendarEvent);
			setRevertChange(() => arg.revert);

			if (calendarEvent.frequency === 'NEVER') {
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
