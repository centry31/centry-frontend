import { useCallback } from 'react';

import { useDeleteSpaceInviteCode, useGetSpaceInviteCodes } from 'entities/SpaceInviteCode';

import { notifySuccess } from 'shared/lib';

type Props = {
	spaceId: string;
	code: string;
};

export const useDeleteSpaceInviteCodeForm = (props: Props) => {
	const { spaceId, code } = props;

	const { mutate: mutateCodes } = useGetSpaceInviteCodes({ spaceId });
	const { request: deleteCode, isLoading } = useDeleteSpaceInviteCode();

	const handleDeleteSpaceInviteCode = useCallback(async () => {
		const result = await deleteCode({ spaceId, code });
		if (result === undefined) return;
		mutateCodes();
		notifySuccess('Код приглашения удален');
	}, [code, deleteCode, mutateCodes, spaceId]);

	return {
		isLoading,
		handleDeleteSpaceInviteCode,
	};
};
