import { useController, useForm } from 'react-hook-form';
import { Button, DateInput, Input } from '@heroui/react';
import type { ZonedDateTime } from '@internationalized/date';
import { parseAbsoluteToLocal } from '@internationalized/date';

import type { CalendarEvent, CreateCalendarEvent } from 'entities/CalendarEvent';
import { useGetCalendarEvents } from 'entities/CalendarEvent';

import { useCreateCalendarEvent } from '../../api/useCreateCalendarEvent';

const DEFAULT_TIME_ISO_VALUE = new Date().toISOString();

type Props = {
	onOpenModalChange: (isOpen: boolean) => void;
	initialFormValues: Partial<CreateCalendarEvent>;
};

// TODO: add fields validation
export const CreateCalendarEventForm = (props: Props) => {
	const { onOpenModalChange, initialFormValues } = props;

	const defaultFormValues = {
		start: DEFAULT_TIME_ISO_VALUE,
		end: DEFAULT_TIME_ISO_VALUE,
		...initialFormValues,
	};

	const { control } = useForm<CreateCalendarEvent>({ defaultValues: defaultFormValues });

	const { mutate: mutateCalendarEvents } = useGetCalendarEvents();
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
	 * Мутирует существующий список событий при успешно создании нового события
	 * */
	const handleSuccessCreatingEvent = (createdEvent?: CalendarEvent) => {
		mutateCalendarEvents((events) => {
			if (!createdEvent || !events) return;

			return [...events, createdEvent];
		});

		onOpenModalChange(false);
	};

	const handleCreateCalendarEvent = () => {
		const event: CreateCalendarEvent = {
			title,
			description,
			start,
			end,
		};

		createCalendarEvent({ event }).then(handleSuccessCreatingEvent);
	};

	return (
		<div className={'flex flex-col gap-4'}>
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

			<Button
				color={'primary'}
				onPress={handleCreateCalendarEvent}
				isLoading={isCreating}
				disabled={isCreating}
			>
				Создать
			</Button>
		</div>
	);
};
