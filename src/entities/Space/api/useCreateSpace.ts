import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { Space } from '../model/types';

type Payload = {
	name: string;
	description?: string;
};

export const useCreateSpace = () => {
	const fetcher = async (payload: Payload) => {
		const res = await axiosInstance.post<ApiResponse<Space>>('/spaces', payload);
		return res.data.data;
	};

	return useApiMutation(fetcher);
};
