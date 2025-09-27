import { useParams } from 'react-router-dom';
import { Spinner } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import { UpdateSpaceInfoForm } from 'features/Space/UpdateSpaceInfo';

import { useGetSpace } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space, isLoading } = useGetSpace({ spaceId });

	if (isLoading) {
		return (
			<div className="flex min-h-[50dvh] items-center justify-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			<PageHeader
				title={'Основные настройки'}
				description={'Управление настройками пространства'}
			/>

			{space && (
				<>
					<SpaceInfo space={space} />
					<UpdateSpaceInfoForm spaceId={spaceId} initialFormValues={space} />
				</>
			)}
		</div>
	);
};
