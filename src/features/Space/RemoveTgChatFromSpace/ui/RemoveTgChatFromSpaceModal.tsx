import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { useGetSpaceTgChats } from 'entities/SpaceTgChat';

import { useRemoveTgChatFromSpace } from '../api/useRemoveTgChatFromSpace';

type Props = {
	spaceId: string;
	chatId: string;

	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

export const RemoveTgChatFromSpaceModal = (props: Props) => {
	const { spaceId, chatId, isOpen, onOpenChange } = props;

	const { mutate: mutateChats } = useGetSpaceTgChats({ spaceId });
	const { request: removeChat, isLoading } = useRemoveTgChatFromSpace();

	const handleSuccessRemoveChat = () => {
		mutateChats();
	};

	const handleRemoveTgChat = () => {
		removeChat({ spaceId, chatId }).then(handleSuccessRemoveChat);
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
			<ModalContent>
				<ModalHeader>Отвязать чат от пространства?</ModalHeader>

				<ModalBody>
					<p className="text-sm text-neutral-600">
						Вы в любой момент сможете привязать его обратно.
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
						onPress={handleRemoveTgChat}
					>
						Отвязать
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
