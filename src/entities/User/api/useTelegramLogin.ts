import { axiosInstance, useApiMutation } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import type { AccessToken, ApiResponse } from 'shared/types';

type Payload = {
	id: number;
	username?: string;
	photo_url?: string;
	first_name: string;
	last_name?: string;
	auth_date: number;
	hash: string;
};

export const useTelegramLogin = () => {
	const fetcher = async (payload: Payload) => {
		const response = await axiosInstance.post<ApiResponse<AccessToken>>(
			'/auth/telegram',
			payload,
		);

		const accessToken = response.data.data;
		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		return null;
	};

	return useApiMutation(fetcher);
};
