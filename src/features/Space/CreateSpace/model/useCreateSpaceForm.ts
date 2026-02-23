import { useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { CreateSpace } from 'entities/Space';
import { useCreateSpace, useGetUserSpaces } from 'entities/Space';

import { setLastSelectedSpaceId } from 'shared/lib';

type Props = {
	onSuccess?: (createdSpaceId: string) => void;
};

export const useCreateSpaceForm = (props: Props = {}) => {
	const { onSuccess } = props;

	const { control, formState, handleSubmit } = useForm<CreateSpace>({
		defaultValues: {
			name: '',
			description: '',
		},
		mode: 'onChange',
	});

	const { mutate: mutateSpaces } = useGetUserSpaces();
	const { request: createSpace, isLoading, error } = useCreateSpace();

	const {
		field: { value: name, onChange: onChangeName },
	} = useController({
		control,
		name: 'name',
		rules: { required: true },
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
			const createdSpace = await createSpace(values);
			if (!createdSpace) return;

			setLastSelectedSpaceId(createdSpace.id);
			await mutateSpaces();

			onSuccess?.(createdSpace.id);
		})();
	}, [createSpace, handleSubmit, mutateSpaces, onSuccess]);

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
