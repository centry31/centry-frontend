import { useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';

import type { ImportBmstuSchedule } from 'entities/Bmstu';
import { useImportBmstuSchedule } from 'entities/Bmstu';

import { notifySuccess } from 'shared/lib';

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
		const result = await importSchedule({ spaceId, groupId });
		if (result === undefined) return;
		notifySuccess('Расписание успешно импортировано');
		onSuccess?.();
	}, [groupId, importSchedule, onSuccess, spaceId]);

	return {
		groupId,
		onChangeGroupId: handleChangeGroupId,

		onImportBmstuSchedule: handleImportBmstuSchedule,
		isImporting,
	};
};
