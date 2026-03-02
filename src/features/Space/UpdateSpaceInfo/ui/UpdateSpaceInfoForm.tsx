import { Button, Input, Textarea } from '@heroui/react';

type Props = {
	name: string;
	description: string;
	isLoading: boolean;

	onChangeName: (name: string) => void;
	onChangeDescription: (description: string) => void;
	onUpdateSpaceInfo: () => void;
	onResetForm: () => void;
};

export const UpdateSpaceInfoForm = (props: Props) => {
	const {
		name,
		description,
		isLoading,

		onChangeName,
		onChangeDescription,
		onUpdateSpaceInfo,
		onResetForm,
	} = props;

	return (
		<>
			<Input
				label="Название"
				value={name}
				onChange={(event) => onChangeName(event.target.value)}
			/>

			<Textarea
				label="Описание"
				value={description}
				onChange={(event) => onChangeDescription(event.target.value)}
			/>

			<div className="flex gap-2">
				<Button
					color="primary"
					onPress={onUpdateSpaceInfo}
					isLoading={isLoading}
					disabled={isLoading}
				>
					Сохранить
				</Button>

				<Button variant="flat" onPress={onResetForm}>
					Отмена
				</Button>
			</div>
		</>
	);
};
