import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLeaveSpace } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';

type Props = {
	spaceId: string;
};

export const useLeaveSpaceForm = (props: Props) => {
	const { spaceId } = props;

	const navigate = useNavigate();
	const { request: leaveSpace, isLoading: isLeaving } = useLeaveSpace();

	const handleLeaveSpace = useCallback(async () => {
		const result = await leaveSpace({ spaceId });
		if (!result && result !== null) return;

		navigate(RoutesPaths.spaces);
	}, [leaveSpace, navigate, spaceId]);

	return {
		isLeaving,
		handleLeaveSpace,
	};
};
