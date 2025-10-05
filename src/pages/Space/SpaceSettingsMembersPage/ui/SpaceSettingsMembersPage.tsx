import { useParams } from 'react-router-dom';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';
import { SpaceMembersList } from 'widgets/Space/SpaceMembersList';

import { useGetSpace, useGetSpaceMembers } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsMembersPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space } = useGetSpace({ spaceId });
	const { data: members, isLoading } = useGetSpaceMembers({ spaceId });

	return (
		<div className={'p-3 flex gap-5 max-w-2xl flex-col m-auto'}>
			<PageHeader title={'Участники'} description={'Управление участниками пространства'} />

			{space && <SpaceInfo space={space} />}

			<SpaceMembersList members={members || []} isLoading={isLoading} />
		</div>
	);
};
