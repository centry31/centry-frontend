import { useParams } from 'react-router-dom';
import { Button, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/SpaceInfo';

import { CreateSpaceTgLinkCodeModal } from 'features/CreateSpaceTgLinkCode';

import { useGetSpace } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceLinkedTgChatsPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space } = useGetSpace({ spaceId });

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
		</div>
	);
};
