import { Button, Switch, Textarea } from '@heroui/react';

import type { CalendarEventFrequency, DeleteCalendarEventScope } from 'entities/CalendarEvent';

type Props = {
	isSpaceHasTelegramChats: boolean;
	eventFrequency: CalendarEventFrequency;

	isNotifyMessage?: boolean;
	onToggleIsNotifyMessage: () => void;

	notifyMessage?: string;
	onChangeNotifyMessage: (message: string) => void;

	isDeleting: boolean;
	onDeleteCalendarEvent: (scope: DeleteCalendarEventScope) => void;
};

export const DeleteCalendarEventForm = (props: Props) => {
	const {
		notifyMessage,
		onChangeNotifyMessage,

		isNotifyMessage,
		onToggleIsNotifyMessage,

		isDeleting,
		onDeleteCalendarEvent,

		isSpaceHasTelegramChats,
		eventFrequency,
	} = props;

	const handleDeleteOneCalendarEvent = () => onDeleteCalendarEvent('THIS');
	const handleDeleteSeriesCalendarEvent = () => onDeleteCalendarEvent('SERIES');
	const handleDeleteSingleCalendarEvent = () => onDeleteCalendarEvent('THIS');

	return (
		<div className={'p-4'}>
			<div className="mb-2 text-lg font-semibold">Удалить событие?</div>

			<div className="flex flex-col gap-4">
				<Switch
					isSelected={isNotifyMessage}
					onChange={onToggleIsNotifyMessage}
					size={'sm'}
					isDisabled={!isSpaceHasTelegramChats}
				>
					Уведомить привязанные Telegram чаты?
				</Switch>

				{isNotifyMessage && (
					<Textarea
						label="Сообщение"
						value={notifyMessage}
						onChange={(event) => onChangeNotifyMessage(event.target.value)}
						placeholder={'Дополнительное Telegram сообщение'}
						disabled={!isSpaceHasTelegramChats || !isNotifyMessage}
					/>
				)}
			</div>

			<div className="mt-6 flex flex-col gap-2">
				{eventFrequency === 'NEVER' && (
					<Button
						color="danger"
						onPress={handleDeleteSingleCalendarEvent}
						isLoading={isDeleting}
						disabled={isDeleting}
					>
						Удалить
					</Button>
				)}

				{eventFrequency !== 'NEVER' && (
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
