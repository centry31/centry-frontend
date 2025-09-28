import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	useDisclosure,
} from '@heroui/react';
import { Ellipsis, Trash2 } from 'lucide-react';

import { DeleteSpaceInviteCodeModal } from 'features/Space/DeleteSpaceInviteCode';

type Props = {
	spaceId: string;
	code: string;
};

export const SpaceInviteCodesActionsList = (props: Props) => {
	const { spaceId, code } = props;

	const { isOpen, onOpenChange } = useDisclosure();

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

			<DeleteSpaceInviteCodeModal
				spaceId={spaceId}
				code={code}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	);
};
