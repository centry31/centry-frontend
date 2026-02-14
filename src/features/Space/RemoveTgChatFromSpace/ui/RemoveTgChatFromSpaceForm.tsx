import { Button } from '@heroui/react';

type Props = {
	isLoading: boolean;
	onRemoveTgChat: () => void;
	onClose: () => void;
};

export const RemoveTgChatFromSpaceForm = (props: Props) => {
	const { isLoading, onRemoveTgChat, onClose } = props;

	return (
		<div className="p-4">
			<div className="mb-1 text-lg font-semibold">Отвязать чат от пространства?</div>
			<p className="text-sm text-neutral-600">
				Вы в любой момент сможете привязать его обратно.
			</p>

			<div className="mt-4 flex justify-end gap-2">
				<Button variant="light" onPress={onClose}>
					Отмена
				</Button>

				<Button
					color="danger"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={onRemoveTgChat}
				>
					Отвязать
				</Button>
			</div>
		</div>
	);
};
