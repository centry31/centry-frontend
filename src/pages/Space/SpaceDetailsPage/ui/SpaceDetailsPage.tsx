import { useParams } from 'react-router-dom';
import { Button, Modal, ModalContent, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceMembersList } from 'widgets/Space/SpaceMembersList';

import { LeaveSpaceForm, useLeaveSpaceForm } from 'features/Space/LeaveSpace';

import { useGetSpace, useGetSpaceMembers } from 'entities/Space';

export const SpaceDetailsPage = () => {
	const { spaceId = '' } = useParams();

	const { isOpen: isLeaveOpen, onOpenChange: onLeaveOpenChange } = useDisclosure();
	const { isLeaving, handleLeaveSpace } = useLeaveSpaceForm({ spaceId });

	const { data: space } = useGetSpace({ spaceId });
	const { data: members, isLoading: isMembersLoading } = useGetSpaceMembers({ spaceId });

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			{space && <SpaceInfo space={space} />}
			<SpaceMembersList members={members || []} isLoading={isMembersLoading} />

			<Button onPress={onLeaveOpenChange} color={'danger'} variant={'light'} fullWidth>
				Выйти из пространства
			</Button>

			<Modal isOpen={isLeaveOpen} onOpenChange={onLeaveOpenChange} placement="center">
				<ModalContent>
					<LeaveSpaceForm
						isLeaving={isLeaving}
						onLeaveSpace={handleLeaveSpace}
						onClose={() => onLeaveOpenChange()}
					/>
				</ModalContent>
			</Modal>
		</div>
	);
};
