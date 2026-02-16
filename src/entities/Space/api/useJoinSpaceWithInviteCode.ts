import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

type Payload = {
	code: string;
};

export const useJoinSpaceWithInviteCode = () => {
	const fetcher = async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<Space>>(
			'/space-invite-codes/accept',
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
