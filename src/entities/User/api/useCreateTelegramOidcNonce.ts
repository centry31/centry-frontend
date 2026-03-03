import { useCallback } from 'react';

import { axiosInstance, useApiMutation } from 'shared/api';
import type { ApiResponse } from 'shared/types';

type Response = {
	nonceId: string;
	nonce: string;
};

export const useCreateTelegramOidcNonce = () => {
	const fetcher = useCallback(async () => {
		const response = await axiosInstance.post<ApiResponse<Response>>(
			'/auth/telegram-oidc/nonce',
		);

		return response.data.data;
	}, []);

	return useApiMutation(fetcher);
};
