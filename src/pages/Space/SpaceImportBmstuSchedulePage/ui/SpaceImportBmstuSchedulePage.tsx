import { useParams } from 'react-router-dom';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import {
	ImportBmstuScheduleForm,
	useImportBmstuScheduleForm,
} from 'features/Bmstu/ImportBmstuSchedule';

import { useGetBmstuGroups } from 'entities/Bmstu';
import { useGetSpace } from 'entities/Space';

import { PageHeader } from 'shared/ui/PageHeader';

export const SpaceImportBmstuSchedulePage = () => {
	const { spaceId = '' } = useParams();

	const { data: createdSpace } = useGetSpace({ spaceId });
	const { data: bmstuGroups = [], isLoading: isGroupsLoading } = useGetBmstuGroups();

	const { groupId, onChangeGroupId, onImportBmstuSchedule, isImporting } =
		useImportBmstuScheduleForm({ spaceId });

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			<PageHeader
				title={'Импортирование расписание МГТУ им. Баумана'}
				description={
					'Здесь вы можете найти свою группу импортировать актуальное расписание в календарь'
				}
			/>

			{createdSpace && <SpaceInfo space={createdSpace} />}

			<ImportBmstuScheduleForm
				groupId={groupId}
				onChangeGroupId={onChangeGroupId}
				onImportBmstuSchedule={onImportBmstuSchedule}
				//
				bmstuGroups={bmstuGroups}
				isGroupsLoading={isGroupsLoading}
				isSubmitting={isImporting}
			/>
		</div>
	);
};
