import { Autocomplete, AutocompleteItem, Button } from '@heroui/react';

import type { BmstuGroup } from 'entities/Bmstu';

type Props = {
	groupId: string;
	onChangeGroupId: (groupId: string) => void;

	onImportBmstuSchedule: () => void;

	bmstuGroups: BmstuGroup[];
	isGroupsLoading: boolean;
	isSubmitting: boolean;
};

export const ImportBmstuScheduleForm = (props: Props) => {
	const {
		groupId,
		onChangeGroupId,

		onImportBmstuSchedule,

		bmstuGroups,
		isGroupsLoading,
		isSubmitting,
	} = props;

	return (
		<>
			<Autocomplete
				selectedKey={groupId}
				onSelectionChange={(key) => onChangeGroupId(key?.toString() ?? '')}
				defaultItems={bmstuGroups}
				isLoading={isGroupsLoading}
				label={'Выберите свою группу для импорта'}
				placeholder={'Например ИУ3-22М'}
			>
				{(group) => <AutocompleteItem key={group.id}>{group.name}</AutocompleteItem>}
			</Autocomplete>

			<div className="flex gap-2">
				<Button
					onPress={onImportBmstuSchedule}
					isLoading={isSubmitting}
					isDisabled={isSubmitting}
					color={'primary'}
				>
					Импортировать
				</Button>
			</div>
		</>
	);
};
