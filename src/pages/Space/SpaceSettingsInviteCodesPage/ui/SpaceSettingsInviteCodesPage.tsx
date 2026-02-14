import { useParams } from 'react-router-dom';
import { Button, Modal, ModalContent, useDisclosure } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceInviteCodesList } from 'widgets/Space/SpaceInviteCodesList';

import {
	CreateSpaceInviteCodeForm,
	useCreateSpaceInviteCodeForm,
} from 'features/Space/CreateSpaceInviteCode';

import { useGetSpace } from 'entities/Space';
import { useGetSpaceInviteCodes } from 'entities/SpaceInviteCode';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsInviteCodesPage = () => {
	const { spaceId = '' } = useParams();

	const { data: space } = useGetSpace({ spaceId });
	const { data: inviteLinks, isLoading: isLinksLoading } = useGetSpaceInviteCodes({ spaceId });

	const { isOpen, onOpenChange } = useDisclosure();
	const {
		isLoading,
		maxUses,
		expiresAtIso,
		usesMode,
		timeMode,
		createdCode,
		linkUrl,
		onChangeMaxUses,
		onChangeExpiresAt,
		onPickExpiresAtBump,
		onChangeUsesMode,
		onChangeTimeMode,
		onCreateInviteLink,
	} = useCreateSpaceInviteCodeForm({ spaceId, isOpen });

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

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<CreateSpaceInviteCodeForm
						isLoading={isLoading}
						linkUrl={linkUrl}
						createdCode={createdCode}
						maxUses={maxUses}
						expiresAtIso={expiresAtIso}
						usesMode={usesMode}
						timeMode={timeMode}
						onChangeMaxUses={onChangeMaxUses}
						onChangeExpiresAt={onChangeExpiresAt}
						onPickExpiresAtBump={onPickExpiresAtBump}
						onChangeUsesMode={onChangeUsesMode}
						onChangeTimeMode={onChangeTimeMode}
						onCreateInviteLink={onCreateInviteLink}
						onClose={() => onOpenChange()}
					/>
				</ModalContent>
			</Modal>

			<SpaceInviteCodesList inviteLinks={inviteLinks || []} isLoading={isLinksLoading} />
		</div>
	);
};
