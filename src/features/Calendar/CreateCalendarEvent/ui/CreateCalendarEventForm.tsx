import { Button, DatePicker, Input } from '@heroui/react';
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
	isRemindersActive: boolean;
	isCreating: boolean;

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
		//
		reminderFields,
		isRemindersActive,
		isCreating,
		//
		onChangeTitle,
		onChangeDescription,
		onChangeStart,
		onChangeEnd,
		onAddReminder,
		onRemoveReminder,
		onCreateCalendarEvent,
		//
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
