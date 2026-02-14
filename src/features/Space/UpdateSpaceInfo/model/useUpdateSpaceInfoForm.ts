import { useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';

import type { UpdateSpace } from 'entities/Space';
import { useGetSpace, useUpdateSpaceInfo } from 'entities/Space';

type Props = {
	spaceId: string;
	defaultValues?: UpdateSpace;
};

export const useUpdateSpaceInfoForm = (props: Props) => {
	const { spaceId, defaultValues } = props;

	const { control, reset } = useForm<UpdateSpace>({
		defaultValues,
	});

	const { mutate: mutateSpace } = useGetSpace({ spaceId });
	const { request: updateSpace, isLoading } = useUpdateSpaceInfo();

	const {
		field: { value: name, onChange: onChangeName },
	} = useController({ control, name: 'name' });

	const {
		field: { value: description, onChange: onChangeDescription },
	} = useController({ control, name: 'description' });

	const handleChangeName = useCallback(
		(name: string) => {
			onChangeName(name);
		},
		[onChangeName],
	);

	const handleChangeDescription = useCallback(
		(description: string) => {
			onChangeDescription(description);
		},
		[onChangeDescription],
	);

	const handleUpdateSpaceInfo = useCallback(async () => {
		const updatedSpace = await updateSpace({ spaceId, name, description });
		if (!updatedSpace) return;
		mutateSpace();
	}, [description, mutateSpace, name, spaceId, updateSpace]);

	const handleResetForm = useCallback(() => {
		reset();
	}, [reset]);

	return {
		name: name || '',
		description: description || '',
		isLoading,

		handleUpdateSpaceInfo,
		handleResetForm,
		onChangeName: handleChangeName,
		onChangeDescription: handleChangeDescription,
	};
};
