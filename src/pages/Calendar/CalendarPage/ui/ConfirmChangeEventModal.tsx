import { Button, Modal, ModalContent } from '@heroui/react';

type Props = {
	onClose: () => void;
	isOpen: boolean;

	onUpdateOne: () => void;
	onUpdateFuture: () => void;
	isUpdating: boolean;
};

export const ConfirmChangeEventModal = (props: Props) => {
	const { isOpen, onClose, onUpdateOne, onUpdateFuture, isUpdating } = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				<div className="p-4">
					<div className="mb-1 text-lg font-semibold">Как применить изменения?</div>
					<p className="text-sm text-neutral-600">
						Выберите, нужно изменить только текущее событие или все будущие в серии.
					</p>

					<div className="mt-4 flex flex-col gap-2">
						<Button
							color="primary"
							onPress={onUpdateOne}
							isLoading={isUpdating}
							disabled={isUpdating}
						>
							Только текущее событие
						</Button>

						<Button
							color="primary"
							variant="flat"
							onPress={onUpdateFuture}
							isLoading={isUpdating}
							disabled={isUpdating}
						>
							Текущее и будущие
						</Button>

						<Button variant="light" onPress={onClose} disabled={isUpdating}>
							Отмена
						</Button>
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
};
