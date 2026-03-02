import { useParams } from 'react-router-dom';
import { Button, Modal, ModalContent, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceTgChatsList } from 'widgets/Space/SpaceTgChatsList';

import {
	CreateSpaceTgLinkCodeForm,
	useCreateSpaceTgLinkCodeForm,
} from 'features/Space/CreateSpaceTgLinkCode';

import { useGetSpace } from 'entities/Space';
import { useGetSpaceTgChats } from 'entities/SpaceTgChat';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsTgChatsPage = () => {
	const { spaceId = '' } = useParams();

	const { data: space } = useGetSpace({ spaceId });
	const { data: spaceTgChats, isLoading: isChatsLoading } = useGetSpaceTgChats({ spaceId });

	const { isOpen, onOpenChange } = useDisclosure();
	const { code, error, isLoading, handleCreate, handleReset } =
		useCreateSpaceTgLinkCodeForm({ spaceId });

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

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<CreateSpaceTgLinkCodeForm
						onClose={() => onOpenChange()}
						code={code}
						error={error}
						isLoading={isLoading}
						onCreate={handleCreate}
						onReset={handleReset}
					/>
				</ModalContent>
			</Modal>

			<SpaceTgChatsList
				spaceId={spaceId}
				tgChats={spaceTgChats || []}
				isLoading={isChatsLoading}
			/>
		</div>
	);
};
