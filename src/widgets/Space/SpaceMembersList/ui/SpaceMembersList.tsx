import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip, Spinner } from '@heroui/react';
import { Info } from 'lucide-react';

import { useGetSpace } from 'entities/Space';
import { useDeleteSpaceMember, useGetSpaceMembers } from 'entities/SpaceMember';
import { useUserStore } from 'entities/User';

import { notifySuccess } from 'shared/lib';

import { SpaceMemberButtonActions } from './SpaceMemberButtonActions';
import { SpaceMemberItem } from './SpaceMemberItem';

export const SpaceMembersList = () => {
	const { spaceId = '' } = useParams();
	const { authData } = useUserStore();

	const { data: space } = useGetSpace({ spaceId });
	const {
		data: spaceMembers = [],
		isLoading,
		mutate: mutateSpaceMembers,
	} = useGetSpaceMembers({ spaceId });
	const { request: deleteSpaceMember } = useDeleteSpaceMember();

	const handleDeleteSpaceMember = async (userId: string) => {
		const result = await deleteSpaceMember({ spaceId, userId });
		if (!result) return;

		notifySuccess('Участник пространства успешно удален');
		mutateSpaceMembers();
	};

	return (
		<Card shadow={'none'} className="border border-neutral-200">
			<CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2">
					<h3 className="text-base font-medium">Участники</h3>

					<Chip size="sm" variant="flat">
						{spaceMembers.length ?? '-'}
					</Chip>
				</div>
			</CardHeader>

			<CardBody className="p-0">
				{isLoading && (
					<div className="flex justify-center py-8">
						<Spinner />
					</div>
				)}

				{!isLoading && !spaceMembers.length && (
					<div className="flex items-center justify-center gap-2 py-10 text-neutral-500">
						<Info size={16} /> Никого не найдено
					</div>
				)}

				{space && (
					<ul className="divide-y divide-neutral-200">
						{spaceMembers.map((member) => (
							<SpaceMemberItem
								key={member.id}
								space={space}
								member={member}
								currentUserId={authData?.id ?? ''}
								Actions={
									<SpaceMemberButtonActions
										member={member}
										onDeleteSpaceMember={handleDeleteSpaceMember}
									/>
								}
							/>
						))}
					</ul>
				)}
			</CardBody>
		</Card>
	);
};
