import { Button } from '@heroui/react';

type Props = {
	isLoading: boolean;
	onDeleteSpace: () => void;
	onClose: () => void;
};

export const DeleteSpaceForm = (props: Props) => {
	const { isLoading, onDeleteSpace, onClose } = props;

	return (
		<div className="p-4">
			<div className="mb-1 text-lg font-semibold">Удалить пространство?</div>
			<p className="text-sm text-neutral-600">Это действие нельзя отменить.</p>

			<div className="mt-4 flex justify-end gap-2">
				<Button variant="light" onPress={onClose}>
					Отмена
				</Button>

				<Button
					color="danger"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={onDeleteSpace}
				>
					Удалить
				</Button>
			</div>
		</div>
	);
};
