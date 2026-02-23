import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceInviteCode } from '../model/types';

type Props = {
	spaceId: string;
	maxUses: number;
	expiresAt: string;
};

export const useCreateInviteCode = () => {
	const fetcher = async (props: Props) => {
		const { spaceId, ...payload } = props;
		const response = await axiosInstance.post<ApiResponse<SpaceInviteCode>>(
			`/space-invite-codes/${spaceId}/create`,
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
