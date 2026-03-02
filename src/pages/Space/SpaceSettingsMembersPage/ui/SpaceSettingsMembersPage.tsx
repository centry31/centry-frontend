import { useParams } from 'react-router-dom';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceMembersList } from 'widgets/Space/SpaceMembersList';

import { useGetSpace } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsMembersPage = () => {
	const { spaceId = '' } = useParams();

	const { data: space } = useGetSpace({ spaceId });

	return (
		<div className={'p-3 flex gap-5 max-w-2xl flex-col m-auto'}>
			<PageHeader title={'Участники'} description={'Управление участниками пространства'} />

			{space && <SpaceInfo space={space} />}

			<SpaceMembersList />
		</div>
	);
};
