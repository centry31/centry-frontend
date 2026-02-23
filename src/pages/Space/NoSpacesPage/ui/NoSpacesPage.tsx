import { generatePath, Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { CircleAlert, Plus } from 'lucide-react';

import { useGetUserSpaces } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { resolveSpaceId } from 'shared/lib';

export const NoSpacesPage = () => {
	const navigate = useNavigate();

	const { data: userSpaces, isLoading } = useGetUserSpaces();
	const availableSpaceId = resolveSpaceId({ spaces: userSpaces });

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (availableSpaceId) {
		const calendarPath = generatePath(RoutesPaths.calendar, { spaceId: availableSpaceId });
		return <Navigate to={calendarPath} replace />;
	}

	return (
		<div className="mx-auto flex h-full w-full max-w-2xl items-center px-3 sm:px-6">
			<Card className="w-full border border-neutral-200 shadow-sm">
				<CardHeader className="flex items-start gap-3">
					<div className="rounded-xl bg-warning-50 p-2 text-warning-700">
						<CircleAlert size={18} />
					</div>

					<div>
						<h1 className="text-lg font-semibold">Страница недоступна</h1>
						<p className="text-sm text-neutral-600">
							Вы пока не состоите ни в одном пространстве.
						</p>
					</div>
				</CardHeader>

				<CardBody className="flex flex-col gap-3">
					<p className="text-sm text-neutral-600">
						Чтобы открыть эту страницу, создайте новое пространство или вступите по
						приглашению.
					</p>

					<div className="flex flex-col gap-2 sm:flex-row">
						<Button
							color="primary"
							startContent={<Plus size={16} />}
							onPress={() => navigate(RoutesPaths.createSpace)}
						>
							Создать пространство
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};
