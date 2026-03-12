import { useCallback, useState } from 'react';

import {
	getSpaceInviteLinkUrl,
	useCreateInviteCode,
	useGetSpaceInviteCodes,
} from 'entities/SpaceInviteCode';

import { notifySuccess } from 'shared/lib';

type Props = {
	spaceId: string;
};

export const useCreateSpaceInviteCodeForm = (props: Props) => {
	const { spaceId } = props;

	const { mutate: mutateSpaceCodes } = useGetSpaceInviteCodes({ spaceId });
	const { isLoading, request: createInviteCode } = useCreateInviteCode();

	const [createdCode, setCreatedCode] = useState<string>('');

	const handleCreateInviteLink = useCallback(async () => {
		const spaceInviteCode = await createInviteCode({ spaceId });
		if (!spaceInviteCode) return;

		mutateSpaceCodes();
		setCreatedCode(spaceInviteCode.code);

		notifySuccess('Ссылка-приглашение создана');
	}, [createInviteCode, mutateSpaceCodes, spaceId]);

	return {
		isLoading,
		linkUrl: getSpaceInviteLinkUrl(createdCode),

		onCreateInviteLink: handleCreateInviteLink,
	};
};
