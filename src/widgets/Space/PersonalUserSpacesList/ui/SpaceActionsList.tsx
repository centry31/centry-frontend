import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	useDisclosure,
} from '@heroui/react';
import { Ellipsis, Trash2 } from 'lucide-react';

import { DeleteSpaceModal } from 'features/Space/DeleteSpace';

type Props = {
	spaceId: string;
};

export const SpaceActionsList = (props: Props) => {
	const { spaceId } = props;

	const { isOpen, onOpenChange } = useDisclosure();

	const handleOpenDeleteSpaceModal = () => {
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
						onPress={handleOpenDeleteSpaceModal}
					>
						Удалить
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<DeleteSpaceModal spaceId={spaceId} isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	);
};
