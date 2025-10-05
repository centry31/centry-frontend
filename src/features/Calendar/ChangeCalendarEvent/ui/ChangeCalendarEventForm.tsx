import { useController, useFieldArray, useForm } from 'react-hook-form';
import { Button, DateInput, Input } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';

import type { CalendarEvent, UpdateCalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import {
	CurrentSpaceIdController,
	formatMinutesOffset,
	safeParseAbsoluteToLocal,
} from 'shared/lib';

import { useDeleteCalendarEvent } from '../api/useDeleteCalendarEvent';
import { useUpdateCalendarEvent } from '../api/useUpdateCalendarEvent';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();
const REMINDERS_PRESETS = [1, 5, 15, 30, 60, 1440]; // 1m, 5m, 15m, 30m, 1h, 1d

type Props = {
	eventId: string;
	initialFormValues: UpdateCalendarEvent;
	onSuccess?: () => void;
};

export const ChangeCalendarEventForm = (props: Props) => {
	const { eventId, initialFormValues, onSuccess } = props;

	const { control, getValues } = useForm<UpdateCalendarEvent>({
		defaultValues: initialFormValues,
	});

	const currentSpaceId = CurrentSpaceIdController.getCurrentSpaceId() || '';

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents();
	const { request: updateCalendarEvent, isLoading: isCreating } = useUpdateCalendarEvent();
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

	const handleChangeStart = (startZdt?: ZonedDateTime | null) => {
		if (!startZdt) return;
		onChangeStart(startZdt.toAbsoluteString());
	};

	const handleChangeEnd = (endZdt?: ZonedDateTime | null) => {
		if (!endZdt) return;
		onChangeEnd(endZdt.toAbsoluteString());
	};

	const handleAddReminder = (minutes: number) => {
		const exists = (getValues('reminders') ?? []).some((r) => r.offsetMinutes === minutes);
		if (!exists) appendReminder({ offsetMinutes: minutes });
	};

	const handleRemoveReminder = (idx: number) => removeReminder(idx);

	// успех обновления/удаления
	const handleSuccessUpdatingEvent = (updated?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!updated || !events) return;
			// заменить в списке по id (не добавлять дубликат)
			return events.map((e) => (e.id === updated.id ? updated : e));
		});
		onSuccess?.();
	};

	/**
	 * Мутирует существующий список событий при успешном удалении события
	 * */
	const handleSuccessDeletingEvent = (deleted?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!deleted || !events) return;
			return events.filter((e) => e.id !== deleted.id);
		});
		onSuccess?.();
	};

	const handleUpdateCalendarEvent = () => {
		const event: UpdateCalendarEvent = {
			title,
			description,
			start,
			end,
			reminders: reminderFields.map((r) => ({ offsetMinutes: r.offsetMinutes })),
		};
		updateCalendarEvent({ eventId, event }).then(handleSuccessUpdatingEvent);
	};

	const handleDeleteCalendarEvent = () => {
		deleteCalendarEvent({ eventId }).then(handleSuccessDeletingEvent);
	};

	const isRemindersActive = currentSpace?.hasActiveTgChats;

	return (
		<div className={'p-4'}>
			<div className="mb-2 text-lg font-semibold">Редактировать событие</div>

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

			<div className="mt-6 flex flex-col gap-2">
				<Button
					color="primary"
					onPress={handleUpdateCalendarEvent}
					isLoading={isCreating}
					disabled={isCreating}
				>
					Обновить
				</Button>

				<Button
					color="danger"
					onPress={handleDeleteCalendarEvent}
					isLoading={isDeleting}
					disabled={isDeleting}
				>
					Удалить
				</Button>
			</div>
		</div>
	);
};
