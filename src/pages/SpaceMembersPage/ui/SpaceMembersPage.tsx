import { useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';

import { SpaceInfo } from 'widgets/SpaceInfo';
import { SpaceMembersList } from 'widgets/SpaceMembersList';

import { useGetSpace, useGetSpaceMembers } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceMembersPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space } = useGetSpace({ spaceId });
	const { data: members, isLoading } = useGetSpaceMembers({ spaceId });

	return (
		<div className={'p-3 flex gap-5 max-w-2xl flex-col m-auto'}>
			<PageHeader title={'Участники'} description={'Управление участниками пространства'} />

			{space && <SpaceInfo space={space} />}

			<Card shadow={'none'} className="border border-neutral-200">
				<CardHeader className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-2">
						<h3 className="text-base font-medium">Участники</h3>

						<Chip size="sm" variant="flat">
							{members?.length ?? '-'}
						</Chip>
					</div>
				</CardHeader>

				<CardBody className="p-0">
					<SpaceMembersList members={members || []} isLoading={isLoading} />
				</CardBody>
			</Card>
		</div>
	);
};
