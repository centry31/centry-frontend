import { useState } from 'react';

import { axiosInstance } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import type { AccessToken, ApiResponse } from 'shared/types';

import type { TelegramUserPayload } from '../model/types';

type Payload = TelegramUserPayload;

export const useTelegramLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

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
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
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
