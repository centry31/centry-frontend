import { useCallback } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { ZonedDateTime } from '@internationalized/date';

import { useCalendarViewStore } from 'entities/Calendar';
import type { CalendarEventRecurrenceType, CreateCalendarEvent } from 'entities/CalendarEvent';
import { useCreateCalendarEvent, useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { getEventDurationFromStartAndEnd, notifySuccess } from 'shared/lib';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();
const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

type Props = {
	defaultValues: CreateCalendarEvent;
	onSuccess?: () => void;
};

export const useCreateCalendarEventForm = (props: Props) => {
	const { defaultValues, onSuccess } = props;

	const { control, getValues } = useForm<CreateCalendarEvent>({ defaultValues });

	const { spaceId = '' } = useParams();
	const { currentDate } = useCalendarViewStore();

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents({
		spaceId,
		start: currentDate.start,
		end: currentDate.end,
	});
	const { data: currentSpace } = useGetSpace({ spaceId });
	const { request: createCalendarEvent, isLoading: isCreating } = useCreateCalendarEvent();

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
		field: { value: isNotifyMessage, onChange: onToggleIsNotifyMessage },
	} = useController({ control, name: 'isNotifyMessage' });
	const {
		field: { value: notifyMessage, onChange: onChangeNotifyMessage },
	} = useController({ control, name: 'notifyMessage' });

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
		(zdt?: ZonedDateTime | null) => {
			if (!zdt) return;
			onChangeStart(zdt.toAbsoluteString());
		},
		[onChangeStart],
	);

	const handleChangeEnd = useCallback(
		(zdt?: ZonedDateTime | null) => {
			if (!zdt) return;
			onChangeEnd(zdt.toAbsoluteString());
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
		(index: number) => {
			removeReminder(index);
		},
		[removeReminder],
	);

	const handleToggleIsNotifyMessage = useCallback(() => {
		onToggleIsNotifyMessage(!isNotifyMessage);
	}, [onToggleIsNotifyMessage, isNotifyMessage]);

	const handleChangeNotifyMessage = useCallback(
		(message: string) => {
			onChangeNotifyMessage(message);
		},
		[onChangeNotifyMessage],
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

	const handleCreateCalendarEvent = useCallback(async () => {
		const durationMinutes = getEventDurationFromStartAndEnd(start, end);

		const createdEvent = await createCalendarEvent({
			spaceId,
			title,
			description,

			start,
			duration: durationMinutes,
			timeZone: timeZone || DEFAULT_TIME_ZONE,
			recurrence: {
				type: recurrenceType || 'NONE',
				until: recurrenceUntil,
			},

			reminders: reminderFields.map((field) => ({ offsetMinutes: field.offsetMinutes })),

			notifyMessage,
			isNotifyMessage,
		});
		if (createdEvent === undefined) return;
		mutateCalendarEvents();
		notifySuccess('Событие создано');
		onSuccess?.();
	}, [
		createCalendarEvent,
		description,
		end,
		isNotifyMessage,
		mutateCalendarEvents,
		notifyMessage,
		onSuccess,
		recurrenceType,
		recurrenceUntil,
		reminderFields,
		spaceId,
		start,
		timeZone,
		title,
	]);

	return {
		title,
		description: description || '',

		start,
		end,
		recurrenceType,
		recurrenceUntil,

		reminderFields,
		isSpaceHasTelegramChats: Boolean(currentSpace?.hasTelegramChats),
		isCreating,

		isNotifyMessage,
		onToggleIsNotifyMessage: handleToggleIsNotifyMessage,

		notifyMessage,
		onChangeNotifyMessage: handleChangeNotifyMessage,

		onChangeTitle: handleChangeTitle,
		onChangeDescription: handleChangeDescription,
		onChangeStart: handleChangeStart,
		onChangeEnd: handleChangeEnd,
		onAddReminder: handleAddReminder,
		onRemoveReminder: handleRemoveReminder,
		onCreateCalendarEvent: handleCreateCalendarEvent,
		onChangeRecurrenceType: handleChangeRecurrenceType,
		onChangeRecurrenceUntil: handleChangeRecurrenceUntil,

		getReminderOffset: (index: number) => getValues(`reminders.${index}.offsetMinutes`),
	};
};
