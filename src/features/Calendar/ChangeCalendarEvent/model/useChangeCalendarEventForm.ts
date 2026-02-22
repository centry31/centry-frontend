import { useCallback } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import type { ZonedDateTime } from '@internationalized/date';

import { useCalendarViewStore } from 'entities/Calendar';
import type {
	CalendarEventRecurrenceType,
	CalendarEventScope,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';
import {
	useDeleteCalendarEvent,
	useGetCalendarEvents,
	useUpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { CurrentSpaceIdController, getEventDurationFromStartAndEnd } from 'shared/lib';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();
const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

type Props = {
	eventId: string;
	occurrenceStart: string;
	defaultValues: UpdateCalendarEvent;
	onSuccess?: () => void;
};

export const useChangeCalendarEventForm = (props: Props) => {
	const { eventId, occurrenceStart, defaultValues, onSuccess } = props;

	const { control, getValues } = useForm<UpdateCalendarEvent>({ defaultValues });

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';

	const { currentDate } = useCalendarViewStore();

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents({
		start: currentDate.start,
		end: currentDate.end,
	});
	const { request: updateCalendarEvent, isLoading: isUpdating } = useUpdateCalendarEvent();
	const { request: deleteCalendarEvent, isLoading: isDeleting } = useDeleteCalendarEvent();
	const { data: currentSpace } = useGetSpace({ spaceId: currentSpaceId });

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
		field: { value: recurrenceType, onChange: onChangeRecurrenceType },
	} = useController({ control, name: 'recurrence.type', defaultValue: 'NONE' });
	const {
		field: { value: recurrenceUntil, onChange: onChangeRecurrenceUntil },
	} = useController({ control, name: 'recurrence.until' });
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
		(title: string) => {
			onChangeTitle(title);
		},
		[onChangeTitle],
	);

	const handleChangeDescription = useCallback(
		(description: string) => {
			onChangeDescription(description);
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

	const handleChangeRecurrenceType = useCallback(
		(type: CalendarEventRecurrenceType) => {
			onChangeRecurrenceType(type);
			if (type === 'NONE') {
				onChangeRecurrenceUntil(undefined);
			}
		},
		[onChangeRecurrenceType, onChangeRecurrenceUntil],
	);

	const handleChangeRecurrenceUntil = useCallback(
		(zdt?: ZonedDateTime | null) => {
			if (!zdt) {
				onChangeRecurrenceUntil(undefined);
				return;
			}
			onChangeRecurrenceUntil(zdt.toAbsoluteString());
		},
		[onChangeRecurrenceUntil],
	);

	const handleUpdateCalendarEvent = useCallback(
		async (scope: CalendarEventScope) => {
			const durationMinutes = getEventDurationFromStartAndEnd(start, end);

			const actualScope = defaultValues.recurrence.type === 'NONE' ? 'SERIES' : scope;
			await updateCalendarEvent({
				eventId,
				scope: actualScope,
				occurrenceStart: actualScope === 'SERIES' ? undefined : occurrenceStart,
				title: title || '',
				description: description || '',
				start,
				duration: durationMinutes,
				timeZone: timeZone || DEFAULT_TIME_ZONE,
				recurrence: {
					type: recurrenceType || 'NONE',
					until: recurrenceUntil,
				},
				reminders: reminderFields.map((field) => ({ offsetMinutes: field.offsetMinutes })),
			});

			mutateCalendarEvents();
			onSuccess?.();
		},
		[
			description,
			defaultValues.recurrence.type,
			end,
			eventId,
			mutateCalendarEvents,
			occurrenceStart,
			onSuccess,
			recurrenceType,
			recurrenceUntil,
			reminderFields,
			start,
			timeZone,
			title,
			updateCalendarEvent,
		],
	);

	const handleDeleteCalendarEvent = useCallback(
		async (scope: CalendarEventScope) => {
			const actualScope = defaultValues.recurrence.type === 'NONE' ? 'SERIES' : scope;
			await deleteCalendarEvent({
				eventId,
				scope: actualScope,
				occurrenceStart: actualScope === 'THIS' ? occurrenceStart : undefined,
			});

			mutateCalendarEvents();
			onSuccess?.();
		},
		[
			defaultValues.recurrence.type,
			deleteCalendarEvent,
			eventId,
			mutateCalendarEvents,
			occurrenceStart,
			onSuccess,
		],
	);

	return {
		title,
		description: description || '',

		start,
		end,
		recurrenceType,
		recurrenceUntil,

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
		onChangeRecurrenceType: handleChangeRecurrenceType,

		onUpdateCalendarEvent: handleUpdateCalendarEvent,
		onDeleteCalendarEvent: handleDeleteCalendarEvent,
		onChangeRecurrenceUntil: handleChangeRecurrenceUntil,

		getReminderOffset: (index: number) => getValues(`reminders.${index}.offsetMinutes`),
	};
};
