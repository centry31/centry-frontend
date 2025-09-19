import { useController, useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';

import type { CreateSpace } from 'entities/Space';

import { useCreateSpace } from '../api/useCreateSpace';

export const CreateSpaceForm = () => {
	const { request: createSpace, isLoading } = useCreateSpace();
	const { control } = useForm<CreateSpace>();

	const {
		field: { value: name, onChange: onChangeName },
	} = useController({ control, name: 'name' });

	const {
		field: { value: description, onChange: onChangeDescription },
	} = useController({ control, name: 'description' });

	const handleCreateSpace = () => {
		const space: CreateSpace = {
			name,
			description,
		};
		createSpace({ space }).finally();
	};

	return (
		<Card shadow={'none'}>
			<CardHeader>
				<h4 className="font-bold text-large">Создание пространства</h4>
			</CardHeader>

			<CardBody className={'gap-3'}>
				<Input
					label={'Название'}
					placeholder={'Введите название пространства'}
					value={name}
					onChange={onChangeName}
				/>

				<Input
					label={'Описание'}
					placeholder={'Введите описание пространства'}
					value={description}
					onChange={onChangeDescription}
				/>

				<Button color={'primary'} onPress={handleCreateSpace} disabled={isLoading}>
					Создать
				</Button>
			</CardBody>
		</Card>
	);
};
