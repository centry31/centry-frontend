import { useState } from 'react';

import { axiosInstance } from 'shared/api';
import type { ApiResponse } from 'shared/types';

import type { CreateSpaceInviteCodePayload } from '../model/types';

type Payload = CreateSpaceInviteCodePayload;

export const useCreateInviteCode = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const request = async (payload: Payload) => {
		setIsLoading(true);
		setError('');

		try {
			const response = await axiosInstance.post<ApiResponse<string>>(
				'/space-invite-codes/create',
				payload,
			);
			return response.data.data;
		} catch (error) {
			// TODO: add error handler (https://uniteam31.atlassian.net/browse/US-8)
			console.error(error);
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
