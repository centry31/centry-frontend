import { Button } from '@heroui/react';

type Props = {
	isLoading: boolean;
	onDeleteSpaceInviteCode: () => void;
	onClose: () => void;
};

export const DeleteSpaceInviteCodeForm = (props: Props) => {
	const { isLoading, onDeleteSpaceInviteCode, onClose } = props;

	return (
		<div className="p-4">
			<div className="mb-1 text-lg font-semibold">Удалить приглашение?</div>
			<p className="text-sm text-neutral-600">Ссылка и код станут недействительными.</p>

			<div className="mt-4 flex justify-end gap-2">
				<Button variant="light" onPress={onClose}>
					Отмена
				</Button>

				<Button
					color="danger"
					isLoading={isLoading}
					disabled={isLoading}
					onPress={onDeleteSpaceInviteCode}
				>
					Удалить
				</Button>
			</div>
		</div>
	);
};
