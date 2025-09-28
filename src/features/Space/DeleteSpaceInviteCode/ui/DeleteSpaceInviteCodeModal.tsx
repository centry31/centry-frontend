import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { useGetSpaceInviteCodes } from 'entities/SpaceInviteCode';

import { useDeleteSpaceInviteCode } from '../api/useDeleteSpaceInviteCode';

type Props = {
	spaceId: string;
	code: string;

	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

export const DeleteSpaceInviteCodeModal = (props: Props) => {
	const { spaceId, code, isOpen, onOpenChange } = props;

	const { mutate: mutateCodes } = useGetSpaceInviteCodes({ spaceId });
	const { request: deleteCode, isLoading } = useDeleteSpaceInviteCode();

	const handleSuccessDeleteCode = () => {
		mutateCodes();
	};

	const handleDeleteSpace = () => {
		deleteCode({ spaceId, code }).then(handleSuccessDeleteCode);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
			<ModalContent>
				<ModalHeader>Удалить приглашение?</ModalHeader>

				<ModalBody>
					<p className="text-sm text-neutral-600">
						Ссылка и код станут недействительными.
					</p>
				</ModalBody>

				<ModalFooter>
					<Button variant="light" onPress={() => onOpenChange(false)}>
						Отмена
					</Button>

					<Button
						color="danger"
						isLoading={isLoading}
						disabled={isLoading}
						onPress={handleDeleteSpace}
					>
						Удалить
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
