import { useCallback } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import type { ZonedDateTime } from '@internationalized/date';

import { useCalendarViewStore } from 'entities/Calendar';
import type {
	CalendarEventFrequency,
	UpdateCalendarEvent,
	UpdateCalendarEventType,
} from 'entities/CalendarEvent';
import {
	useDeleteCalendarEvent,
	useGetCalendarEvents,
	useUpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { CurrentSpaceIdController, getEventDurationFromStartAndEnd } from 'shared/lib';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();

type Props = {
	eventId: string;
	eventOrderIndex: number;
	defaultValues: UpdateCalendarEvent;
	onSuccess?: () => void;
};

export const useChangeCalendarEventForm = (props: Props) => {
	const { eventId, eventOrderIndex, defaultValues, onSuccess } = props;

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
		field: { value: frequency, onChange: onChangeFrequency },
	} = useController({ control, name: 'frequency', defaultValue: 'NEVER' });
	const {
		field: { value: repeatUntil, onChange: onChangeRepeatUntil },
	} = useController({ control, name: 'repeatUntil' });

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

	const handleChangeFrequency = useCallback(
		(frequency: CalendarEventFrequency) => {
			onChangeFrequency(frequency);
		},
		[onChangeFrequency],
	);

	const handleChangeRepeatUntil = useCallback(
		(zdt?: ZonedDateTime | null) => {
			if (!zdt) return;
			onChangeRepeatUntil(zdt.toAbsoluteString());
		},
		[onChangeRepeatUntil],
	);

	const handleUpdateCalendarEvent = useCallback(
		async (updateType: UpdateCalendarEventType) => {
			const durationMinutes = getEventDurationFromStartAndEnd(start, end);

			await updateCalendarEvent({
				id: eventId,
				orderIndex: eventOrderIndex,
				title: title || '',
				description: description || '',
				start,
				originalStart: defaultValues.start,
				duration: durationMinutes,
				reminders: reminderFields.map((field) => ({ offsetMinutes: field.offsetMinutes })),
				frequency: frequency || 'NEVER',
				updateType,
			});

			mutateCalendarEvents();
			onSuccess?.();
		},
		[
			description,
			end,
			eventId,
			frequency,
			mutateCalendarEvents,
			onSuccess,
			reminderFields,
			start,
			title,
			updateCalendarEvent,
		],
	);

	const handleDeleteCalendarEvent = useCallback(async () => {
		await deleteCalendarEvent({ eventId });

		mutateCalendarEvents();
		onSuccess?.();
	}, [deleteCalendarEvent, eventId, mutateCalendarEvents, onSuccess]);

	return {
		title,
		description: description || '',

		start,
		end,
		frequency,
		repeatUntil,

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
		onChangeRepeatUntil: handleChangeRepeatUntil,

		getReminderOffset: (index: number) => getValues(`reminders.${index}.offsetMinutes`),
	};
};
