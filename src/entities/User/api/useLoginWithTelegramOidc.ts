import { useCallback } from 'react';

import { axiosInstance, useApiMutation } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import type { AccessToken, ApiResponse } from 'shared/types';

type Payload = {
	id_token: string;
	nonceId: string;
};

export const useLoginWithTelegramOidc = () => {
	const fetcher = useCallback(async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<AccessToken>>(
			'/auth/telegram-oidc/login',
			payload,
		);

		const accessToken = response.data.data;
		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		return true;
	}, []);

	return useApiMutation(fetcher);
};
