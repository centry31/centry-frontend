import { useController, useForm } from 'react-hook-form';
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

import type { CalendarEvent, UpdateCalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';

import { useDeleteCalendarEvent } from '../api/useDeleteCalendarEvent';
import { useUpdateCalendarEvent } from '../api/useUpdateCalendarEvent';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;

	eventId: string;
	initialFormValues: UpdateCalendarEvent;
};

export const ChangeCalendarEventModal = (props: Props) => {
	const { eventId, initialFormValues, isOpen, onOpenChange } = props;

	const { control } = useForm<UpdateCalendarEvent>({ defaultValues: initialFormValues });

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents();
	const { request: updateCalendarEvent, isLoading: isCreating } = useUpdateCalendarEvent();
	const { request: deleteCalendarEvent, isLoading: isDeleting } = useDeleteCalendarEvent();

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

	/**
	 * Мутирует существующий список событий при успешном создании нового события
	 * */
	const handleSuccessUpdatingEvent = (createdEvent?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!createdEvent || !events) return;

			return [...events, createdEvent];
		});

		onOpenChange(false);
	};

	/**
	 * Мутирует существующий список событий при успешном удалении события
	 * */
	const handleSuccessDeletingEvent = (deletedEvent?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!deletedEvent || !events) return;

			return events.filter((event) => event.id !== deletedEvent.id);
		});

		onOpenChange(false);
	};

	const handleUpdateCalendarEvent = () => {
		const event: UpdateCalendarEvent = {
			title,
			description,
			start,
			end,
		};

		updateCalendarEvent({ eventId, event }).then(handleSuccessUpdatingEvent);
	};

	const handleDeleteCalendarEvent = () => {
		deleteCalendarEvent({ eventId }).then(handleSuccessDeletingEvent);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalHeader>Редактировать событие</ModalHeader>

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
				</ModalBody>

				<ModalFooter className={'flex-col'}>
					<Button
						color={'primary'}
						onPress={handleUpdateCalendarEvent}
						isLoading={isCreating}
						disabled={isCreating}
					>
						Обновить
					</Button>

					<Button
						color={'danger'}
						onPress={handleDeleteCalendarEvent}
						isLoading={isDeleting}
						disabled={isDeleting}
					>
						Удалить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
