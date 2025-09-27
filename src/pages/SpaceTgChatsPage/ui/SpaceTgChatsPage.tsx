import { useParams } from 'react-router-dom';
import { Button, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/SpaceInfo';
import { SpaceTgChatsList } from 'widgets/SpaceTgChatsList';

import { CreateSpaceTgLinkCodeModal } from 'features/CreateSpaceTgLinkCode';

import { useGetSpace } from 'entities/Space';
import { useGetSpaceTgChats } from 'entities/SpaceTgChat';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceTgChatsPage = () => {
	const { spaceId = '' } = useParams();

	const { data: space } = useGetSpace({ spaceId });
	const { data: spaceTgChats, isLoading: isChatsLoading } = useGetSpaceTgChats({ spaceId });

	const { isOpen, onOpenChange } = useDisclosure();

	return (
		<div className={'p-3 flex gap-5 max-w-2xl flex-col m-auto'}>
			<PageHeader
				title={'Привязанные чаты'}
				description={'Управление привязанными чатами пространства'}
			/>

			{space && <SpaceInfo space={space} />}

			<Button variant="flat" color={'primary'} onPress={onOpenChange} fullWidth>
				Привязать к Telegram
			</Button>

			<CreateSpaceTgLinkCodeModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				spaceId={spaceId}
			/>

			<SpaceTgChatsList
				spaceId={spaceId}
				tgChats={spaceTgChats || []}
				isLoading={isChatsLoading}
			/>
		</div>
	);
};
