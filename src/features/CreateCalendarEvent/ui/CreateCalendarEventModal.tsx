import { useController, useFieldArray, useForm } from 'react-hook-form';
import {
	Button,
	DateInput,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';
import { parseAbsoluteToLocal } from '@internationalized/date';

import type {
	CalendarEvent,
	CreateCalendarEvent,
	UpdateCalendarEvent,
} from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';
import { useGetSpace } from 'entities/Space';

import { CurrentSpaceIdController, formatMinutesOffset } from 'shared/lib';

import { useCreateCalendarEvent } from '../api/useCreateCalendarEvent';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();
const REMINDERS_PRESETS = [1, 5, 15, 30, 60, 1440]; // 1m, 5m, 15m, 30m, 1h, 2h, 1d

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;

	initialFormValues: Partial<UpdateCalendarEvent>;
};

export const CreateCalendarEventModal = (props: Props) => {
	const { initialFormValues, isOpen, onOpenChange } = props;

	const defaultFormValues = {
		start: DEFAULT_TIME_ISO_VALUE,
		end: DEFAULT_TIME_ISO_VALUE,
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
	const handleChangeStart = (start?: ZonedDateTime | null) => {
		if (!start) return;

		const absoluteString = start.toAbsoluteString();
		onChangeStart(absoluteString);
	};

	const handleChangeEnd = (end: ZonedDateTime | null) => {
		if (!end) return;

		const absoluteString = end.toAbsoluteString();
		onChangeEnd(absoluteString);
	};

	const handleAddReminder = (minutes: number) => {
		const existsReminders = (getValues('reminders') ?? []).some(
			(r) => r.offsetMinutes === minutes,
		);

		if (!existsReminders) appendReminder({ offsetMinutes: minutes });
	};

	const handleRemoveReminder = (idx: number) => {
		removeReminder(idx);
	};

	/**
	 * Мутирует существующий список событий при успешно создании нового события
	 * */
	const handleSuccessCreatingEvent = (createdEvent?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!createdEvent || !events) return;

			return [...events, createdEvent];
		});

		onOpenChange(false);
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
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll={false}>
			<ModalContent>
				<ModalHeader>Создать событие</ModalHeader>

				<ModalBody>
					<Input label={'Название'} value={title} onChange={onChangeTitle} />
					<Input label={'Описание'} value={description} onChange={onChangeDescription} />

					<DateInput
						label={'Начало'}
						value={parseAbsoluteToLocal(start)}
						onChange={handleChangeStart}
						hideTimeZone
					/>
					<DateInput
						label={'Конец'}
						value={parseAbsoluteToLocal(end)}
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

						{/* Пресеты */}
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

						{/* Текущий список */}
						<div className="flex flex-wrap gap-2">
							{reminderFields.length === 0 && (
								<span className="text-sm text-neutral-500">Нет напоминаний</span>
							)}

							{reminderFields.length != 0 &&
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
				</ModalBody>

				<ModalFooter>
					<Button
						color={'primary'}
						onPress={handleCreateCalendarEvent}
						isLoading={isCreating}
						disabled={isCreating}
					>
						Создать
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
