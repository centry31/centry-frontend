import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Alert, Button } from '@heroui/react';

import { SpaceInfo } from 'widgets/Space/SpaceInfo';

import {
	ImportBmstuScheduleForm,
	useImportBmstuScheduleForm,
} from 'features/Bmstu/ImportBmstuSchedule';

import { useGetBmstuGroups } from 'entities/Bmstu';
import { useGetSpace } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { PageHeader } from 'shared/ui/PageHeader';

export const ImportBmstuScheduleHintPage = () => {
	const { spaceId = '' } = useParams();
	const navigate = useNavigate();

	const { data: bmstuGroups = [], isLoading: isGroupsLoading } = useGetBmstuGroups();
	const { data: createdSpace } = useGetSpace({ spaceId });

	const handleOnCalendarPage = () => {
		const calendarPath = generatePath(RoutesPaths.calendar, { spaceId });
		navigate(calendarPath);
	};

	const { groupId, onChangeGroupId, onImportBmstuSchedule, isImporting } =
		useImportBmstuScheduleForm({ spaceId, onSuccess: handleOnCalendarPage });

	return (
		<div className={'p-3 flex max-w-2xl gap-5 m-auto flex-col'}>
			<PageHeader
				title={'Импортировать расписание группы МГТУ им. Баумана?'}
				description={'Оно появится в вашем календаре пространства'}
			/>

			{createdSpace && <SpaceInfo space={createdSpace} />}

			<div className="flex flex-col gap-4">
				<ImportBmstuScheduleForm
					groupId={groupId}
					onChangeGroupId={onChangeGroupId}
					onImportBmstuSchedule={onImportBmstuSchedule}
					//
					bmstuGroups={bmstuGroups}
					isGroupsLoading={isGroupsLoading}
					isSubmitting={isImporting}
				/>

				<Alert
					title={'Вы можете пропустить этот шаг сейчас'}
					description={
						'Импортировать расписание вы всегда можете в настройках пространства'
					}
					color={'warning'}
				/>

				<Button onPress={handleOnCalendarPage} variant={'flat'}>
					Пропустить...
				</Button>
			</div>
		</div>
	);
};
