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
	DeleteSpaceInviteCodeForm,
	useDeleteSpaceInviteCodeForm,
} from 'features/Space/DeleteSpaceInviteCode';

type Props = {
	spaceId: string;
	code: string;
};

export const SpaceInviteCodesActionsList = (props: Props) => {
	const { spaceId, code } = props;

	const { isOpen, onOpenChange } = useDisclosure();
	const { isLoading, handleDeleteSpaceInviteCode } = useDeleteSpaceInviteCodeForm({
		spaceId,
		code,
	});

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
						startContent={<Trash2 size={16} />}
						onPress={onOpenChange}
						color={'danger'}
						className={'text-danger'}
					>
						Удалить код
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<DeleteSpaceInviteCodeForm
						isLoading={isLoading}
						onDeleteSpaceInviteCode={handleDeleteSpaceInviteCode}
						onClose={() => onOpenChange()}
					/>
				</ModalContent>
			</Modal>
		</>
	);
};
