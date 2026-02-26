import { Button, DatePicker, Input, Select, SelectItem, Switch, Textarea } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';

import type { CalendarEventRecurrenceType } from 'entities/CalendarEvent';
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
	recurrenceUntil?: string;
	recurrenceType: CalendarEventRecurrenceType;

	reminderFields: ReminderField[];
	isSpaceHasTelegramChats: boolean;
	isCreating: boolean;

	isNotifyMessage?: boolean;
	onToggleIsNotifyMessage: () => void;

	notifyMessage?: string;
	onChangeNotifyMessage: (message: string) => void;

	onChangeTitle: (value: string) => void;
	onChangeDescription: (value: string) => void;
	onChangeStart: (value?: ZonedDateTime | null) => void;
	onChangeEnd: (value?: ZonedDateTime | null) => void;
	onAddReminder: (minutes: number) => void;
	onRemoveReminder: (index: number) => void;
	onChangeRecurrenceType: (type: CalendarEventRecurrenceType) => void;
	onChangeRecurrenceUntil: (value?: ZonedDateTime | null) => void;

	onCreateCalendarEvent: () => void;
	getReminderOffset: (index: number) => number;
};

export const CreateCalendarEventForm = (props: Props) => {
	const {
		title,
		description,

		start,
		end,
		recurrenceType,
		recurrenceUntil,

		reminderFields,
		isSpaceHasTelegramChats,
		isCreating,

		isNotifyMessage,
		onToggleIsNotifyMessage,

		notifyMessage,
		onChangeNotifyMessage,

		onChangeTitle,
		onChangeDescription,
		onChangeStart,
		onChangeEnd,
		onAddReminder,
		onRemoveReminder,
		onChangeRecurrenceType,
		onChangeRecurrenceUntil,

		onCreateCalendarEvent,
		getReminderOffset,
	} = props;

	const handleChangeInfinityUntilSwitch = () => {
		if (recurrenceUntil) {
			onChangeRecurrenceUntil(null);
		} else {
			const now = Date.now().toString();
			onChangeRecurrenceUntil(safeParseAbsoluteToLocal(now));
		}
	};

	return (
		<div className="p-4">
			<div className="mb-2 text-lg font-semibold">Создать событие</div>

			<div className="flex flex-col gap-4">
				<Input
					label="Название"
					value={title}
					onChange={(event) => onChangeTitle(event.target.value)}
				/>
				<Textarea
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
					<Switch
						isSelected={!recurrenceUntil}
						size={'sm'}
						onChange={handleChangeInfinityUntilSwitch}
					>
						Повторять бесконечно
					</Switch>
				)}
				{recurrenceType !== 'NONE' && recurrenceUntil && (
					<DatePicker
						label="Повторять до"
						granularity="minute"
						value={safeParseAbsoluteToLocal(recurrenceUntil)}
						onChange={onChangeRecurrenceUntil}
						hideTimeZone
					/>
				)}

				{!isSpaceHasTelegramChats && (
					<div className="rounded-lg bg-warning-50 px-3 py-2 text-sm text-warning-700">
						Чтобы добавлять напоминания и сообщения к событию, привяжите Telegram-чат в
						настройках пространства.
					</div>
				)}

				<Switch
					isSelected={isNotifyMessage}
					onChange={onToggleIsNotifyMessage}
					size={'sm'}
					isDisabled={!isSpaceHasTelegramChats}
				>
					Уведомить привязанные Telegram чаты?
				</Switch>

				<Textarea
					label="Сообщение"
					value={notifyMessage}
					onChange={(event) => onChangeNotifyMessage(event.target.value)}
					placeholder={
						'Здесь вы можете написать дополнительное сообщение к напоминанию, которое сразу отправится в привязанные Telegram чаты при создании'
					}
					disabled={!isSpaceHasTelegramChats || !isNotifyMessage}
				/>

				<div className="flex flex-col gap-2">
					<div className="text-sm font-medium">Напоминания</div>

					<div className="flex flex-wrap gap-2">
						{REMINDERS_PRESETS.map((minutes) => (
							<Button
								key={minutes}
								size="sm"
								variant="flat"
								onPress={() => onAddReminder(minutes)}
								disabled={!isSpaceHasTelegramChats}
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

			<div className="mt-6">
				<Button
					color="primary"
					onPress={onCreateCalendarEvent}
					isLoading={isCreating}
					disabled={isCreating}
				>
					Создать
				</Button>
			</div>
		</div>
	);
};
