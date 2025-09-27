import { Avatar, Button, Spinner, Tooltip } from '@heroui/react';
import { Info } from 'lucide-react';

import type { SpaceMember } from 'entities/Space';

type Props = {
	members: SpaceMember[];
	isLoading: boolean;
};

export const SpaceMembersList = (props: Props) => {
	const { members, isLoading } = props;

	if (isLoading)
		return (
			<div className="flex justify-center py-8">
				<Spinner />
			</div>
		);

	if (!members?.length)
		return (
			<div className="flex items-center justify-center gap-2 py-10 text-neutral-500">
				<Info size={16} /> Никого не найдено
			</div>
		);

	return (
		<ul className="divide-y divide-neutral-200">
			{members.map((member) => (
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
						{/*<Chip*/}
						{/*	size="sm"*/}
						{/*	variant="flat"*/}
						{/*	color={m.role === 'owner' ? 'primary' : 'default'}*/}
						{/*>*/}
						{/*	{m.role === 'owner' ? 'Владелец' : 'Участник'}*/}
						{/*</Chip>*/}

						{/* TODO: add handler */}
						<Tooltip content="Удалить">
							<Button size="sm" variant="light" color="danger">
								Удалить
							</Button>
						</Tooltip>
					</div>
				</li>
			))}
		</ul>
	);
};
