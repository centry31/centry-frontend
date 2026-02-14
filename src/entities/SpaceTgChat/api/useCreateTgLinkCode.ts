import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Payload = {
	spaceId: string;
};

export const useCreateTgLinkCode = () => {
	const fetcher = async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<string>>(
			'/tg-link-codes/create',
			payload,
		);
		return response.data.data;
	};

	return useApiMutation(fetcher);
};
