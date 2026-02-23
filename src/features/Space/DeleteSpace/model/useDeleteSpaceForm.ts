import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteSpace, useGetUserSpaces } from 'entities/Space';

import { RoutesPaths } from 'shared/configs';
import { removeLastSelectedSpaceIdIfMatches } from 'shared/lib';

type Props = {
	spaceId: string;
};

export const useDeleteSpaceForm = (props: Props) => {
	const { spaceId } = props;

	const navigate = useNavigate();

	const { mutate: mutateSpaces } = useGetUserSpaces();
	const { request: deleteSpace, isLoading } = useDeleteSpace();

	const handleDeleteSpace = useCallback(async () => {
		const deletedSpace = await deleteSpace({ spaceId });
		if (!deletedSpace) return;

		removeLastSelectedSpaceIdIfMatches(spaceId);
		await mutateSpaces();
		navigate(RoutesPaths.spaces);
	}, [deleteSpace, mutateSpaces, navigate, spaceId]);

	return {
		isLoading,
		handleDeleteSpace,
	};
};
