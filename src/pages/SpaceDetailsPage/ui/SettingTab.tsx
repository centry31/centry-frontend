import { Card, CardBody, CardHeader } from '@heroui/react';

import { UpdateSpaceInfoForm } from 'features/UpdateSpaceInfo';

import type { Space } from 'entities/Space';

import { DangerZone } from './DangerZone';

type Props = {
	space: Space;
};

export const SettingsTab = (props: Props) => {
	const { space } = props;
	const { id: spaceId, ...currentSpaceInfo } = space;

	return (
		<div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-3">
			<Card className="lg:col-span-2 border border-neutral-200">
				<CardHeader>
					<h3 className="text-base font-medium">Общие</h3>
				</CardHeader>

				<CardBody className="flex flex-col gap-3">
					<UpdateSpaceInfoForm spaceId={spaceId} initialFormValues={currentSpaceInfo} />
				</CardBody>
			</Card>

			<DangerZone spaceId={space.id} />
		</div>
	);
};
