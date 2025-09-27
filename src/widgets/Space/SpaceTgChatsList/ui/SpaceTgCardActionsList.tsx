import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	useDisclosure,
} from '@heroui/react';
import { Ellipsis, Trash2 } from 'lucide-react';

import { RemoveTgChatFromSpaceModal } from 'features/Space/RemoveTgChatFromSpace';

type Props = {
	spaceId: string;
	chatId: string;
};

export const SpaceTgChatActionsList = (props: Props) => {
	const { spaceId, chatId } = props;

	const { isOpen, onOpenChange } = useDisclosure();

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

			<RemoveTgChatFromSpaceModal
				spaceId={spaceId}
				chatId={chatId}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	);
};
