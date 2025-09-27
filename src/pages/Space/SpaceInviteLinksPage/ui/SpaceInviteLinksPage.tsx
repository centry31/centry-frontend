import { useParams } from 'react-router-dom';
import { Button, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/SpaceInfo';

import { CreateSpaceInviteLinkModal } from 'features/Space/CreateSpaceInviteLink';

import { useGetSpace } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceInviteLinksPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space } = useGetSpace({ spaceId });

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

			<CreateSpaceInviteLinkModal isOpen={isOpen} onOpenChange={onOpenChange} />
		</div>
	);
};
