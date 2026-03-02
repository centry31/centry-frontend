import { Button, Input, Textarea } from '@heroui/react';

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
		<>
			<Input
				label="Название"
				placeholder="Например, ИУ3-22М"
				value={name}
				onChange={(event) => onChangeName(event.target.value)}
			/>

			<Textarea
				label="Описание"
				placeholder="Коротко опишите, зачем нужно это пространство"
				value={description}
				onChange={(event) => onChangeDescription(event.target.value)}
			/>

			<div className="flex gap-2">
				<Button
					color="primary"
					onPress={onCreateSpace}
					isLoading={isSubmitting}
					isDisabled={isSubmitDisabled}
				>
					Создать
				</Button>
			</div>
		</>
	);
};
