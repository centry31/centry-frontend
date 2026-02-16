import { CreateSpaceForm, useCreateSpaceForm } from 'features/Space/CreateSpace';

export const CreateSpacePage = () => {
	const {
		name,
		description,
		isSubmitting,
		isSubmitDisabled,
		onChangeName,
		onChangeDescription,
		onCreateSpace,
	} = useCreateSpaceForm();

	return (
		<CreateSpaceForm
			name={name}
			description={description}
			isSubmitting={isSubmitting}
			isSubmitDisabled={isSubmitDisabled}
			onChangeName={onChangeName}
			onChangeDescription={onChangeDescription}
			onCreateSpace={onCreateSpace}
		/>
	);
};
