import type { ReactNode } from 'react';
import { Avatar, Chip } from '@heroui/react';

import type { Space } from 'entities/Space';
import type { SpaceMember } from 'entities/SpaceMember';

type Props = {
	space: Space;
	member: SpaceMember;
	currentUserId: string;

	Actions?: ReactNode;
};

export const SpaceMemberItem = (props: Props) => {
	const { space, member, currentUserId, Actions } = props;

	const showActionButtons = member.id !== currentUserId && space?.access === 'owner';
	const showChip = member.id === currentUserId;

	return (
		<li key={member.id} className="flex items-center justify-between gap-3 px-4 py-3">
			<div className="flex items-center gap-3">
				{/* TODO: add avatar url */}
				<Avatar size="sm" name={member.displayName} />

				<div className="leading-tight">
					<div className="text-sm font-medium">{member.displayName}</div>

					{member.username && (
						<div className="text-xs text-neutral-500">@{member.username}</div>
					)}
				</div>
			</div>

			<div className="flex items-center gap-2">
				{showActionButtons && Actions}

				{showChip && (
					<Chip size="sm" variant="flat" color={'primary'}>
						Это вы
					</Chip>
				)}
			</div>
		</li>
	);
};
