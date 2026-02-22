import { Button, DatePicker, Input, Select, SelectItem } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';

import type { CalendarEventRecurrenceType, CalendarEventScope } from 'entities/CalendarEvent';
import { RECURRENCE_PRESETS, REMINDERS_PRESETS } from 'entities/CalendarEvent';

import { formatMinutesOffset, safeParseAbsoluteToLocal } from 'shared/lib';

type ReminderField = {
	id: string;
	offsetMinutes: number;
};

type Props = {
	title: string;
	description: string;

	start: string;
	end: string;
	recurrenceType: CalendarEventRecurrenceType;
	initialRecurrenceType: CalendarEventRecurrenceType;
	recurrenceUntil?: string;

	reminderFields: ReminderField[];
	isRemindersActive: boolean;

	isUpdating: boolean;
	isDeleting: boolean;

	onChangeTitle: (value: string) => void;
	onChangeDescription: (value: string) => void;
	onChangeStart: (value?: ZonedDateTime | null) => void;
	onChangeEnd: (value?: ZonedDateTime | null) => void;
	onAddReminder: (minutes: number) => void;
	onRemoveReminder: (index: number) => void;
	onChangeRecurrenceType: (type: CalendarEventRecurrenceType) => void;
	onChangeRecurrenceUntil: (value?: ZonedDateTime | null) => void;

	onUpdateCalendarEvent: (scope: CalendarEventScope) => void;
	onDeleteCalendarEvent: (scope: CalendarEventScope) => void;

	getReminderOffset: (index: number) => number;
};

export const ChangeCalendarEventForm = (props: Props) => {
	const {
		title,
		description,
		start,
		end,

		reminderFields,
		isRemindersActive,
		recurrenceType,
		initialRecurrenceType,
		recurrenceUntil,

		isUpdating,
		isDeleting,

		onChangeTitle,
		onChangeDescription,
		onChangeStart,
		onChangeEnd,
		onAddReminder,
		onRemoveReminder,
		onChangeRecurrenceType,
		onChangeRecurrenceUntil,

		onUpdateCalendarEvent,
		onDeleteCalendarEvent,

		getReminderOffset,
	} = props;

	const handleUpdateOneCalendarEvent = () => onUpdateCalendarEvent('THIS');
	const handleUpdateFutureCalendarEvent = () => onUpdateCalendarEvent('THIS_AND_FUTURE');
	const handleUpdateSeriesCalendarEvent = () => onUpdateCalendarEvent('SERIES');

	const handleDeleteOneCalendarEvent = () => onDeleteCalendarEvent('THIS');
	const handleDeleteSeriesCalendarEvent = () => onDeleteCalendarEvent('SERIES');

	return (
		<div className={'p-4'}>
			<div className="mb-2 text-lg font-semibold">Редактировать событие</div>

			<div className="flex flex-col gap-4">
				<Input
					label="Название"
					value={title}
					onChange={(event) => onChangeTitle(event.target.value)}
				/>
				<Input
					label="Описание"
					value={description}
					onChange={(event) => onChangeDescription(event.target.value)}
				/>

				<DatePicker
					label="Начало"
					value={safeParseAbsoluteToLocal(start)}
					onChange={onChangeStart}
					hideTimeZone
				/>
				<DatePicker
					label="Конец"
					value={safeParseAbsoluteToLocal(end)}
					onChange={onChangeEnd}
					hideTimeZone
				/>

				<Select
					label="Повторять через"
					placeholder="Выберите установку"
					selectedKeys={[recurrenceType]}
					onChange={(event) =>
						onChangeRecurrenceType(event.target.value as CalendarEventRecurrenceType)
					}
				>
					{RECURRENCE_PRESETS.map((preset) => (
						<SelectItem key={preset.key}>{preset.label}</SelectItem>
					))}
				</Select>
				{recurrenceType !== 'NONE' && (
					<DatePicker
						label="Повторять до"
						granularity="minute"
						value={safeParseAbsoluteToLocal(recurrenceUntil)}
						onChange={onChangeRecurrenceUntil}
						hideTimeZone
					/>
				)}

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
								onPress={() => onAddReminder(minutes)}
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
							reminderFields.map((field, index) => (
								<Button
									key={field.id}
									size="sm"
									variant="flat"
									color="primary"
									onPress={() => onRemoveReminder(index)}
								>
									{formatMinutesOffset(getReminderOffset(index))}&nbsp;×
								</Button>
							))}
					</div>
				</div>
			</div>

			<div className="mt-6 flex flex-col gap-2">
				{initialRecurrenceType === 'NONE' && (
					<Button
						color="primary"
						onPress={handleUpdateSeriesCalendarEvent}
						isLoading={isUpdating}
						disabled={isUpdating}
					>
						Обновить
					</Button>
				)}

				{initialRecurrenceType !== 'NONE' && (
					<>
						<Button
							color="primary"
							onPress={handleUpdateOneCalendarEvent}
							isLoading={isUpdating}
							disabled={isUpdating}
						>
							Обновить только текущее событие
						</Button>

						<Button
							color="primary"
							onPress={handleUpdateFutureCalendarEvent}
							isLoading={isUpdating}
							disabled={isUpdating}
						>
							Обновить c будущими событиями
						</Button>
					</>
				)}

				{initialRecurrenceType === 'NONE' && (
					<Button
						color="danger"
						onPress={handleDeleteSeriesCalendarEvent}
						isLoading={isDeleting}
						disabled={isDeleting}
					>
						Удалить
					</Button>
				)}

				{initialRecurrenceType !== 'NONE' && (
					<>
						<Button
							color="danger"
							variant="flat"
							onPress={handleDeleteOneCalendarEvent}
							isLoading={isDeleting}
							disabled={isDeleting}
						>
							Удалить только текущее событие
						</Button>
						<Button
							color="danger"
							onPress={handleDeleteSeriesCalendarEvent}
							isLoading={isDeleting}
							disabled={isDeleting}
						>
							Удалить всю серию
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
