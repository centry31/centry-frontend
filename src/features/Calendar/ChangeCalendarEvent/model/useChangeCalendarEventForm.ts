import { useCallback } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { ZonedDateTime } from '@internationalized/date';

import { useCalendarViewStore } from 'entities/Calendar';
import type {
	CalendarEventFrequency,
	CreateUpdateCalendarEventScope,
	DeleteCalendarEventScope,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';
import {
	useDeleteCalendarEvent,
	useGetCalendarEvents,
	useUpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { getEventDurationFromStartAndEnd, notifySuccess } from 'shared/lib';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();
const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

type Props = {
	eventId: string;
	defaultValues: UpdateCalendarEvent;
	onSuccess?: () => void;
};

export const useChangeCalendarEventForm = (props: Props) => {
	const { eventId, defaultValues, onSuccess } = props;

	const { control, getValues } = useForm<UpdateCalendarEvent>({ defaultValues });

	const { spaceId = '' } = useParams();
	const { currentDate } = useCalendarViewStore();

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents({
		spaceId,
		start: currentDate.start,
		end: currentDate.end,
	});
	const { request: updateCalendarEvent, isLoading: isUpdating } = useUpdateCalendarEvent();
	const { request: deleteCalendarEvent, isLoading: isDeleting } = useDeleteCalendarEvent();
	const { data: currentSpace } = useGetSpace({ spaceId });

	const {
		field: { value: title, onChange: onChangeTitle },
	} = useController({ control, name: 'title' });
	const {
		field: { value: description, onChange: onChangeDescription },
	} = useController({ control, name: 'description' });
	const {
		field: { value: start, onChange: onChangeStart },
	} = useController({ control, name: 'start', defaultValue: DEFAULT_TIME_ISO_VALUE });
	const {
		field: { value: end, onChange: onChangeEnd },
	} = useController({ control, name: 'end', defaultValue: DEFAULT_TIME_ISO_VALUE });
	const {
		field: { value: frequency, onChange: onChangeFrequency },
	} = useController({ control, name: 'frequency', defaultValue: 'NEVER' });
	const {
		field: { value: until, onChange: onChangeUntil },
	} = useController({ control, name: 'until' });
	const {
		field: { value: timeZone },
	} = useController({ control, name: 'timeZone', defaultValue: DEFAULT_TIME_ZONE });

	const {
		fields: reminderFields,
		append: appendReminder,
		remove: removeReminder,
	} = useFieldArray({
		control,
		name: 'reminders',
	});

	const handleChangeTitle = useCallback(
		(value: string) => {
			onChangeTitle(value);
		},
		[onChangeTitle],
	);

	const handleChangeDescription = useCallback(
		(value: string) => {
			onChangeDescription(value);
		},
		[onChangeDescription],
	);

	const handleChangeStart = useCallback(
		(value?: ZonedDateTime | null) => {
			if (!value) return;
			onChangeStart(value.toAbsoluteString());
		},
		[onChangeStart],
	);

	const handleChangeEnd = useCallback(
		(value?: ZonedDateTime | null) => {
			if (!value) return;
			onChangeEnd(value.toAbsoluteString());
		},
		[onChangeEnd],
	);

	const handleAddReminder = useCallback(
		(minutes: number) => {
			const exists = (getValues('reminders') ?? []).some(
				(reminder) => reminder.offsetMinutes === minutes,
			);
			if (!exists) appendReminder({ offsetMinutes: minutes });
		},
		[appendReminder, getValues],
	);

	const handleRemoveReminder = useCallback(
		(index: number) => removeReminder(index),
		[removeReminder],
	);

	const handleChangeFrequency = useCallback(
		(value: CalendarEventFrequency) => {
			onChangeFrequency(value);
			if (value === 'NEVER') {
				onChangeUntil(undefined);
			}
		},
		[onChangeFrequency, onChangeUntil],
	);

	const handleChangeUntil = useCallback(
		(value?: ZonedDateTime | null) => {
			if (!value) {
				onChangeUntil(undefined);
				return;
			}
			onChangeUntil(value.toAbsoluteString());
		},
		[onChangeUntil],
	);

	const handleUpdateCalendarEvent = useCallback(
		async (scope: CreateUpdateCalendarEventScope) => {
			const durationMinutes = getEventDurationFromStartAndEnd(start, end);
			const actualScope = defaultValues.frequency === 'NEVER' ? 'THIS' : scope;

			const result = await updateCalendarEvent({
				spaceId,
				eventId,
				scope: actualScope,
				oldStart: defaultValues.start,
				newStart: start,
				title,
				description,
				duration: durationMinutes,
				timeZone: timeZone || DEFAULT_TIME_ZONE,
				frequency,
				until,
				reminders: reminderFields.map((field) => ({ offsetMinutes: field.offsetMinutes })),
			});
			if (result === undefined) return;

			mutateCalendarEvents();
			notifySuccess('Событие обновлено');
			onSuccess?.();
		},
		[
			start,
			end,
			defaultValues.frequency,
			defaultValues.start,
			updateCalendarEvent,
			spaceId,
			eventId,
			title,
			description,
			timeZone,
			frequency,
			until,
			reminderFields,
			mutateCalendarEvents,
			onSuccess,
		],
	);

	const handleDeleteCalendarEvent = useCallback(
		async (scope: DeleteCalendarEventScope) => {
			const actualScope = defaultValues.frequency === 'NEVER' ? 'THIS' : scope;

			const result = await deleteCalendarEvent({
				spaceId,
				eventId,
				scope: actualScope,
				start: defaultValues.start,
			});
			if (result === undefined) return;

			mutateCalendarEvents();
			notifySuccess('Событие удалено');
			onSuccess?.();
		},
		[
			defaultValues.frequency,
			defaultValues.start,
			deleteCalendarEvent,
			spaceId,
			eventId,
			mutateCalendarEvents,
			onSuccess,
		],
	);

	return {
		title,
		description: description || '',

		start,
		end,
		frequency,
		until,

		reminderFields,
		isRemindersActive: Boolean(currentSpace?.hasTelegramChats),

		isUpdating,
		isDeleting,

		onChangeTitle: handleChangeTitle,
		onChangeDescription: handleChangeDescription,
		onChangeStart: handleChangeStart,
		onChangeEnd: handleChangeEnd,
		onAddReminder: handleAddReminder,
		onRemoveReminder: handleRemoveReminder,
		onChangeFrequency: handleChangeFrequency,

		onUpdateCalendarEvent: handleUpdateCalendarEvent,
		onDeleteCalendarEvent: handleDeleteCalendarEvent,
		onChangeUntil: handleChangeUntil,

		getReminderOffset: (index: number) => getValues(`reminders.${index}.offsetMinutes`),
	};
};
