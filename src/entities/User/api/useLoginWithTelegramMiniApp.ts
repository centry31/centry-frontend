import { axiosInstance, useApiMutation } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import type { AccessToken, ApiResponse } from 'shared/types';

type Payload = { initData: string };

export const useLoginWithTelegramMiniApp = () => {
	const fetcher = async ({ initData }: Payload) => {
		const response = await axiosInstance.post<ApiResponse<AccessToken>>(
			'/auth/telegram-mini-app',
			{
				initData,
			},
		);

		const accessToken = response.data.data;
		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		return true;
	};

	return useApiMutation(fetcher);
};
