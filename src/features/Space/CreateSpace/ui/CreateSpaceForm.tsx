import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';

type Props = {
	name: string;
	description: string;

	isSubmitting: boolean;
	isSubmitDisabled: boolean;

	onChangeName: (name: string) => void;
	onChangeDescription: (description: string) => void;
	onCreateSpace: () => void;
};

export const CreateSpaceForm = (props: Props) => {
	const {
		name,
		description,

		isSubmitting,
		isSubmitDisabled,

		onChangeName,
		onChangeDescription,
		onCreateSpace,
	} = props;

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
					onChange={(event) => onChangeName(event.target.value)}
				/>

				<Input
					label={'Описание'}
					placeholder={'Введите описание пространства'}
					value={description}
					onChange={(event) => onChangeDescription(event.target.value)}
				/>

				<Button
					color={'primary'}
					onPress={onCreateSpace}
					isLoading={isSubmitting}
					isDisabled={isSubmitDisabled}
				>
					Создать
				</Button>
			</CardBody>
		</Card>
	);
};
