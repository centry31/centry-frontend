import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserSpaces, useLeaveSpace } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { removeLastSelectedSpaceIdIfMatches } from 'shared/lib';

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
		if (!result && result !== null) return;

		removeLastSelectedSpaceIdIfMatches(spaceId);
		await mutateSpaces();
		navigate(RoutesPaths.spaces);
	}, [leaveSpace, mutateSpaces, navigate, spaceId]);

	return {
		isLeaving,
		handleLeaveSpace,
	};
};
