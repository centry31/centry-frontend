import { Button } from '@heroui/react';

import type { SpaceMember } from 'entities/SpaceMember';

type Props = {
	member: SpaceMember;
	onDeleteSpaceMember: (userId: string) => void;
};

export const SpaceMemberButtonActions = (props: Props) => {
	const { member, onDeleteSpaceMember } = props;

	const handleDeleteSpaceMember = async (userId: string) => {
		onDeleteSpaceMember(userId);
	};

	return (
		<Button
			onPress={() => handleDeleteSpaceMember(member.id)}
			size="sm"
			variant="light"
			color="danger"
		>
			Удалить
		</Button>
	);
};
