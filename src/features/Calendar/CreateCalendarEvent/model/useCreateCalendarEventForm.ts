import { useCallback } from 'react';
import { useController, useFieldArray, useForm } from 'react-hook-form';
import type { ZonedDateTime } from '@internationalized/date';

import { useCalendarViewStore } from 'entities/Calendar';
import type { CalendarEventFrequency, CreateCalendarEvent } from 'entities/CalendarEvent';
import { useCreateCalendarEvent, useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import {
	CurrentSpaceIdController,
	getEventDurationFromStartAndEnd,
	safeParseAbsoluteToLocal,
} from 'shared/lib';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();

type Props = {
	defaultValues: CreateCalendarEvent;
	onSuccess?: () => void;
};

export const useCreateCalendarEventForm = (props: Props) => {
	const { defaultValues, onSuccess } = props;

	const { control, getValues } = useForm<CreateCalendarEvent>({ defaultValues });

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';
	const { currentDate } = useCalendarViewStore();

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents({
		start: currentDate.start,
		end: currentDate.end,
	});
	const { data: currentSpace } = useGetSpace({ spaceId: currentSpaceId });
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
		field: { value: frequency, onChange: onChangeFrequency },
	} = useController({ control, name: 'frequency', defaultValue: 'NEVER' });

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

	const handleChangeFrequency = useCallback(
		(frequency: CalendarEventFrequency) => {
			onChangeFrequency(frequency);
		},
		[onChangeFrequency],
	);

	const handleCreateCalendarEvent = useCallback(async () => {
		const durationMinutes = getEventDurationFromStartAndEnd(start, end);

		const payload = {
			title: title || '',
			description: description || '',

			start,
			duration: durationMinutes,
			frequency: frequency || 'NEVER',

			reminders: reminderFields.map((field) => ({ offsetMinutes: field.offsetMinutes })),

			notifyMessage,
			isNotifyMessage,
		};

		const createdEvent = await createCalendarEvent(payload);
		if (!createdEvent) return;

		mutateCalendarEvents((events) => {
			if (!events) return;
			return [...events, createdEvent];
		});
		onSuccess?.();
	}, [
		createCalendarEvent,
		description,
		end,
		frequency,
		isNotifyMessage,
		mutateCalendarEvents,
		notifyMessage,
		onSuccess,
		reminderFields,
		start,
		title,
	]);

	return {
		title: title || '',
		description: description || '',

		start,
		end,
		frequency,

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
		onChangeFrequency: handleChangeFrequency,

		getReminderOffset: (index: number) => getValues(`reminders.${index}.offsetMinutes`),
		parseDateValue: safeParseAbsoluteToLocal,
	};
};
