import { useParams } from 'react-router-dom';
import { Button, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceInviteCodesList } from 'widgets/Space/SpaceInviteCodesList';

import { CreateSpaceInviteCodeModal } from 'features/Space/CreateSpaceInviteCode';

import { useGetSpace } from 'entities/Space';
import { useGetSpaceInviteCodes } from 'entities/SpaceInviteCode';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceInviteCodesPage = () => {
	const { spaceId = '' } = useParams();

	const { data: space } = useGetSpace({ spaceId });
	const { data: inviteLinks, isLoading: isLinksLoading } = useGetSpaceInviteCodes({ spaceId });

	const { isOpen, onOpenChange } = useDisclosure();

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			<PageHeader
				title={'Ссылки для вступления'}
				description={'Управление ссылками для приглашения в пространство'}
			/>

			{space && <SpaceInfo space={space} />}

			<Button variant="flat" onPress={onOpenChange} fullWidth>
				Пригласить участников
			</Button>

			<CreateSpaceInviteCodeModal
				spaceId={spaceId}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>

			<SpaceInviteCodesList inviteLinks={inviteLinks || []} isLoading={isLinksLoading} />
		</div>
	);
};
