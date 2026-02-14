import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { SpaceInviteCode } from '../model/types';

type Payload = {
	spaceId: string;
	maxUses: number;
	expiresAt: string;
};

export const useCreateInviteCode = () => {
	const fetcher = async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<SpaceInviteCode>>(
			'/space-invite-codes/create',
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
