import { Button, Card, CardBody } from '@heroui/react';
import { Plus } from 'lucide-react';

import { SpaceCard, useGetUserSpaces } from 'entities/Space';

import { SpaceActionButtons } from './SpaceActionButtons';
import { SpacesListSkeleton } from './SpacesListSkeleton';

export const UserSpacesList = () => {
	const { data: spaces, isLoading, error } = useGetUserSpaces();

	if (isLoading) return <SpacesListSkeleton />;
	if (error)
		return (
			<Card>
				<CardBody>
					<p className="text-danger-500">Не удалось загрузить пространства</p>
				</CardBody>
			</Card>
		);
	if (!spaces?.length)
		return (
			<Card className="border border-neutral-200">
				<CardBody className="flex items-center justify-between gap-4">
					<div>
						<h3 className="text-base font-medium">Пока пусто</h3>

						<p className="text-sm text-neutral-600">
							Создай первое пространство и пригласи участников.
						</p>
					</div>

					<Button color="primary" startContent={<Plus size={16} />}>
						Создать
					</Button>
				</CardBody>
			</Card>
		);

	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{spaces.map((space) => (
				<SpaceCard
					key={space.id}
					space={space}
					actions={<SpaceActionButtons space={space} />}
				/>
			))}
		</div>
	);
};
