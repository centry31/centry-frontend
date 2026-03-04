import { useEffect, useMemo, useState } from 'react';
import { Button, Modal, ModalContent, Switch, Textarea } from '@heroui/react';

export type UpdateNotificationSettings = {
	isNotifyMessage: boolean;
	notifyMessage?: string;
};

type Props = {
	onClose: () => void;
	isOpen: boolean;
	isRecurringEvent: boolean;

	isSpaceHasTelegramChats: boolean;

	onUpdateOne: (settings: UpdateNotificationSettings) => void;
	onUpdateFuture: (settings: UpdateNotificationSettings) => void;
	isUpdating: boolean;
};

export const ConfirmUpdateEventModal = (props: Props) => {
	const {
		isOpen,
		onClose,
		isRecurringEvent,

		onUpdateOne,
		onUpdateFuture,
		isUpdating,

		isSpaceHasTelegramChats,
	} = props;

	const [isNotifyMessage, setIsNotifyMessage] = useState(false);
	const [notifyMessage, setNotifyMessage] = useState('');

	useEffect(() => {
		if (isOpen) return;

		setIsNotifyMessage(false);
		setNotifyMessage('');
	}, [isOpen]);

	const notificationSettings = useMemo<UpdateNotificationSettings>(
		() => ({
			isNotifyMessage,
			notifyMessage: notifyMessage.trim() || undefined,
		}),
		[isNotifyMessage, notifyMessage],
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<div className="p-4">
					<div className="mb-1 text-lg font-semibold">Как применить изменения?</div>
					{isRecurringEvent && (
						<p className="text-sm text-neutral-600">
							Выберите, нужно изменить только текущее событие или все будущие в
							серии.
						</p>
					)}
					{!isRecurringEvent && (
						<p className="text-sm text-neutral-600">
							Подтвердите изменение события после перетаскивания.
						</p>
					)}

					<div className="mt-4 flex flex-col gap-2">
						{isSpaceHasTelegramChats && (
							<Switch
								isSelected={isNotifyMessage}
								disabled={!isSpaceHasTelegramChats}
								onChange={() => setIsNotifyMessage(!isNotifyMessage)}
								size={'sm'}
							>
								Уведомить привязанные Telegram чаты?
							</Switch>
						)}

						{isSpaceHasTelegramChats && isNotifyMessage && (
							<Textarea
								label="Сообщение"
								value={notifyMessage}
								onChange={(event) => setNotifyMessage(event.target.value)}
								placeholder="Дополнительное Telegram сообщение"
								disabled={isUpdating}
							/>
						)}

						{isRecurringEvent && (
							<>
								<Button
									color="primary"
									onPress={() => onUpdateOne(notificationSettings)}
									isLoading={isUpdating}
									disabled={isUpdating}
								>
									Только текущее событие
								</Button>

								<Button
									color="primary"
									variant="flat"
									onPress={() => onUpdateFuture(notificationSettings)}
									isLoading={isUpdating}
									disabled={isUpdating}
								>
									Текущее и будущие
								</Button>
							</>
						)}

						{!isRecurringEvent && (
							<Button
								color="primary"
								onPress={() => onUpdateOne(notificationSettings)}
								isLoading={isUpdating}
								disabled={isUpdating}
							>
								Сохранить изменения
							</Button>
						)}

						<Button variant="light" onPress={onClose} disabled={isUpdating}>
							Отмена
						</Button>
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
};
