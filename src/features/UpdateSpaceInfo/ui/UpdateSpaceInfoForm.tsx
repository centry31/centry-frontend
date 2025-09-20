import { useController, useForm } from 'react-hook-form';
import { Button, Input, Textarea } from '@heroui/react';

import { type UpdateSpace, useGetSpace } from 'entities/Space';

import { useUpdateSpaceInfo } from '../api/useUpdateSpaceInfo';

type Props = {
	spaceId: string;
	initialFormValues?: UpdateSpace;
};

export const UpdateSpaceInfoForm = (props: Props) => {
	const { spaceId, initialFormValues } = props;

	const { mutate: mutateSpace } = useGetSpace({ spaceId });
	const { request: updateSpace, isLoading } = useUpdateSpaceInfo();

	const { control, reset } = useForm({ defaultValues: initialFormValues });

	const {
		field: { value: name, onChange: onChangeName },
	} = useController({ control, name: 'name' });

	const {
		field: { value: description, onChange: onChangeDescription },
	} = useController({ control, name: 'description' });

	const handleUpdateSpaceInfo = () => {
		const space: UpdateSpace = {
			name,
			description,
		};

		updateSpace({ spaceId, space }).then(() => mutateSpace());
	};

	const handleResetForm = () => {
		reset();
	};

	return (
		<>
			<Input label="Название" value={name} onChange={onChangeName} />

			<Textarea label="Описание" value={description} onChange={onChangeDescription} />

			<div className="flex gap-2">
				<Button
					color="primary"
					onPress={handleUpdateSpaceInfo}
					isLoading={isLoading}
					disabled={isLoading}
				>
					Сохранить
				</Button>

				<Button variant="flat" onPress={handleResetForm}>
					Отмена
				</Button>
			</div>
		</>
	);
};
