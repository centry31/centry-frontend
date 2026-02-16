import { useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';

import type { CreateSpace } from 'entities/Space';
import { useCreateSpace } from 'entities/Space';

export const useCreateSpaceForm = () => {
	const { control, formState, handleSubmit } = useForm<CreateSpace>({
		defaultValues: {
			name: '',
			description: '',
		},
		mode: 'onChange',
	});

	const { request: createSpace, isLoading, error } = useCreateSpace();

	const {
		field: { value: name, onChange: onChangeName },
	} = useController({
		control,
		name: 'name',
		rules: {
			required: true,
		},
	});

	const {
		field: { value: description, onChange: onChangeDescription },
	} = useController({
		control,
		name: 'description',
	});

	const handleChangeName = useCallback(
		(newName: string) => {
			onChangeName(newName);
		},
		[onChangeName],
	);

	const handleChangeDescription = useCallback(
		(newDescription: string) => {
			onChangeDescription(newDescription);
		},
		[onChangeDescription],
	);

	const handleCreateSpace = useCallback(() => {
		return handleSubmit(async (values) => {
			await createSpace(values);
		})();
	}, [createSpace, handleSubmit]);

	const isSubmitDisabled = isLoading || !formState.isDirty || !formState.isValid;

	return {
		isSubmitting: isLoading,
		error,
		name,
		description,
		isSubmitDisabled,
		onChangeName: handleChangeName,
		onChangeDescription: handleChangeDescription,
		onCreateSpace: handleCreateSpace,
	};
};
