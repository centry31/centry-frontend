import { useCallback } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import type { ZonedDateTime } from '@internationalized/date';

import type { UpdateCalendarEvent } from 'entities/CalendarEvent';
import {
	useDeleteCalendarEvent,
	useGetCalendarEvents,
	useUpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { CurrentSpaceIdController, safeParseAbsoluteToLocal } from 'shared/lib';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();

type Props = {
	eventId: string;
	defaultValues: UpdateCalendarEvent;
	onSuccess?: () => void;
};

export const useChangeCalendarEventForm = (props: Props) => {
	const { eventId, defaultValues, onSuccess } = props;

	const { control, getValues } = useForm<UpdateCalendarEvent>({ defaultValues });

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents();
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

	const handleUpdateCalendarEvent = useCallback(async () => {
		await updateCalendarEvent({
			id: eventId,
			title: title,
			description: description,
			start: start || DEFAULT_TIME_ISO_VALUE,
			end: end || DEFAULT_TIME_ISO_VALUE,
			reminders: reminderFields.map((field) => ({ offsetMinutes: field.offsetMinutes })),
		});

		mutateCalendarEvents();
		onSuccess?.();
	}, [
		description,
		end,
		eventId,
		mutateCalendarEvents,
		onSuccess,
		reminderFields,
		start,
		title,
		updateCalendarEvent,
	]);

	const handleDeleteCalendarEvent = useCallback(async () => {
		const deletedEvent = await deleteCalendarEvent({ eventId });
		if (!deletedEvent) return;

		mutateCalendarEvents((events) => {
			if (!events) return;
			return events.filter((calendarEvent) => calendarEvent.id !== deletedEvent.id);
		});
		onSuccess?.();
	}, [deleteCalendarEvent, eventId, mutateCalendarEvents, onSuccess]);

	return {
		title,
		description: description || '',

		start: start || DEFAULT_TIME_ISO_VALUE,
		end: end || DEFAULT_TIME_ISO_VALUE,

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
		onUpdateCalendarEvent: handleUpdateCalendarEvent,
		onDeleteCalendarEvent: handleDeleteCalendarEvent,

		getReminderOffset: (index: number) => getValues(`reminders.${index}.offsetMinutes`),
		parseDateValue: safeParseAbsoluteToLocal,
	};
};
