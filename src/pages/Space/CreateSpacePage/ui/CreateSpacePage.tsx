import { generatePath, useNavigate } from 'react-router-dom';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import { CreateSpaceForm, useCreateSpaceForm } from 'features/Space/CreateSpace';

import type { Space } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { PageHeader } from 'shared/ui/PageHeader';

export const CreateSpacePage = () => {
	const navigate = useNavigate();

	const handleSuccessCreatingSpace = (createdSpaceId: string) => {
		const importBmstuScheduleHintPath = generatePath(RoutesPaths.importBmstuScheduleHint, {
			spaceId: createdSpaceId,
		});
		navigate(importBmstuScheduleHintPath);
	};

	const {
		name,
		description,
		isSubmitting,
		isSubmitDisabled,

		onChangeName,
		onChangeDescription,
		onCreateSpace,
	} = useCreateSpaceForm({ onSuccess: handleSuccessCreatingSpace });

	const creatingSpace: Space = {
		id: 'id',
		name: name || 'Название пространства',
		description: description || 'Описание пространства',
		access: 'owner',
	};

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			<PageHeader
				title={'Создание пространства'}
				description={'Здесь вы можете создать свое пространство'}
			/>

			<SpaceInfo space={creatingSpace} />

			<CreateSpaceForm
				name={name}
				description={description}
				isSubmitting={isSubmitting}
				isSubmitDisabled={isSubmitDisabled}
				//
				onChangeName={onChangeName}
				onChangeDescription={onChangeDescription}
				onCreateSpace={onCreateSpace}
			/>
		</div>
	);
};
