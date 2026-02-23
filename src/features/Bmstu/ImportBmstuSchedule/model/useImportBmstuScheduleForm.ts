import { useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';

import type { ImportBmstuSchedule } from 'entities/Bmstu';
import { useImportBmstuSchedule } from 'entities/Bmstu';

type Props = {
	spaceId: string;
	onSuccess?: () => void;
};

export const useImportBmstuScheduleForm = (props: Props) => {
	const { spaceId, onSuccess } = props;

	const { control } = useForm<ImportBmstuSchedule>();
	const { request: importSchedule, isLoading: isImporting } = useImportBmstuSchedule();

	const {
		field: { value: groupId, onChange: onChangeGroupId },
	} = useController({ control, name: 'groupId' });

	const handleChangeGroupId = useCallback(
		(groupId: string) => {
			onChangeGroupId(groupId);
		},
		[onChangeGroupId],
	);

	const handleImportBmstuSchedule = useCallback(async () => {
		await importSchedule({ spaceId, groupId });
		onSuccess?.();
	}, [groupId, importSchedule, onSuccess, spaceId]);

	return {
		groupId,
		onChangeGroupId: handleChangeGroupId,

		onImportBmstuSchedule: handleImportBmstuSchedule,
		isImporting,
	};
};
