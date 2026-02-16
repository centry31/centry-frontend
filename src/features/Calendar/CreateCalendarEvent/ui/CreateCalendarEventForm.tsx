import { Button, DatePicker, Input, Switch, Textarea } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';

import { formatMinutesOffset } from 'shared/lib';

const REMINDERS_PRESETS = [1, 5, 15, 30, 60, 1440];

type ReminderField = {
	id: string;
	offsetMinutes: number;
};

type Props = {
	title: string;
	description: string;
	start: string;
	end: string;

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
	onCreateCalendarEvent: () => void;

	getReminderOffset: (index: number) => number;
	parseDateValue: (value: string) => ZonedDateTime | null;
};

export const CreateCalendarEventForm = (props: Props) => {
	const {
		title,
		description,
		start,
		end,

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
		onCreateCalendarEvent,

		getReminderOffset,
		parseDateValue,
	} = props;

	return (
		<div className="p-4">
			<div className="mb-2 text-lg font-semibold">Создать событие</div>

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
					value={parseDateValue(start)}
					onChange={onChangeStart}
					hideTimeZone
				/>
				<DatePicker
					label="Конец"
					value={parseDateValue(end)}
					onChange={onChangeEnd}
					hideTimeZone
				/>

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
