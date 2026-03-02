import { Button } from '@heroui/react';

type Props = {
	isLeaving: boolean;
	onLeaveSpace: () => void;
	onClose: () => void;
};

export const LeaveSpaceForm = (props: Props) => {
	const { isLeaving, onLeaveSpace, onClose } = props;

	return (
		<div className="p-4">
			<div className="mb-1 text-lg font-semibold">Выйти из пространства?</div>
			<p className="text-sm text-neutral-600">
				Войти повторно вы сможете только по ссылке-приглашению.
			</p>

			<div className="mt-4 flex justify-end gap-2">
				<Button variant="light" onPress={onClose}>
					Отмена
				</Button>

				<Button
					color="danger"
					isLoading={isLeaving}
					disabled={isLeaving}
					onPress={onLeaveSpace}
				>
					Выйти
				</Button>
			</div>
		</div>
	);
};
