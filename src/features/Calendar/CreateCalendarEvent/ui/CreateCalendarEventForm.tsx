import { useController, useFieldArray, useForm } from 'react-hook-form';
import { Button, DateInput, Input } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';

import type {
	CalendarEvent,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import {
	CurrentSpaceIdController,
	formatMinutesOffset,
	safeParseAbsoluteToLocal,
} from 'shared/lib';

import { useCreateCalendarEvent } from '../api/useCreateCalendarEvent';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();
const REMINDERS_PRESETS = [1, 5, 15, 30, 60, 1440]; // 1m, 5m, 15m, 30m, 1h, 1d

type Props = {
	initialFormValues: Partial<UpdateCalendarEvent>;
	onSuccess?: () => void;
};

export const CreateCalendarEventForm = (props: Props) => {
	const { initialFormValues, onSuccess } = props;

	const defaultFormValues: CreateCalendarEvent = {
		title: '',
		description: '',
		start: DEFAULT_TIME_ISO_VALUE,
		end: DEFAULT_TIME_ISO_VALUE,
		reminders: [],
		...initialFormValues,
	};

	const { control, getValues } = useForm<CreateCalendarEvent>({
		defaultValues: defaultFormValues,
	});

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents();
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
		fields: reminderFields,
		append: appendReminder,
		remove: removeReminder,
	} = useFieldArray({
		control,
		name: 'reminders',
	});

	/**
	 * @summary <DateInput /> работает с ZoneDateTime типом, нужно это учитывать
	 *
	 * Работа с DateInput - компонент возвращает и принимает ZoneDateTime, поэтому для корректной работы
	 * нужно форматировать полученное значение, конвертируя в строку (ISO).
	 *
	 * Все передаваемые значения в компонент в качестве value также должны быть конвертированы в ZoneDateTime
	 * */
	const handleChangeStart = (zdt?: ZonedDateTime | null) => {
		if (!zdt) return;
		onChangeStart(zdt.toAbsoluteString());
	};
	const handleChangeEnd = (zdt?: ZonedDateTime | null) => {
		if (!zdt) return;
		onChangeEnd(zdt.toAbsoluteString());
	};

	const handleAddReminder = (minutes: number) => {
		const exists = (getValues('reminders') ?? []).some((r) => r.offsetMinutes === minutes);
		if (!exists) appendReminder({ offsetMinutes: minutes });
	};
	const handleRemoveReminder = (idx: number) => removeReminder(idx);

	const handleSuccessCreatingEvent = (created?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!created || !events) return;
			return [...events, created];
		});

		onSuccess?.();
	};

	const handleCreateCalendarEvent = () => {
		const event: CreateCalendarEvent = {
			title,
			description,
			start,
			end,
			reminders: reminderFields.map((r) => ({ offsetMinutes: r.offsetMinutes })),
		};
		createCalendarEvent({ event }).then(handleSuccessCreatingEvent);
	};

	const isRemindersActive = currentSpace?.hasActiveTgChats;

	return (
		<div className="p-4">
			<div className="mb-2 text-lg font-semibold">Создать событие</div>

			<div className="flex flex-col gap-4">
				<Input label="Название" value={title} onChange={onChangeTitle} />
				<Input label="Описание" value={description} onChange={onChangeDescription} />

				<DateInput
					label="Начало"
					value={safeParseAbsoluteToLocal(start)}
					onChange={handleChangeStart}
					hideTimeZone
				/>
				<DateInput
					label="Конец"
					value={safeParseAbsoluteToLocal(end)}
					onChange={handleChangeEnd}
					hideTimeZone
				/>

				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Напоминания</div>

					{!isRemindersActive && (
						<div className="rounded-lg bg-warning-50 px-3 py-2 text-sm text-warning-700">
							Чтобы добавлять напоминания, привяжите Telegram-чат в настройках
							пространства.
						</div>
					)}

					{/* пресеты */}
					<div className="flex flex-wrap gap-2">
						{REMINDERS_PRESETS.map((minutes) => (
							<Button
								key={minutes}
								size="sm"
								variant="flat"
								onPress={() => handleAddReminder(minutes)}
								disabled={!isRemindersActive}
							>
								{formatMinutesOffset(minutes)}
							</Button>
						))}
					</div>

					{/* текущие */}
					<div className="flex flex-wrap gap-2">
						{reminderFields.length === 0 && (
							<span className="text-sm text-neutral-500">Нет напоминаний</span>
						)}

						{reminderFields.length !== 0 &&
							reminderFields.map((f, idx) => (
								<Button
									key={f.id}
									size="sm"
									variant="flat"
									color="primary"
									onPress={() => handleRemoveReminder(idx)}
								>
									{formatMinutesOffset(
										getValues(`reminders.${idx}.offsetMinutes`),
									)}
									&nbsp;×
								</Button>
							))}
					</div>
				</div>
			</div>

			<div className="mt-6">
				<Button
					color="primary"
					onPress={handleCreateCalendarEvent}
					isLoading={isCreating}
					disabled={isCreating}
				>
					Создать
				</Button>
			</div>
		</div>
	);
};
