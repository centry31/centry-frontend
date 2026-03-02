import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { generatePath, Navigate, useLocation, useParams } from 'react-router-dom';
import { Spinner } from '@heroui/react';

import { useGetUserSpaces } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { clearLastSelectedSpaceId, resolveSpaceId, setLastSelectedSpaceId } from 'shared/lib';

type Props = {
	children: ReactNode;
};

export const RequireSpace = (props: Props) => {
	const { children } = props;

	const { spaceId } = useParams();
	const location = useLocation();

	const { data: userSpaces, isLoading } = useGetUserSpaces();
	const resolvedSpaceId = resolveSpaceId({
		spaces: userSpaces,
		preferredSpaceId: spaceId,
	});

	useEffect(() => {
		if (isLoading) return;

		if (!resolvedSpaceId) {
			clearLastSelectedSpaceId();
			return;
		}

		setLastSelectedSpaceId(resolvedSpaceId);
	}, [isLoading, resolvedSpaceId]);

	if (isLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Spinner />
			</div>
		);
	}

	if (!resolvedSpaceId) {
		return <Navigate to={RoutesPaths.noSpaces} state={{ from: location }} replace />;
	}

	if (spaceId !== resolvedSpaceId) {
		const calendarPath = generatePath(RoutesPaths.calendar, { spaceId: resolvedSpaceId });
		return <Navigate to={calendarPath} replace />;
	}

	return children;
};
