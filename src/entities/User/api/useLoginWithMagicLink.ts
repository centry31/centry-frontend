import { axiosInstance, useApiMutation } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import type { AccessToken, ApiResponse } from 'shared/types';

type Payload = {
	code: string;
};

/**
 * Авторизуется через ссылку со специальным кодом.
 * */
export const useLoginWithMagicLink = () => {
	const fetcher = async (payload: Payload) => {
		const { code } = payload;

		const response = await axiosInstance.post<ApiResponse<AccessToken>>(
			'/auth/magic-link',
			{ code },
		);

		const accessToken = response.data.data;
		localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		return true;
	};

	return useApiMutation(fetcher);
};
