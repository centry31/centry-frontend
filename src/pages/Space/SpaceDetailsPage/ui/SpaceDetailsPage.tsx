import { useParams } from 'react-router-dom';
import { Button, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceMembersList } from 'widgets/Space/SpaceMembersList';

import { LeaveSpaceModal } from 'features/Space/LeaveSpace';

import { useGetSpace, useGetSpaceMembers } from 'entities/Space';

export const SpaceDetailsPage = () => {
	const { spaceId = '' } = useParams();

	const { isOpen: isLeaveOpen, onOpenChange: onLeaveOpenChange } = useDisclosure();

	const { data: space } = useGetSpace({ spaceId });
	const { data: members, isLoading: isMembersLoading } = useGetSpaceMembers({ spaceId });

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			{space && <SpaceInfo space={space} />}
			<SpaceMembersList members={members || []} isLoading={isMembersLoading} />

			<Button onPress={onLeaveOpenChange} color={'danger'} variant={'light'} fullWidth>
				Выйти из пространства
			</Button>

			<LeaveSpaceModal
				spaceId={spaceId}
				isOpen={isLeaveOpen}
				onOpenChange={onLeaveOpenChange}
			/>
		</div>
	);
};
