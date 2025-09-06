import { useState } from 'react';

import { useUserStore } from 'entities/User';

import { axiosInstance } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import type { AccessToken, ApiResponse } from 'shared/types';

import type { TelegramUserPayload } from '../model/types';

type Payload = TelegramUserPayload;

export const useTelegramLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const { initAuthData } = useUserStore();

	const request = async (payload: Payload) => {
		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.post<ApiResponse<AccessToken>>(
				'/auth/telegram',
				payload,
			);

			const accessToken = response.data.data;
			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);

			initAuthData();
		} catch (error) {
			// TODO: add api error handler (utils?)
			console.error({ error });
		} finally {
			setIsLoading(false);
		}
	};

	return {
		request,
		isLoading,
		error,
	};
};
