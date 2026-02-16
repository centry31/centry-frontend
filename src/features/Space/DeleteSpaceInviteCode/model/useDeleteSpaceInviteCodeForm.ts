import { useCallback } from 'react';

import { useDeleteSpaceInviteCode, useGetSpaceInviteCodes } from 'entities/SpaceInviteCode';

type Props = {
	spaceId: string;
	code: string;
};

export const useDeleteSpaceInviteCodeForm = (props: Props) => {
	const { spaceId, code } = props;

	const { mutate: mutateCodes } = useGetSpaceInviteCodes({ spaceId });
	const { request: deleteCode, isLoading } = useDeleteSpaceInviteCode();

	const handleDeleteSpaceInviteCode = useCallback(async () => {
		const deletedCode = await deleteCode({ spaceId, code });
		if (!deletedCode) return;
		mutateCodes();
	}, [code, deleteCode, mutateCodes, spaceId]);

	return {
		isLoading,
		handleDeleteSpaceInviteCode,
	};
};
