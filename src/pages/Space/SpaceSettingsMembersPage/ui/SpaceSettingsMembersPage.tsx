import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceMembersList } from 'widgets/Space/SpaceMembersList';

import { useGetSpace } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsMembersPage = () => {
	const { spaceId = '' } = useParams();
	const navigate = useNavigate();

	const { data: space } = useGetSpace({ spaceId });

	const handleRedirectInvites = () => {
		navigate(generatePath(RoutesPaths.spaceInviteCodes, { spaceId }));
	};

	return (
		<div className={'p-3 flex gap-5 max-w-2xl flex-col m-auto'}>
			<PageHeader title={'Участники'} description={'Управление участниками пространства'} />

			{space && <SpaceInfo space={space} />}

			<Button onPress={handleRedirectInvites} variant={'flat'}>
				Создать ссылку-приглашение
			</Button>

			<SpaceMembersList />
		</div>
	);
};
