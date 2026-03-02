import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalContent,
	useDisclosure,
} from '@heroui/react';
import { Ellipsis, Trash2 } from 'lucide-react';

import {
	RemoveTgChatFromSpaceForm,
	useRemoveTgChatFromSpaceForm,
} from 'features/Space/RemoveTgChatFromSpace';

type Props = {
	spaceId: string;
	chatId: string;
};

export const SpaceTgChatActionsList = (props: Props) => {
	const { spaceId, chatId } = props;

	const { isOpen, onOpenChange } = useDisclosure();
	const { isLoading, handleRemoveTgChat } = useRemoveTgChatFromSpaceForm({ spaceId, chatId });

	const handleOpenRemoveChatModal = () => {
		onOpenChange();
	};

	return (
		<>
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Button isIconOnly size="sm" variant="light">
						<Ellipsis size={16} />
					</Button>
				</DropdownTrigger>

				<DropdownMenu aria-label="space actions">
					<DropdownItem
						key="delete"
						className="text-danger"
						color="danger"
						startContent={<Trash2 size={16} />}
						onPress={handleOpenRemoveChatModal}
					>
						Отвязать
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<RemoveTgChatFromSpaceForm
						isLoading={isLoading}
						onRemoveTgChat={handleRemoveTgChat}
						onClose={() => onOpenChange()}
					/>
				</ModalContent>
			</Modal>
		</>
	);
};
