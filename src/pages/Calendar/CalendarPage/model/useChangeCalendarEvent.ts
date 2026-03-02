import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { EventChangeArg } from '@fullcalendar/core';

import type { CalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents, useUpdateCalendarEvent } from 'entities/CalendarEvent';

import { getEventDurationFromStartAndEnd, notifySuccess } from 'shared/lib';

type PendingUpdateEvent = CalendarEvent & {
	oldStart: string;
};

type Props = {
	start: Date;
	end: Date;

	onOpenConfirm: () => void;
	onCloseConfirm: () => void;
};

export const useChangeCalendarEvent = (props: Props) => {
	const { start, end, onOpenConfirm, onCloseConfirm } = props;

	const { spaceId = '' } = useParams();

	const [updatedEvent, setUpdatedEvent] = useState<PendingUpdateEvent>();
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

			scope: 'THIS',
			frequency: 'NEVER',

			oldStart: updatedEvent.oldStart,
			newStart: updatedEvent.start,

			spaceId,
			eventId: updatedEvent.id,
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

			oldStart: updatedEvent.oldStart,
			newStart: updatedEvent.start,

			spaceId,
			eventId: updatedEvent.id,
		});
		if (result === undefined) return;
		onUpdateSuccess();
		notifySuccess('Событие обновлено');
	}, [onUpdateSuccess, spaceId, updateEvent, updatedEvent]);

	const handleChangeEvent = useCallback(
		(arg: EventChangeArg) => {
			const { event } = arg;
			const ext = event.extendedProps;

			const updatedStart = event.startStr;
			const updatedEnd = event.endStr;
			const duration = getEventDurationFromStartAndEnd(updatedStart, updatedEnd);
			const frequency = ext.frequency;

			const calendarEvent: PendingUpdateEvent = {
				id: ext.id,
				oldStart: arg.oldEvent.startStr,
				start: updatedStart,
				duration,
				title: event.title,
				description: ext.description,
				timeZone: ext.timeZone,
				frequency,
				until: ext.until,
				reminders: ext.reminders,
			};
			setUpdatedEvent(calendarEvent);
			setRevertChange(() => arg.revert);

			if (calendarEvent.frequency === 'NEVER') {
				updateEvent({
					...calendarEvent,
					scope: 'THIS',
					oldStart: calendarEvent.oldStart,
					newStart: calendarEvent.start,
					spaceId,
					eventId: calendarEvent.id,
				}).then((result) => {
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
