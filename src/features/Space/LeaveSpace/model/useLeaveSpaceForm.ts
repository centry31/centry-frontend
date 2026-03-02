import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserSpaces, useLeaveSpace } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { notifySuccess, removeLastSelectedSpaceIdIfMatches } from 'shared/lib';

type Props = {
	spaceId: string;
};

export const useLeaveSpaceForm = (props: Props) => {
	const { spaceId } = props;

	const navigate = useNavigate();
	const { mutate: mutateSpaces } = useGetUserSpaces();
	const { request: leaveSpace, isLoading: isLeaving } = useLeaveSpace();

	const handleLeaveSpace = useCallback(async () => {
		const result = await leaveSpace({ spaceId });
		if (result === undefined) return;
		removeLastSelectedSpaceIdIfMatches(spaceId);
		await mutateSpaces();
		notifySuccess('Вы вышли из пространства');
		navigate(RoutesPaths.spaces);
	}, [leaveSpace, mutateSpaces, navigate, spaceId]);

	return {
		isLeaving,
		handleLeaveSpace,
	};
};
