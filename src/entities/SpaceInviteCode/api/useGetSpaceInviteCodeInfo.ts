import type { Space } from 'entities/Space';

import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Payload = {
	code: string;
};

export const useGetSpaceInviteCodeInfo = () => {
	const fetcher = async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<Space>>(
			'/space-invite-codes/info',
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
