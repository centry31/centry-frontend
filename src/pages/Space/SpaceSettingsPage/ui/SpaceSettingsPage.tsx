import { useParams } from 'react-router-dom';
import { Spinner } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import { UpdateSpaceInfoForm } from 'features/Space/UpdateSpaceInfo';
import { useUpdateSpaceInfoForm } from 'features/Space/UpdateSpaceInfo/model/useUpdateSpaceInfoForm';

import { useGetSpace } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceSettingsPage = () => {
	const { spaceId = '' } = useParams();
	const { data: space, isLoading: isSpaceLoading } = useGetSpace({ spaceId });

	const {
		name,
		description,
		isLoading,
		handleUpdateSpaceInfo,
		handleResetForm,
		onChangeName,
		onChangeDescription,
	} = useUpdateSpaceInfoForm({ spaceId, defaultValues: space });

	if (isSpaceLoading) {
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

					<UpdateSpaceInfoForm
						name={name}
						description={description}
						isLoading={isLoading}
						onChangeName={onChangeName}
						onChangeDescription={onChangeDescription}
						onUpdateSpaceInfo={handleUpdateSpaceInfo}
						onResetForm={handleResetForm}
					/>
				</>
			)}
		</div>
	);
};
