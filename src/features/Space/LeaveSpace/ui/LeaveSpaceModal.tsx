import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { RoutesPaths } from 'shared/configs';

import { useLeaveSpace } from '../api/useLeaveSpace';

type Props = {
	spaceId: string;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

export const LeaveSpaceModal = (props: Props) => {
	const { spaceId, isOpen, onOpenChange } = props;

	const navigate = useNavigate();

	const { request: leaveSpace, isLoading: isLeaving } = useLeaveSpace();

	const handleSuccessLeaveSpace = () => {
		navigate(RoutesPaths.spaces);
	};

	const handleDeleteSpace = () => {
		leaveSpace({ spaceId }).then(handleSuccessLeaveSpace);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
			<ModalContent>
				<ModalHeader>Выйти из пространства?</ModalHeader>

				<ModalBody>
					<p className="text-sm text-neutral-600">
						Войти повторно вы сможете только по ссылке-приглашению.
					</p>
				</ModalBody>

				<ModalFooter>
					<Button variant="light" onPress={() => onOpenChange(false)}>
						Отмена
					</Button>

					<Button
						color="danger"
						isLoading={isLeaving}
						disabled={isLeaving}
						onPress={handleDeleteSpace}
					>
						Выйти
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
