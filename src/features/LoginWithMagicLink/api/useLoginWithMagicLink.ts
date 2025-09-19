import { useState } from 'react';

import { axiosInstance } from 'shared/api';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/const';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { AccessToken, ApiResponse } from 'shared/types';

type Payload = {
	code: string;
};

/**
 * Авторизуется через ссылку со специальным кодом.
 * */
export const useLoginWithMagicLink = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (payload: Payload) => {
		const { code } = payload;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.post<ApiResponse<AccessToken>>(
				'/auth/magic-link',
				{ code },
			);

			const accessToken = response.data.data;
			localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
		} catch (error) {
			const errorMessage = getApiResponseErrorMessage(error);
			setError(errorMessage);
			throw error;
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
