import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { useGetPersonalUserSpaces } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';

import { useDeleteSpace } from '../api/useDeleteSpace';

type Props = {
	spaceId: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

export const DeleteSpaceModal = (props: Props) => {
	const { spaceId, isOpen, onOpenChange } = props;

	const navigate = useNavigate();

	const { mutate: mutateSpaces } = useGetPersonalUserSpaces();
	const { request: deleteSpace, isLoading } = useDeleteSpace();

	const handleSuccessDeleteSpace = () => {
		mutateSpaces();
		navigate(RoutesPaths.spaces);
	};

	const handleDeleteSpace = () => {
		deleteSpace({ spaceId }).then(handleSuccessDeleteSpace);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
			<ModalContent>
				<ModalHeader>Удалить пространство?</ModalHeader>

				<ModalBody>
					<p className="text-sm text-neutral-600">Это действие нельзя отменить.</p>
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
