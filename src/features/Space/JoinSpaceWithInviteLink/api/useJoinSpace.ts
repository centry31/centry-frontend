import { useState } from 'react';

import type { Space } from 'entities/Space';

import { axiosInstance } from 'shared/api';
import { getApiResponseErrorMessage } from 'shared/lib';
import type { ApiResponse } from 'shared/types';

type Payload = {
	code: string;
};

export const useJoinSpace = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (payload: Payload) => {
		const { code } = payload;

		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.post<ApiResponse<Space>>('/space-invites/accept', {
				code,
			});

			return response.data.data;
		} catch (error) {
			const errorMessage = getApiResponseErrorMessage(error);
			setError(errorMessage);
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
